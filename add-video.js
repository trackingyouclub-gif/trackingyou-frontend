const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const secaoVideo = `
<!-- VIDEO + COPY MLM -->
<section style="background:var(--bg2);padding:5rem 0">
  <div class="container" style="max-width:900px">
    
    <div style="text-align:center;margin-bottom:3rem">
      <div class="section-eyebrow">Assista antes de decidir</div>
      <h2 class="section-title" style="font-size:2rem">Proteja o que é seu.<br>E ainda ganhe dinheiro com isso.</h2>
      <p class="section-sub">Em menos de 3 minutos você vai entender por que milhares de brasileiros estão adotando o TrackingYou — e como você pode fazer parte dessa rede.</p>
    </div>

    <!-- VIDEO -->
    <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:16px;border:1px solid var(--blue-border);box-shadow:0 0 60px rgba(59,130,246,0.15);margin-bottom:3rem">
      <iframe 
        src="https://www.youtube.com/embed/_zwhfDg1YJ0?rel=0&modestbranding=1" 
        style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:16px"
        allowfullscreen
        loading="lazy"
        title="TrackingYou — Rastreamento e Oportunidade">
      </iframe>
    </div>

    <!-- COPY PARTE 1: PRODUTO -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:3rem">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem">
        <div style="font-size:2rem;margin-bottom:1rem">🚗</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:.75rem;color:var(--blue-bright)">Proteção real para sua família</h3>
        <p style="font-size:.9rem;color:var(--muted);line-height:1.7">Veículo furtado, filho saindo sozinho, pet que fugiu — são situações que acontecem todo dia. A TrackingYou Tag+ entrega localização em tempo real com atualização a cada 30 segundos, cerca virtual e histórico de 90 dias. Uma tag. Para tudo.</p>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem">
        <div style="font-size:2rem;margin-bottom:1rem">📍</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:.75rem;color:var(--blue-bright)">Discreta, resistente e duradoura</h3>
        <p style="font-size:.9rem;color:var(--muted);line-height:1.7">Com certificação IP67 (resistente à água e poeira), bateria de até 2 anos e tamanho ultrafino, a Tag+ pode ir a qualquer lugar — escondida no carro, na mochila ou na coleira do seu pet — sem chamar atenção.</p>
      </div>
    </div>

    <!-- DIVISOR -->
    <div style="text-align:center;margin:3rem 0">
      <div style="display:inline-flex;align-items:center;gap:1rem">
        <div style="height:1px;width:80px;background:var(--blue-border)"></div>
        <span style="font-size:.8rem;font-weight:700;color:var(--blue-bright);letter-spacing:.1em;text-transform:uppercase">E ainda tem mais</span>
        <div style="height:1px;width:80px;background:var(--blue-border)"></div>
      </div>
    </div>

    <!-- COPY PARTE 2: MLM -->
    <div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08));border:1px solid var(--blue-border);border-radius:var(--radius-lg);padding:2.5rem;margin-bottom:2rem;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:1rem">💰</div>
      <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Ao comprar, você vira parte do TrackingYou Club</h3>
      <p style="font-size:1rem;color:var(--muted);line-height:1.7;max-width:600px;margin:0 auto 2rem">Todo comprador recebe automaticamente um link exclusivo de indicação. Cada pessoa que comprar pelo seu link gera comissão direto para você — e a rede cresce multiplicando os ganhos.</p>
      
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem">
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#10b981">20%</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px">Venda direta</div>
        </div>
        <div style="background:var(--card);border-radius:12px;padding:1.25rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#60a5fa">5%</div>
          <div style="font-size:.75rem;colo