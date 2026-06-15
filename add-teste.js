const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const btnTeste = `
<div id="btn-teste-wrap" style="text-align:center;margin-bottom:1rem">
  <button onclick="preencherTeste()" style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:#f59e0b;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:700;cursor:pointer">⚡ Preencher dados de teste</button>
</div>
`;

const fnTeste = `
function preencherTeste(){
  document.getElementById('f-nome').value='Flavio';
  document.getElementById('f-sobrenome').value='Teste';
  document.getElementById('f-email').value='fmatesz@hotmail.com';
  document.getElementById('f-cpf').value='315.212.898-32';
  document.getElementById('f-tel').value='11963166971';
  document.getElementById('f-cep').value='03732-160';
  setTimeout(()=>{
    document.getElementById('f-num').value='360';
    document.getElementById('f-senha').value='865342';
    document.getElementById('f-senha2').value='865342';
    document.getElementById('cc-number').value='5162 3062 1937 8829';
    document.getElementById('cc-name').value='APROVADO TESTE';
    document.getElementById('cc-expiry').value='05/28';
    document.getElementById('cc-cvv').value='318';
  },1500);
}
`;

c = c.replace('<div class="feedback-box" id="feedback">', btnTeste + '<div class="feedback-box" id="feedback">');
c = c.replace('function toggleFaq', fnTeste + '\nfunction toggleFaq');

fs.writeFileSync('index.html', c);
console.log('OK!');