const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const novoFaq = `<section>
  <div class="container">
    <div class="section-eyebrow">Duvidas frequentes</div>
    <h2 class="section-title">Respondemos as mais comuns</h2>
    <div class="faq-list">

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Como funciona o rastreamento da Tag+?<span class="faq-icon">+</span></button>
        <div class="faq-a">A TrackingYou Tag+ utiliza tecnologia Bluetooth combinada com a rede de dispositivos para localizar em tempo real. Funciona mesmo sem conexao de internet propria — aproveita a rede de celulares proximos para transmitir a localizacao com precisao.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Para quais dispositivos posso usar a Tag+?<span class="faq-icon">+</span></button>
        <div class="faq-a">A Tag+ e universal! Pode ser usada em veiculos (carros, motos, caminhoes), para rastrear pessoas (filhos, idosos) e pets (caes, gatos). Uma unica tag serve para tudo — basta posicionar no local desejado.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Como me torno parte do TrackingYou Club?<span class="faq-icon">+</span></button>
        <div class="faq-a">Simples! Ao adquirir uma Tag+ voce ja faz parte do TrackingYou Club automaticamente. Nenhum cadastro adicional e necessario — seu painel de vendedor e criado no momento da compra e voce ja pode comecar a indicar e ganhar comissoes.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Como recebo minhas comissoes?<span class="faq-icon">+</span></button>
        <div class="faq-a">As comissoes sao creditadas automaticamente no seu painel do TrackingYou Club a cada venda gerada pela sua rede. O pagamento e feito diretamente via PIX na chave cadastrada no seu painel, de forma rapida e segura.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Qual o valor minimo para solicitar saque?<span class="faq-icon">+</span></button>
        <div class="faq-a">O valor minimo para solicitar saque e de R$ 100,00. Voce pode solicitar a qualquer momento pelo seu painel do TrackingYou Club e o valor e transferido via PIX em ate 2 dias uteis.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Quantos niveis de comissao existem na rede?<span class="faq-icon">+</span></button>
        <div class="faq-a">A rede TrackingYou Club possui 3 niveis de comissao: 20% sobre vendas diretas (pessoas que voce indicou), 5% sobre o 2o nivel (pessoas indicadas pelos seus indicados) e 3% sobre o 3o nivel. Quanto mais sua rede cresce, mais voce ganha — automaticamente.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Como acesso meu painel de vendedor?<span class="faq-icon">+</span></button>
        <div class="faq-a">Assim que sua compra e confirmada, seu painel e criado automaticamente e voce recebe o link de acesso no email cadastrado. O login e feito com seu CPF/CNPJ e a senha criada no momento da compra. Acesse de qualquer dispositivo a qualquer hora.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">A Tag+ funciona sem internet?<span class="faq-icon">+</span></button>
        <div class="faq-a">Sim! A Tag+ funciona sem precisar de internet propria ou chip. Ela utiliza a rede Bluetooth dos dispositivos ao redor para transmitir sua localizacao. Isso significa que mesmo em areas sem cobertura de dados, a tag consegue ser localizada quando ha dispositivos proximos.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Qual a garantia do produto?<span class="faq-icon">+</span></button>
        <div class="faq-a">A TrackingYou Tag+ possui 3 meses de garantia contra defeitos de fabricacao. Em caso de defeito dentro do prazo, substituimos o produto sem custo adicional. A tag tambem possui certificacao IP67 de resistencia a agua e poeira.</div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">Como funciona o plano apos 1 ano?<span class="faq-icon">+</span></button>
        <div class="faq-a">Sua Tag+ ja vem com 1 ano de acesso completo ao sistema incluso na compra. Apos os 12 meses, voce pode continuar usando gratuitamente no plano basico (atualizacao a cada 5 minutos) ou assinar o plano premium a partir de R$ 9,99/mes para atualizacoes em tempo real e funcionalidades avancadas.</div>
      </div>

    </div>
  </div>
</section>`;

// Encontra e substitui a secao FAQ atual
const faqInicio = c.lastIndexOf('<section', c.indexOf('D\u00favidas frequentes'));
const faqFim = c.indexOf('</section>', faqInicio) + 10;

c = c.slice(0, faqInicio) + novoFaq + c.slice(faqFim);

fs.writeFileSync('index.html', c);
console.log('OK!');
console.log('novo faq:', c.includes('TrackingYou Club'));
console.log('tamanho:', c.length);
