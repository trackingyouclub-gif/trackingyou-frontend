const fs = require('fs');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
// Cria painel baseado no template

const painel = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TrackingYou - Painel do Vendedor</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#080c14;--bg2:#0e1524;--card:#111827;--card2:#172035;
  --blue:#3b82f6;--blue-bright:#60a5fa;--blue-glow:rgba(59,130,246,0.15);
  --blue-border:rgba(59,130,246,0.3);--text:#f0f4ff;--muted:#7f8ea8;
  --border:rgba(255,255,255,0.07);--success:#10b981;--danger:#ef4444;
  --warning:#f59e0b;--r:12px;--r2:18px;
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
nav{background:rgba(8,12,20,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100}
.logo{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700}
.logo span{color:var(--blue-bright)}
.vendor-badge{background:var(--blue-glow);border:1px solid var(--blue-border);color:var(--blue-bright);padding:6px 14px;border-radius:100px;font-size:0.78rem;font-weight:700}
main{max-width:1100px;margin:0 auto;padding:2rem}
.loading{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:1rem}
.spinner{width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.error-box{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r);padding:2rem;text-align:center;margin:4rem auto;max-width:500px}
.error-box h2{color:#fca5a5;margin-bottom:.5rem}
.error-box p{color:var(--muted);font-size:.875rem}
.vendor-header{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:2rem;margin-bottom:2rem;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}
.va-big{width:72px;height:72px;border-radius:50%;background:var(--blue-glow);border:2px solid var(--blue-border);display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:var(--blue-bright);font-family:'Space Grotesk',sans-serif;flex-shrink:0}
.vendor-info h1{font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:700;margin-bottom:.25rem}
.vendor-info p{font-size:.875rem;color:var(--muted)}
.vendor-id{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:4px 12px;font-size:.78rem;color:var(--muted);font-family:monospace;margin-top:6px;display:inline-block}
.share-link{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.link-box{background:var(--bg2);border:1px solid var(--blue-border);border-radius:8px;padding:10px 14px;font-size:.78rem;color:var(--blue-bright);word-break:break-all;max-width:320px}
.btn{background:var(--blue);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:.8rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn:hover{opacity:.85}
.btn.green{background:#25D366}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.5rem}
.stat-card.hl{border-color:var(--blue-border)}
.stat-label{font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem}
.stat-value{font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;color:var(--blue-bright)}
.stat-value.green{color:var(--success)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:2rem}
@media(max-width:768px){.grid-2{grid-template-columns:1fr}.share-link{margin-left:0;align-items:flex-start}}
.panel-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.75rem;margin-bottom:2rem}
.panel-card h2{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;margin-bottom:1.25rem;padding-bottom:.75rem;border-bottom:1px solid var(--border)}
.saldo-display{text-align:center;padding:1.5rem;background:var(--bg2);border-radius:var(--r);margin-bottom:1.25rem}
.saldo-label{font-size:.78rem;color:var(--muted);margin-bottom:.25rem}
.saldo-val{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;color:var(--success)}
.saldo-min{font-size:.75rem;color:var(--muted);margin-top:4px}
.fg{margin-bottom:1rem}
.fg label{display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.fg input,.fg select{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:'Inter',sans-serif;transition:border-color .2s}
.fg input:focus{border-color:var(--blue)}
.fg input::placeholder{color:var(--muted)}
.btn-saque{width:100%;background:var(--success);color:#fff;border:none;border-radius:var(--r);padding:14px;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif}
.btn-saque:disabled{opacity:.4;cursor:not-allowed}
.feedback{display:none;margin-top:1rem;padding:12px 14px;border-radius:8px;font-size:.875rem;font-weight:500}
.feedback.success{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);color:#6ee7b7}
.feedback.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);color:#fca5a5}
.comissao-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:.875rem}
.comissao-item:last-child{border-bottom:none}
.ci-nivel{font-size:.72rem;color:var(--muted)}
.ci-status{font-size:.72rem;padding:2px 8px;border-radius:100px;font-weight:600}
.ci-status.pendente{background:rgba(245,158,11,.15);color:var(--warning)}
.ci-status.pago{background:rgba(16,185,129,.15);color:var(--success)}
.ci-valor{font-weight:700;color:var(--blue-bright)}
.tree-wrap{overflow-x:auto;padding:1rem 0}
.tree-node{display:inline-flex;flex-direction:column;align-items:center;margin:0 8px}
.tree-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:12px 16px;text-align:center;min-width:120px;position:relative}
.tree-card.root{border-color:var(--blue-border)}
.tree-card.root::before{content:'VOCE';position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--blue);color:#fff;font-size:.6rem;font-weight:700;padding:2px 8px;border-radius:100px}
.tree-name{font-size:.78rem;font-weight:700;margin-bottom:2px}
.tree-id{font-size:.65rem;color:var(--muted);font-family:monospace}
.tree-nivel{font-size:.65rem;color:var(--blue-bright);margin-top:2px}
.tree-children{display:flex;margin-top:1rem}
.empty{text-align:center;padding:2rem;color:var(--muted);font-size:.875rem}
</style>
</head>
<body>
<nav>
  <div class="logo">Tracking<span>You</span></div>
  <div class="vendor-badge" id="nav-name">Carregando...</div>
</nav>
<main>
  <div class="loading" id="loading">
    <div class="spinner"></div>
    <p style="color:var(--muted);font-size:.875rem">Carregando seu painel...</p>
  </div>
  <div class="error-box" id="error-box" style="display:none">
    <h2>Painel nao encontrado</h2>
    <p>ID invalido ou nao encontrado.<br>Verifique o link recebido no WhatsApp.</p>
  </div>
  <div id="content" style="display:none">
    <div class="vendor-header">
      <div class="va-big" id="v-avatar">?</div>
      <div class="vendor-info">
        <h1 id="v-nome">-</h1>
        <p id="v-email">-</p>
        <div class="vendor-id" id="v-id">-</div>
      </div>
      <div class="share-link">
        <div style="font-size:.75rem;color:var(--muted);margin-bottom:4px">Seu link de indicacao:</div>
        <div class="link-box" id="v-link">-</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" onclick="copiarLink()">Copiar link</button>
          <a class="btn green" id="v-wa" href="#" target="_blank">Compartilhar no WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card hl">
        <div class="stat-label">Saldo disponivel</div>
        <div class="stat-value green" id="s-saldo">R$ 0,00</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total sacado</div>
        <div class="stat-value" id="s-sacado">R$ 0,00</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Vendas geradas</div>
        <div class="stat-value" id="s-vendas">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Indicados diretos</div>
        <div class="stat-value" id="s-indicados">0</div>
      </div>
    </div>
    <div class="grid-2">
      <div class="panel-card">
        <h2>Solicitar Saque</h2>
        <div class="saldo-display">
          <div class="saldo-label">Saldo disponivel para saque</div>
          <div class="saldo-val" id="saldo-saque">R$ 0,00</div>
          <div class="saldo-min">Minimo para saque: R$ 50,00</div>
        </div>
        <div class="fg">
          <label>Chave PIX</label>
          <input type="text" id="pix-key" placeholder="CPF, e-mail, telefone ou chave aleatoria">
        </div>
        <button class="btn-saque" id="btn-saque" onclick="solicitarSaque()">Solicitar Saque</button>
        <div class="feedback" id="feedback-saque"></div>
      </div>
      <div class="panel-card">
        <h2>Ultimas Comissoes</h2>
        <div id="lista-comissoes"><div class="empty">Nenhuma comissao ainda</div></div>
      </div>
    </div>
<div class="panel-card">
      <h2>Comprar mais Tags</h2>
      <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.5rem">Adquira mais tags. As comissoes continuam sendo geradas para sua rede.</p>
      <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:1.25rem">
        <select id="buy-qty" onchange="updateBuyTotal()" style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-size:.875rem;font-family:Inter,sans-serif">
          <option value="1">1 unidade</option>
          <option value="2">2 unidades (-10%)</option>
          <option value="3">3 unidades (-15%)</option>
          <option value="5">5 unidades (-20%)</option>
        </select>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;color:var(--blue-bright)" id="buy-total">R$ 299,90</div>
      </div>
      <button class="btn" onclick="comprarMais()" style="padding:12px 28px;font-size:.95rem;border-radius:12px">Comprar mais Tags</button>
    </div>
    <div class="panel-card">
      <h2>Sua Rede de Vendedores</h2>
      <div class="tree-wrap" id="tree-container">
        <div class="empty">Nenhum indicado ainda. Compartilhe seu link!</div>
      </div>
    </div>
  <div class="panel-card">
      <h2>🏷️ Comprar mais Tags</h2>
      <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.5rem">Adquira mais tags com desconto por volume. As comissões continuam sendo geradas para sua rede.</p>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap">
        <div>
          <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Quantidade</label>
          <select id="buy-qty" onchange="updateBuyTotal()" style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-size:.875rem;font-family:Inter,sans-serif">
            <option value="1">1 unidade — R$ 299,90</option>
            <option value="2">2 unidades — R$ 539,82 (-10%)</option>
            <option value="3">3 unidades — R$ 764,75 (-15%)</option>
            <option value="5">5 unidades — R$ 1.199,60 (-20%)</option>
          </select>
        </div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;color:var(--blue-bright)" id="buy-total">R$ 299,90</div>
      </div>
      <a href="#buy-section" onclick="irParaCompra()" class="btn" style="display:inline-flex;padding:12px 24px;font-size:.95rem;border-radius:12px">🛒 Comprar agora</a>
    </div>
<script>
const BACKEND='https://trackingyou-backend-production.up.railway.app';
let VID='';
function fmt(v){return'R$ '+parseFloat(v).toFixed(2).replace('.',',');}
async function init(){
  const p=new URLSearchParams(window.location.search);
  VID=p.get('id');
  if(!VID){show('error');return;}
  try{
    const r=await fetch(BACKEND+'/api/vendedor/'+VID);
    if(!r.ok)throw new Error();
    const d=await r.json();
    render(d);
    loadTree();
  }catch(e){show('error');}
}
function show(s){
  document.getElementById('loading').style.display='none';
  if(s==='error')document.getElementById('error-box').style.display='block';
  else document.getElementById('content').style.display='block';
}
function render(d){
  const{vendedor:v,stats:s,comissoes:c,link}=d;
  document.getElementById('nav-name').textContent=v.nome.split(' ')[0];
  document.getElementById('v-avatar').textContent=v.nome.charAt(0);
  document.getElementById('v-nome').textContent=v.nome;
  document.getElementById('v-email').textContent=v.email;
  document.getElementById('v-id').textContent='ID: '+v.id;
  document.getElementById('v-link').textContent=link;
  document.getElementById('v-wa').href='https://wa.me/?text='+encodeURIComponent('Conheca o TrackingYou! '+link);
  document.getElementById('s-saldo').textContent=fmt(s.saldoDisponivel);
  document.getElementById('s-sacado').textContent=fmt(s.saldoSacado);
  document.getElementById('s-vendas').textContent=s.totalVendas;
  document.getElementById('s-indicados').textContent=s.totalIndicados;
  document.getElementById('saldo-saque').textContent=fmt(s.saldoDisponivel);
  if(s.saldoDisponivel<50)document.getElementById('btn-saque').disabled=true;
  if(c&&c.length>0){
    document.getElementById('lista-comissoes').innerHTML=c.slice(0,10).map(x=>
      '<div class="comissao-item"><div><div>Nivel '+x.nivel+' - '+x.percentual+'%</div><div class="ci-nivel">'+new Date(x.data_criacao).toLocaleDateString('pt-BR')+'</div></div><div style="display:flex;align-items:center;gap:8px"><span class="ci-status '+x.status+'">'+x.status+'</span><span class="ci-valor">'+fmt(x.valor)+'</span></div></div>'
    ).join('');
  }
  show('content');
}
async function loadTree(){
  try{
    const r=await fetch(BACKEND+'/api/rede/'+VID);
    const t=await r.json();
    document.getElementById('tree-container').innerHTML=node(t,true);
  }catch(e){}
}
function node(n,root){
  if(!n)return'';
  const ch=n.children||[];
  return '<div class="tree-node"><div class="tree-card'+(root?' root':'')+'">'
    +'<div class="tree-name">'+n.nome.split(' ')[0]+'</div>'
    +'<div class="tree-id">'+n.id+'</div>'
    +'<div class="tree-nivel">Nivel '+n.nivel+'</div>'
    +'</div>'+(ch.length?'<div class="tree-children">'+ch.map(c=>node(c,false)).join('')+'</div>':'')+'</div>';
}
async function solicitarSaque(){
  const pk=document.getElementById('pix-key').value.trim();
  const fb=document.getElementById('feedback-saque');
  if(!pk){fb.textContent='Informe sua chave PIX';fb.className='feedback error';fb.style.display='block';return;}
  document.getElementById('btn-saque').disabled=true;
  try{
    const r=await fetch(BACKEND+'/api/saque',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({vendedorId:VID,pixKey:pk})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error);
    fb.textContent=d.mensagem;fb.className='feedback success';fb.style.display='block';
  }catch(e){
    fb.textContent=e.message;fb.className='feedback error';fb.style.display='block';
    document.getElementById('btn-saque').disabled=false;
  }
}
function copiarLink(){
  navigator.clipboard.writeText(document.getElementById('v-link').textContent).then(()=>{
    const b=document.querySelector('.btn');b.textContent='Copiado!';
    setTimeout(()=>b.textContent='Copiar link',2000);
  });
}
init();
</script>
</body>
</html>`;

fs.writeFileSync('painel.html', painel);
console.log('OK - painel.html criado!');