const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace("const BACKEND_URL = 'http://localhost:3001'", "const BACKEND_URL = 'https://trackingyou-backend-production.up.railway.app'");

const secStart = c.indexOf('<section class="products-section"');
const secEnd = c.indexOf('<!-- DEPOIMENTOS -->', secStart);

if(secStart > -1 && secEnd > -1) {
  const novoProduto = `<section class="products-section" id="produto">
  <div class="container">
    <div class="section-eyebrow">Produto</div>
    <h2 class="section-title">TrackingYou Tag+</h2>
    <p class="section-sub">Uma tag para veiculos, pessoas e pets.</p>
    <div style="max-width:800px;margin:3rem auto 0;background:var(--card);border:1px solid var(--blue-border);border-radius:var(--radius-lg);padding:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:center">
      <div style="text-align:center">
        <div style="width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#1a2a4a,#05080f);border:1px solid var(--blue-border);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem"><span style="font-size:4rem">📍</span></div>
        <div style="font-size:0.75rem;font-weight:700;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase">TrackingYou Tag+</div>
      </div>
      <div>
        <div class="product-badge">Mais vendido</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:0.5rem">Tag Rastreadora Universal</h3>
        <p style="font-size:0.9rem;color:var(--muted);margin-bottom:1.25rem;line-height:1.65">Rastreamento para veiculos, familia e pets. Discreta e com bateria de ate 2 anos.</p>
        <ul class="product-features">
          <li>GPS em tempo real (30s)</li>
          <li>Bateria ate 2 anos</li>
          <li>Resistente a agua (IP67)</li>
          <li>Cerca virtual com alerta</li>
          <li>Historico de 90 dias</li>
          <li>App gratuito iOS e Android</li>
          <li>3 meses de plataforma inclusa</li>
        </ul>
        <div class="product-price">
          <div class="price-val">R$ 299,90</div>
          <div class="price-desc">por tag - sem mensalidade nos primeiros 3 meses</div>
        </div>
        <a href="#checkout" class="btn-product">Comprar agora</a>
      </div>
    </div>
  </div>
</section>

`;
  c = c.slice(0, secStart) + novoProduto + c.slice(secEnd);
}

c = c.replace('<a href="#checkout" class="btn-primary">Garantir minha Tag', '<div style="margin-bottom:1rem"><span id="estoque-badge" style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);color:#6ee7b7;padding:6px 14px;border-radius:100px;font-size:0.78rem;font-weight:700">Verificando estoque...</span></div>\n<a href="#checkout" class="btn-primary">Garantir minha Tag');

const fn = `async function carregarEstoqueLoja(){try{const r=await fetch('https://trackingyou-backend-production.up.railway.app/api/estoque');const d=await r.json();const q=d.estoque?d.estoque.quantidade:0;const b=document.getElementById('estoque-badge');if(!b)return;if(q===0){b.textContent='Fora de estoque';b.style.background='rgba(239,68,68,0.12)';b.style.color='#fca5a5';}else if(q<=5){b.textContent='Ultimas '+q+' unidades!';b.style.background='rgba(245,158,11,0.12)';b.style.color='#fcd34d';}else{b.textContent=q+' unidades disponiveis';}}catch(e){const b=document.getElementById('estoque-badge');if(b)b.style.display='none';}}
document.addEventListener('DOMContentLoaded',carregarEstoqueLoja);
`;
c = c.replace('function toggleFaq', fn + '\nfunction toggleFaq');

fs.writeFileSync('index.html', c);
console.log('Tag Veicular:', c.includes('Tag Veicular'));
console.log('Kit Completo:', c.includes('Kit Completo'));
console.log('estoque-badge:', c.includes('estoque-badge'));
console.log('BACKEND:', c.includes('railway.app'));