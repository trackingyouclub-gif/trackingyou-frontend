const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Corrige o grid do produto para mobile
c = c.replace(
  'display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:center',
  'display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:center'
);

// Adiciona CSS responsivo para o produto
const cssExtra = `
@media(max-width:768px){
  .product-single > div:first-child { display:none; }
  div[style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; }
}
`;

c = c.replace('</style>', cssExtra + '</style>');

fs.writeFileSync('index.html', c);
console.log('OK');