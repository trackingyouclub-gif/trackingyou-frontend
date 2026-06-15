const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');

// Corrige o onclick problemático
c = c.replace(
  /onclick="pagarComissao\(''\+c\.id\+''\)"/g,
  'onclick="pagarComissao(this.dataset.id)" data-id="+c.id+"'
);

// Corrige aspas simples problemáticas nos onclicks
c = c.replace(/pagarComissao\(\\'+c\.id\\+'\)/g, 'pagarComissao(this.dataset.id)" data-id="+c.id+"');

fs.writeFileSync('admin.html', c);
console.log('OK');