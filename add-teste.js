const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Remove funcao antiga
const oldFn = c.indexOf('function preencherTeste()');
const oldFnEnd = c.indexOf('\n}', oldFn) + 2;
c = c.slice(0, oldFn) + c.slice(oldFnEnd);

// Nova funcao completa
const fnTeste = `function preencherTeste(){
  document.getElementById('f-nome').value='Flavio';
  document.getElementById('f-sobrenome').value='Teste';
  document.getElementById('f-email').value='fmatesz@gmail.com';
  document.getElementById('f-cpf').value='315.212.898-32';
  document.getElementById('f-tel').value='11963166971';
  document.getElementById('f-cep').value='03732-160';
  document.getElementById('f-num').value='360';
  document.getElementById('f-comp').value='';
  document.getElementById('f-senha').value='865342';
  document.getElementById('f-senha2').value='865342';
  setTimeout(()=>{
    document.getElementById('f-rua').value='Rua dos Trilhos';
    document.getElementById('f-bairro').value='Parque da Mooca';
    document.getElementById('f-cidade').value='Sao Paulo';
    document.getElementById('f-estado').value='SP';
    document.getElementById('cc-num').value='5162 3062 1937 8829';
    document.getElementById('cc-name').value='APROVADO TESTE';
    document.getElementById('cc-exp').value='05/28';
    document.getElementById('cc-cvv').value='318';
  },1800);
}
`;

c = c.replace('function toggleFaq', fnTeste + '\nfunction toggleFaq');

fs.writeFileSync('index.html', c);
console.log('OK!');