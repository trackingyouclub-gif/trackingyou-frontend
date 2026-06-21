const fs = require('fs');
let c = fs.readFileSync('painel.html', 'utf8');

// 1. Adiciona a secao "Meus Pedidos" antes da secao "Sua Rede"
const pedidosHtml = `
    <div class="card">
      <h2>Meus Pedidos</h2>
      <div id="pedidos-list"><div class="empty">Carregando pedidos...</div></div>
    </div>
`;

const idx = c.indexOf('<div class="card">\n      <h2>Sua Rede');
if (idx === -1) {
  console.log('ERRO: nao encontrou secao Sua Rede');
  process.exit(1);
}
c = c.slice(0, idx) + pedidosHtml + c.slice(idx);

// 2. Adiciona funcao carregarPedidos e modal de pagamento pendente
const fnPedidos = `
async function carregarPedidos(){
  const cont = document.getElementById('pedidos-list');
  try{
    const r = await fetch(B+'/api/partner/'+ID+'/pedidos');
    const pedidos = await r.json();
    if(!pedidos || !pedidos.length){
      cont.innerHTML = '<div class="empty">Nenhum pedido encontrado</div>';
      return;
    }
    cont.innerHTML = pedidos.map(p => {
      const statusClass = p.status === 'pago' ? 'pago' : (p.status === 'cancelado' ? 'pendente' : 'pendente');
      const statusLabel = p.status === 'pago' ? 'Pago' : (p.status === 'cancelado' ? 'Cancelado' : 'Pendente');
      const btnPagar = p.status === 'pendente' ? '<button class="btn green" style="margin-left:8px" onclick="abrirPagamentoPendente(\\''+p.id+'\\','+p.valor+')">Finalizar pagamento</button>' : '';
      return '<div class="ci"><div><div style="font-weight:600">'+fmt(p.valor)+'</div><div class="cin">'+new Date(p.data_venda).toLocaleDateString('pt-BR')+'</div></div><div style="display:flex;align-items:center;gap:8px"><span class="cis '+statusClass+'">'+statusLabel+'</span>'+btnPagar+'</div></div>';
    }).join('');
  }catch(e){
    cont.innerHTML = '<div class="empty">Erro ao carregar pedidos</div>';
  }
}

function abrirPagamentoPendente(vendaId, valor){
  document.getElementById('m-qty').value = 1;
  document.getElementById('m-total').textContent = f(valor);
  document.getElementById('m-btn-total').textContent = f(valor);
  document.getElementById('m-vendaId').value = vendaId;
  const v = VD.vendedor;
  document.getElementById('m-nome').value = v.nome.split(' ')[0] || '';
  document.getElementById('m-sobrenome').value = v.nome.split(' ').slice(1).join(' ') || '';
  document.getElementById('m-email').value = v.email || '';
  document.getElementById('m-cpf').value = v.cpf_cnpj || '';
  document.getElementById('m-tel').value = v.telefone ? '('+v.telefone.slice(0,2)+') '+v.telefone.slice(2) : '';
  document.getElementById('modal').style.display = 'flex';
}
`;

// Insere antes de init();
const initIdx = c.lastIndexOf('init();');
c = c.slice(0, initIdx) + fnPedidos + '\n' + c.slice(initIdx);

// 3. Adiciona campo hidden m-vendaId no modal (se nao existir)
if (!c.includes('m-vendaId')) {
  c = c.replace(
    '<input type="hidden" id="m-qty" value="1">',
    '<input type="hidden" id="m-qty" value="1">\n    <input type="hidden" id="m-vendaId" value="">'
  );
}

// 4. Chama carregarPedidos() quando o painel carrega - adiciona apos loadTree() na funcao render-related flow
c = c.replace('loadTree();', 'loadTree();\n    carregarPedidos();');

fs.writeFileSync('painel.html', c);
console.log('OK!');
console.log('pedidos-list:', c.includes('pedidos-list'));
console.log('carregarPedidos:', c.includes('async function carregarPedidos'));
