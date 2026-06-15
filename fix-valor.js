const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Corrige valor no HTML
c = c.replace('order-unit-price">R$ 229', 'order-unit-price">R$ 299,90');

// Corrige valor no JS
c = c.replace('veicular: { label: \'Tag Veicular\', price: 197 },', '');
c = c.replace('familia: { label: \'Tag Família\', price: 229 },', '');
c = c.replace('kit: { label: \'Kit Completo\', price: 349 }', '');
c = c.replace('tag: { label: \'TrackingYou Tag+\', price: 299.90 }', '');

// Adiciona produto unico no JS
c = c.replace('const products = {', 'const products = {\n  tag: { label: \'TrackingYou Tag+\', price: 299.90 },');

// Corrige footer CNPJ
c = c.replace('© 2025 TrackingYou. Todos os direitos reservados.', '© 2025 TrackingYou. Todos os direitos reservados.\n    <br><span style="font-size:.75rem;color:var(--muted)">MF Rastreadores e Soluções Tecnológicas LTDA — CNPJ: 64.890.295/0001-00</span>');

fs.writeFileSync('index.html', c);
console.log('OK');
console.log('299,90:', c.includes('299,90'));
console.log('CNPJ footer:', c.indexOf('64.890.295') > c.indexOf('<footer>'));