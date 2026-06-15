const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const secaoVideo = `
<section style="background:var(--bg2);padding:5rem 0">
  <div class="container" style="max-width:900px">
    <div style="text-align:center;margin-bottom:3rem">
      <div class="section-eyebrow">Assista antes de decidir</div>
      <h2 class="section-title" style="font-size:2rem">Proteja o que e seu.<br>E ainda ganhe dinheiro com isso.</h2>
      <p class="section-sub">Em menos de 3 minutos voce vai entender por que milhares de brasileiros estao adotando o TrackingYou e como voce pode fazer parte dessa rede.</p>
    </div>
    <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:16px;border:1px solid var(--blue-border);box-shadow:0 0 60px rgba(59,130,246,0.15);margin-bottom:3rem">
      <iframe src="https://www.youtube.com/embed/_zwhfDg1YJ0?rel=0&modestbranding=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:16px" allowfullscreen loading="lazy" title="TrackingYou"></iframe>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:3rem">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem">
        <div style="font-size:2rem;margin-bottom:1rem">&#x1F697;</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:.75rem;color:var(--blue-bright)">Protecao real para sua familia</h3>
        <p style="font-size:.9rem;color:var(--muted);line-height:1.7">Veiculo furtado, filho saindo sozinho, pet que fugiu sao situacoes que acontecem todo dia. A TrackingYou Tag+ entrega localizacao em tempo real com atualizacao a cada 30 segundos, cerca virtual e historico de 90 dias. Uma tag. Para tudo.</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem">
        <div style="font-size:2rem;margin-bottom:1rem">&#x1F4CD;</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:.75rem;color:var(--blue-bright)">Discreta, resistente e duradoura</h3>
        <p style="font-size:.9rem;color:var(--muted);line-height:1.7">Com certificacao IP67, bateria de ate 2 anos e tamanho ultrafino, a Tag+ pode ir a qualquer lugar escondida no carro, na mochila ou na coleira do seu pet sem chamar atencao.</p>
      </div>
    </div>
    <div style="text-align:center;margin:3rem 0">
      <div style="display:inline-flex;align-items:center;gap:1rem">
        <div style="height:1px;width:80px;background:var(--blue-border)"></div>
        <span style="font-size:.8rem;font-weight:700;color:var(--blue-bright);letter-spacing:.1em;text-transform:uppercase">E ainda tem mais</span>
        <div style="height:1px;width:80px;background:var(--blue-border)"></div>
      </div>
    </div>
    <div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08));border:1px solid var(--blue-border);border-radius:var(--radius-lg);padding:2.5rem;margin-bottom:2rem;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:1rem">&#x1F4B0;</div>
      <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Ao comprar, voce vira parte do TrackingYou Club</h3>
      <p style="font-size:1rem;color:var(--muted);line-height:1.7;max-width:600px;margin:0 auto 2rem">Todo comprador recebe automaticamente um link exclusivo de indicacao. Cada pessoa que comprar pelo seu link gera comissao direto para voce e a rede cresce multiplicando os ganhos.</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem">
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#10b981">20%</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">Venda direta</div>
        </div>
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#60a5fa">5%</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">2 nivel</div>
        </div>
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#a78bfa">3%</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">3 nivel</div>
        </div>
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#f59e0b">2%</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">4 nivel</div>
        </div>
      </div>
      <div style="background:var(--card);border-radius:12px;padding:1.25rem;display:inline-flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center">
        <span style="font-size:.875rem;color:var(--muted)">Exemplo: indique 5 pessoas</span>
        <span style="font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:#10b981">+ R$ 299,90 em comissoes</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:.5rem">&#x1F517;</div>
        <div style="font-size:.875rem;font-weight:700;margin-bottom:.25rem">Link exclusivo</div>
        <div style="font-size:.78rem;color:var(--muted)">Receba seu link ao comprar e comece a indicar</div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:.5rem">&#x1F4CA;</div>
        <div style="font-size:.875rem;font-weight:700;margin-bottom:.25rem">Painel completo</div>
        <div style="font-size:.78rem;color:var(--muted)">Acompanhe vendas, comissoes e sua rede em tempo real</div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:.5rem">&#x1F4B8;</div>
        <div style="font-size:.875rem;font-weight:700;margin-bottom:.25rem">Saque via PIX</div>
        <div style="font-size:.78rem;color:var(--muted)">Minimo de R$ 50. Solicite quando quiser</div>
      </div>
    </div>
  </div>
</section>
`;

// Insere antes do checkout
const idxCheckout = c.indexOf('<section id="checkout">');
if(idxCheckout > -1) {
  c = c.slice(0, idxCheckout) + secaoVideo + c.slice(idxCheckout);
} else {
  const idxFaq = c.indexOf('Perguntas frequentes');
  const idxSection = c.lastIndexOf('<section', idxFaq);
  c = c.slice(0, idxSection) + secaoVideo + c.slice(idxSection);
}

fs.writeFileSync('index.html', c);
console.log('OK!');
console.log('video:', c.includes('_zwhfDg1YJ0'));
console.log('TrackingYou Club:', c.includes('TrackingYou Club'));