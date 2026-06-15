const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Remove o bloco de redirecionamento antigo e substitui por simples window.open
const oldStart = c.indexOf("Redirecionando para seu painel...','success');");
const oldEnd = c.indexOf('},2000);', oldStart) + 8;

const novoRedirect = `Abrindo seu painel...','success');
  document.getElementById('btn-checkout').disabled = true;
  setTimeout(()=>{ window.open('painel.html','_blank'); },2000);`;

c = c.slice(0, oldStart) + novoRedirect + c.slice(oldEnd);

fs.writeFileSync('index.html', c);
console.log('OK');
console.log('window.open:', c.includes("window.open('painel.html','_blank')"));
console.log('auth/login:', c.includes('/api/auth/login'));