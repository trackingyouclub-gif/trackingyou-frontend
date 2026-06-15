const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Adiciona campo de frete apos o CEP
const freteHtml = `
        <div id="frete-section" style="margin-bottom:1rem;display:none">
          <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Opcoes de frete</label>
          <div id="frete-loading" style="display:none;color:var(--muted);font-size:.85rem;padding:8px 0">Calculando frete...</div>
          <div id="frete-opcoes" style="display:flex;flex-direction:column;gap:8px"></div>
        </div>
`;

// Insere apos o campo de CEP
c = c.replace(
  'oninput="maskCEP(this)">',
  'oninput="maskCEP(this);calcularFrete(this.value)">' + freteHtml
);

// Adiciona funcao calcularFrete no script
const fnFrete = `
let freteTimer = null;
let freteSelecionado = null;

function calcularFrete(cep) {
  cep = cep.replace(/\\D/g, '');
  if (cep.length !== 8) return;
  
  clearTimeout(freteTimer);
  freteTimer = setTimeout(async () => {
    const section = document.getElementById('frete-section');
    const loading = document.getElementById('frete-loading');
    const opcoes = document.getElementById('frete-opcoes');
    
    section.style.display = 'block';
    loading.style.display = 'block';
    opcoes.innerHTML = '';
    freteSelecionado = null;
    
    try {
      const r = await fetch(BACKEND_URL + '/api/frete/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep })
      });
      const d = await r.json();
      loading.style.display = 'none';
      
      if (!d.opcoes || !d.opcoes.length) {
        opcoes.innerHTML = '<div style="color:var(--muted);font-size:.85rem">Frete nao disponivel para este CEP</div>';
        return;
      }
      
      opcoes.innerHTML = d.opcoes.map(o => 
        '<div onclick="selecionarFrete(' + JSON.stringify(o).replace(/"/g,\\'\\') + ')" style="cursor:pointer;border:1px solid var(--border);border-radius:8px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;transition:border-color .2s" id="frete-' + o.id + '">'
        + '<div><div style="font-weight:600;font-size:.875rem">' + o.empresa + ' ' + o.nome + '</div><div style="font-size:.75rem;color:var(--muted)">' + o.prazo + '</div></div>'
        + '<div style="font-weight:700;color:var(--blue-bright)">R$ ' + o.preco.toFixed(2).replace('.', ',') + '</div>'
        + '</div>'
      ).join('');
      
      // Seleciona o mais barato automaticamente
      selecionarFrete(d.opcoes[0]);
      
    } catch(e) {
      loading.style.display = 'none';
      opcoes.innerHTML = '<div style="color:var(--muted);font-size:.85rem">Erro ao calcular frete</div>';
    }
  }, 800);
}

function selecionarFrete(opcao) {
  freteSelecionado = opcao;
  document.querySelectorAll('[id^="frete-"]').forEach(el => {
    el.style.borderColor = 'var(--border)';
    el.style.background = 'transparent';
  });
  const el = document.getElementById('frete-' + opcao.id);
  if(el) { el.style.borderColor = 'var(--blue)'; el.style.background = 'var(--blue-glow)'; }
  updateOrder();
}
`;

c = c.replace('function toggleFaq', fnFrete + '\nfunction toggleFaq');

// Atualiza updateOrder para incluir frete
c = c.replace(
  "document.getElementById('order-total').textContent = formatBRL(o.total);",
  `const freteVal = freteSelecionado ? freteSelecionado.preco : 0;
  const totalComFrete = o.total + freteVal;
  document.getElementById('order-total').textContent = formatBRL(totalComFrete);
  const freteRow = document.getElementById('frete-row');
  if(freteRow) { freteRow.style.display = freteVal > 0 ? 'flex' : 'none'; document.getElementById('frete-val').textContent = formatBRL(freteVal); }`
);

// Adiciona linha de frete no resumo do pedido
c = c.replace(
  '<div class="order-item" id="discount-row"',
  '<div class="order-item" id="frete-row" style="display:none"><span>Frete</span><span id="frete-val">R$ 0,00</span></div>\n          <div class="order-item" id="discount-row"'
);

fs.writeFileSync('index.html', c);
console.log('OK!');
console.log('calcularFrete:', c.includes('calcularFrete'));
console.log('frete-section:', c.includes('frete-section'));
