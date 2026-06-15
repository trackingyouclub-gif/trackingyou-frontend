const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Adiciona campos de senha antes do botao finalizar
const camposSenha = `
        <div class="form-section-title" style="margin-top:1.25rem;">Criar sua senha de acesso</div>
        <p style="font-size:0.8rem;color:var(--muted);margin-bottom:1rem">Use para acessar seu painel de vendedor após a compra.</p>
        <div class="form-row">
          <div class="form-group"><label>Criar senha</label><input type="password" id="f-senha" placeholder="Minimo 6 caracteres" minlength="6"></div>
          <div class="form-group"><label>Repetir senha</label><input type="password" id="f-senha2" placeholder="Repita a senha"></div>
        </div>
`;

c = c.replace('<div class="feedback-box" id="feedback">', camposSenha + '<div class="feedback-box" id="feedback">');

// Adiciona validacao de senha no validate()
c = c.replace(
  "if (!f.cidade) return 'Informe a cidade';",
  `if (!f.cidade) return 'Informe a cidade';
  const senha = document.getElementById('f-senha').value;
  const senha2 = document.getElementById('f-senha2').value;
  if (!senha || senha.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
  if (senha !== senha2) return 'As senhas nao coincidem';`
);

// Passa senha no payload do checkout
c = c.replace(
  'const customerData = {',
  'const senha = document.getElementById(\'f-senha\').value;\n    const customerData = {'
);

// Adiciona senha no body das requisicoes
c = c.replace(
  "productName: productName || 'TrackingYou Tag+',\n    remoteIp",
  "productName: productName || 'TrackingYou Tag+',\n    senha,\n    remoteIp"
);
c = c.replace(
  "body: JSON.stringify({ customer: customerData, amount: pixTotal, productName: o.productName }),",
  "body: JSON.stringify({ customer: customerData, amount: pixTotal, productName: o.productName, senha }),"
);
c = c.replace(
  "body: JSON.stringify({ customer: customerData, amount: o.total, productName: o.productName }),",
  "body: JSON.stringify({ customer: customerData, amount: o.total, productName: o.productName, senha }),"
);

fs.writeFileSync('index.html', c);
console.log('OK - campos de senha adicionados!');
console.log('senha field:', c.includes('f-senha'));