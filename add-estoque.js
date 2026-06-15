const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Adiciona badge de estoque antes do botao comprar
const badge = '<div style="margin-bottom:1rem"><span id="estoque-badge" style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);color:#6ee7b7;padding:6px 14px;border-radius:100px;font-size:0.78rem;font-weight:700">Verificando estoque...</span></div>\n';

c = c.replace('<a href="#checkout" class="btn-primary">Comprar agora', badge + '<a href="#checkout" class="btn-primary">Comprar agora');

// Adiciona funcao de estoque no script
const fn = `
async function carregarEstoqueLoja(){
  try{
    const r=await fetch('https://trackingyou-backend-production.up.railway.app/api/estoque');
    const d=await r.json();
    const q=d.estoque?d.estoque.quantidade:0;
    const badge=document.getElementById('estoque-badge');
    if(!badge)return;
    if(q===0){badge.textContent='Fora de estoque';badge.style.background='rgba(239,68,68,0.12)';badge.style.borderColor='rgba(239,68,68,0.25)';badge.style.color='#fca5a5';}
    else if(q<=5){badge.textContent='Ultimas '+q+' unidades!';badge.style.background='rgba(245,158,11,0.12)';badge.style.borderColor='rgba(245,158,11,0.25)';badge.style.color='#fcd34d';}
    else{badge.textContent=q+' unidades disponiveis';}
  }catch(e){const b=document.getElementById('estoque-badge');if(b)b.style.display='none';}
}
document.addEventListener('DOMContentLoaded',carregarEstoqueLoja);
`;

c = c.replace('function toggleFaq', fn + '\nfunction toggleFaq');

fs.writeFileSync('index.html', c);
console.log('OK - estoque badge adicionado!');