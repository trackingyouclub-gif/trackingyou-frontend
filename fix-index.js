const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Remove os 3 produtos e substitui por produto único
const inicio = c.indexOf('<div class="products-grid">');
const fim = c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', inicio) + 1) + 1) + 6;

const produtoUnico = `<div class="product-single" style="max-width:800px;margin:3rem auto 0;background:var(--card);border:1px solid var(--blue-border);border-radius:var(--radius-lg);padding:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:center">
  <div style="text-align:center">
    <div style="width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#1a2a4a,#05080f);border:1px solid var(--blue-border);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;box-shadow:0 0 60px rgba(59,130,246,0.15)">
      <span style="font-size:4rem">📍</span>
    </div>
    <div style="font-size:0.75rem;font-weight:700;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase">TrackingYou Tag+</div>
  </div>
  <div>
    <div class="product-badge">Mais vendido</div>
    <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:0.5rem">Tag Rastreadora Universal</h3>
    <p style="font-size:0.9rem;color:var(--muted);margin-bottom:1.25rem;line-height:1.65">Rastreamento preciso para veículos, família e pets. Discreta, resistente e com bateria de até 2 anos.</p>
    <ul class="product-features">
      <li>GPS em tempo real (30s)</li>
      <li>Bateria até 2 anos</li>
      <li>Resistente à água (IP67)</li>
      <li>Cerca virtual com alerta</li>
      <li>Histórico de 90 dias</li>
      <li>App gratuito iOS e Android</li>
      <li>3 meses de plataforma inclusa</li>
    </ul>
    <div class="product-price">
      <div class="price-val">R$ 299,90</div>
      <div class="price-desc">por tag · sem mensalidade nos primeiros 3 meses</div>
    </div>
    <a href="#checkout" class="btn-product">Comprar agora →</a>
  </div>
</div>`;

c = c.slice(0, inicio) + produtoUnico + c.slice(fim);

// Atualiza BACKEND_URL
c = c.replace("const BACKEND_URL = 'http://localhost:3001'", "const BACKEND_URL = 'https://trackingyou-backend-production.up.railway.app'");

// Atualiza preco
c = c.replace(/value="197"[^>]*>Tag Veicular[^<]*/g, '');
c = c.replace(/value="229"[^>]*>Tag Família[^<]*/g, '');
c = c.replace(/value="349"[^>]*>Kit Completo[^<]*/g, '');

// Remove secao products-grid original
const idxGrid = c.indexOf('<section class="products-section"');
if(idxGrid > -1) {
  let depth = 0;
  let i = idxGrid;
  while(i < c.length) {
    if(c.slice(i,i+8) === '<section') depth++;
    if(c.slice(i,i+10) === '</section>') { depth--; if(depth===0){i+=10;break;} }
    i++;
  }
  c = c.slice(0, idxGrid) + c.slice(i);
}
fs.writeFileSync('index.html', c);
console.log('OK - produto unico aplicado!');
console.log('product-single:', c.includes('product-single'));