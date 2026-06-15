const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TrackingYou - Painel</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#080c14;--bg2:#0e1524;--card:#111827;--blue:#3b82f6;--blue-bright:#60a5fa;--blue-glow:rgba(59,130,246,0.15);--blue-border:rgba(59,130,246,0.3);--text:#f0f4ff;--muted:#7f8ea8;--border:rgba(255,255,255,0.07);--success:#10b981;--danger:#ef4444;--warning:#f59e0b;--r:12px;--r2:18px}
body{font-family:Inter,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
nav{background:rgba(8,12,20,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100}
.logo{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700}.logo span{color:var(--blue-bright)}
.badge{background:var(--blue-glow);border:1px solid var(--blue-border);color:var(--blue-bright);padding:6px 14px;border-radius:100px;font-size:0.78rem;font-weight:700}
main{max-width:1100px;margin:0 auto;padding:2rem}
.loading{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:1rem}
.spinner{width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.error-box{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r);padding:2rem;text-align:center;margin:4rem auto;max-width:500px}
.error-box h2{color:#fca5a5;margin-bottom:.5rem}.error-box p{color:var(--muted);font-size:.875rem}
.vheader{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:2rem;margin-bottom:2rem;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}
.vavatar{width:72px;height:72px;border-radius:50%;background:var(--blue-glow);border:2px solid var(--blue-border);display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:var(--blue-bright);flex-shrink:0}
.vinfo h1{font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:700;margin-bottom:.25rem}
.vinfo p{font-size:.875rem;color:var(--muted)}
.vid{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:4px 12px;font-size:.78rem;color:var(--muted);font-family:monospace;margin-top:6px;display:inline-block}
.slink{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.lbox{background:var(--bg2);border:1px solid var(--blue-border);border-radius:8px;padding:10px 14px;font-size:.78rem;color:var(--blue-bright);word-break:break-all;max-width:320px}
.btn{background:var(--blue);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:.8rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn.green{background:#25D366}.btn.big{padding:12px 28px;font-size:.95rem;border-radius:var(--r)}
.sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.scard{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.5rem}
.scard.hl{border-color:var(--blue-border)}
.slabel{font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem}
.sval{font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;color:var(--blue-bright)}
.sval.green{color:var(--success)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:2rem}
@media(max-width:768px){.g2{grid-template-columns:1fr}.slink{margin-left:0;align-items:flex-start}}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.75rem;margin-bottom:2rem}
.card h2{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;margin-bottom:1.25rem;padding-bottom:.75rem;border-bottom:1px solid var(--border)}
.sdisplay{text-align:center;padding:1.5rem;background:var(--bg2);border-radius:var(--r);margin-bottom:1.25rem}
.sval2{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;color:var(--success)}
.fg{margin-bottom:1rem}
.fg label{display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.fg input{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif}
.fg input:focus{border-color:var(--blue)}.fg input::placeholder{color:var(--muted)}
.bsaque{width:100%;background:var(--success);color:#fff;border:none;border-radius:var(--r);padding:14px;font-size:1rem;font-weight:700;cursor:pointer}
.bsaque:disabled{opacity:.4;cursor:not-allowed}
.fb{display:none;margin-top:1rem;padding:12px 14px;border-radius:8px;font-size:.875rem;font-weight:500}
.fb.success{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);color:#6ee7b7}
.fb.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);color:#fca5a5}
.ci{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:.875rem}
.ci:last-child{border-bottom:none}
.cin{font-size:.72rem;color:var(--muted)}
.cis{font-size:.72rem;padding:2px 8px;border-radius:100px;font-weight:600}
.cis.pendente{background:rgba(245,158,11,.15);color:var(--warning)}
.cis.pago{background:rgba(16,185,129,.15);color:var(--success)}
.civ{font-weight:700;color:var(--blue-bright)}
.tree-wrap{overflow-x:auto;padding:1rem 0}
.tnode{display:inline-flex;flex-direction:column;align-items:center;margin:0 8px}
.tcard{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:12px 16px;text-align:center;min-width:120px;position:relative}
.tcard.root{border-color:var(--blue-border)}
.tcard.root::before{content:'VOCE';position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--blue);color:#fff;font-size:.6rem;font-weight:700;padding:2px 8px;border-radius:100px}
.tname{font-size:.78rem;font-weight:700;margin-bottom:2px}
.tid{font-size:.65rem;color:var(--muted);font-family:monospace}
.tnivel{font-size:.65rem;color:var(--blue-bright);margin-top:2px}
.tchildren{display:flex;margin-top:1rem}
.empty{text-align:center;padding:2rem;color:var(--muted);font-size:.875rem}
.brow{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:1.25rem}
.bsel{background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-size:.875rem;font-family:Inter,sans-serif;cursor:pointer}
.btotal{font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;color:var(--blue-bright)}
</style>
</head>
<body>
<nav>
  <div class="logo">Tracking<span>You</span></div>
  <div class="badge" id="nav-name">...</div>
</nav>
<main>
  <div class="loading" id="loading"><div class="spinner"></div><p style="color:var(--muted);font-size:.875rem">Carregando...</p></div>
  <div class="error-box" id="err" style="display:none"><h2>Painel nao encontrado</h2><p>Verifique o link recebido no WhatsApp.</p></div>
  <div id="content" style="display:none">

    <div class="vheader">
      <div class="vavatar" id="va">?</div>
      <div class="vinfo"><h1 id="vn">-</h1><p id="ve">-</p><div class="vid" id="vi">-</div></div>
      <div class="slink">
        <div style="font-size:.75rem;color:var(--muted);margin-bottom:4px">Seu link de indicacao:</div>
        <div class="lbox" id="vl">-</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" onclick="copiarLink()">Copiar link</button>
          <a class="btn green" id="vwa" href="#" target="_blank">WhatsApp</a>
        </div>
      </div>
    </div>

    <div class="sgrid">
      <div class="scard hl"><div class="slabel">Saldo disponivel</div><div class="sval green" id="ss">R$ 0,00</div></div>
      <div class="scard"><div class="slabel">Total sacado</div><div class="sval" id="st">R$ 0,00</div></div>
      <div class="scard"><div class="slabel">Vendas geradas</div><div class="sval" id="sv">0</div></div>
      <div class="scard"><div class="slabel">Indicados diretos</div><div class="sval" id="si">0</div></div>
    </div>

    <div class="g2">
      <div class="card">
        <h2>Solicitar Saque</h2>
        <div class="sdisplay">
          <div style="font-size:.78rem;color:var(--muted);margin-bottom:.25rem">Saldo para saque</div>
          <div class="sval2" id="ss2">R$ 0,00</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">Minimo: R$ 50,00</div>
        </div>
        <div class="fg"><label>Chave PIX</label><input type="text" id="pix" placeholder="CPF, e-mail ou chave aleatoria"></div>
        <button class="bsaque" id="bsq" onclick="saque()">Solicitar Saque</button>
        <div class="fb" id="fbsq"></div>
      </div>
      <div class="card"><h2>Ultimas Comissoes</h2><div id="lc"><div class="empty">Nenhuma comissao ainda</div></div></div>
    </div>

    <div class="card">
      <h2>Comprar mais Tags</h2>
      <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.25rem">Adquira mais tags. As comissoes serao geradas para quem te indicou.</p>
      <div class="brow">
        <select class="bsel" id="bqty" onchange="updTotal()">
          <option value="1">1 unidade</option>
          <option value="2">2 unidades</option>
          <option value="3">3 unidades</option>
          <option value="5">5 unidades</option>
        </select>
        <div class="btotal" id="btotal">R$ 299,90</div>
      </div>
      <button class="btn big" onclick="comprar()">Comprar agora</button>
    </div>

    <div class="card">
      <h2>Sua Rede de Vendedores</h2>
      <div class="tree-wrap" id="tree"><div class="empty">Nenhum indicado ainda. Compartilhe seu link!</div></div>
    </div>

  </div>
</main>
<script>
const B='https://trackingyou-backend-production.up.railway.app';
let ID='',VD=null;
function f(v){return'R$ '+parseFloat(v).toFixed(2).replace('.',',');}
async function init(){
  const p=new URLSearchParams(window.location.search);
  ID=p.get('id');
  if(!ID){hide();return;}
  try{
    const r=await fetch(B+'/api/vendedor/'+ID);
    if(!r.ok)throw 0;
    VD=await r.json();
    render(VD);
    tree();
  }catch(e){hide();}
}
function hide(){document.getElementById('loading').style.display='none';document.getElementById('err').style.display='block';}
function show(){document.getElementById('loading').style.display='none';document.getElementById('content').style.display='block';}
function render(d){
  const v=d.vendedor,s=d.stats,c=d.comissoes,l=d.link;
  document.getElementById('nav-name').textContent=v.nome.split(' ')[0];
  document.getElementById('va').textContent=v.nome.charAt(0);
  document.getElementById('vn').textContent=v.nome;
  document.getElementById('ve').textContent=v.email;
  document.getElementById('vi').textContent='ID: '+v.id;
  document.getElementById('vl').textContent=l;
  document.getElementById('vwa').href='https://wa.me/?text='+encodeURIComponent('Conheca o TrackingYou! '+l);
  document.getElementById('ss').textContent=f(s.saldoDisponivel);
  document.getElementById('st').textContent=f(s.saldoSacado);
  document.getElementById('sv').textContent=s.totalVendas;
  document.getElementById('si').textContent=s.totalIndicados;
  document.getElementById('ss2').textContent=f(s.saldoDisponivel);
  if(s.saldoDisponivel<50)document.getElementById('bsq').disabled=true;
  if(c&&c.length>0){document.getElementById('lc').innerHTML=c.slice(0,10).map(x=>'<div class="ci"><div><div>Nivel '+x.nivel+' - '+x.percentual+'%</div><div class="cin">'+new Date(x.data_criacao).toLocaleDateString('pt-BR')+'</div></div><div style="display:flex;align-items:center;gap:8px"><span class="cis '+x.status+'">'+x.status+'</span><span class="civ">'+f(x.valor)+'</span></div></div>').join('');}
  show();
}
async function tree(){
  try{const r=await fetch(B+'/api/rede/'+ID);const t=await r.json();document.getElementById('tree').innerHTML=node(t,true);}catch(e){}
}
function node(n,root){
  if(!n)return'';
  const ch=n.children||[];
  return '<div class="tnode"><div class="tcard'+(root?' root':'')+'">'+'<div class="tname">'+n.nome.split(' ')[0]+'</div><div class="tid">'+n.id+'</div><div class="tnivel">Nivel '+n.nivel+'</div></div>'+(ch.length?'<div class="tchildren">'+ch.map(c=>node(c,false)).join('')+'</div>':'')+' </div>';
}
function updTotal(){
  const q=parseInt(document.getElementById('bqty').value);
  document.getElementById('btotal').textContent=f(299.90*q);
}
function comprar(){
  const q=document.getElementById('bqty').value;
  const ref=VD&&VD.vendedor.ref_id?VD.vendedor.ref_id:'FL01';
  window.location.href='https://trackingyouclub-gif.github.io/trackingyou-frontend?ref='+ref+'&qty='+q;
}
async function saque(){
  const pk=document.getElementById('pix').value.trim();
  const fb=document.getElementById('fbsq');
  if(!pk){fb.textContent='Informe sua chave PIX';fb.className='fb error';fb.style.display='block';return;}
  document.getElementById('bsq').disabled=true;
  try{
    const r=await fetch(B+'/api/saque',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({vendedorId:ID,pixKey:pk})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error);
    fb.textContent=d.mensagem;fb.className='fb success';fb.style.display='block';
  }catch(e){fb.textContent=e.message;fb.className='fb error';fb.style.display='block';document.getElementById('bsq').disabled=false;}
}
function copiarLink(){
  navigator.clipboard.writeText(document.getElementById('vl').textContent).then(()=>{
    const b=document.querySelector('.btn');b.textContent='Copiado!';setTimeout(()=>b.textContent='Copiar link',2000);
  });
}
init();
</script>
</body>
</html>`;

fs.writeFileSync('painel.html', html);
console.log('OK - painel criado!');
