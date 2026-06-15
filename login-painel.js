const fs = require('fs');
let c = fs.readFileSync('painel.html', 'utf8');

// Adiciona tela de login antes do loading
const loginHtml = `
<!-- LOGIN -->
<div class="login-wrap" id="login-wrap" style="display:none">
  <div class="login-box">
    <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;text-align:center;margin-bottom:.5rem">Tracking<span style="color:var(--blue-bright)">You</span></div>
    <div style="text-align:center;color:var(--muted);font-size:.875rem;margin-bottom:2rem">Painel do Vendedor</div>
    <div style="margin-bottom:1rem">
      <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">CPF / CNPJ</label>
      <input type="text" id="l-cpf" placeholder="000.000.000-00" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif" onkeydown="if(event.key==='Enter')fazerLogin()">
    </div>
    <div style="margin-bottom:1rem">
      <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Senha</label>
      <input type="password" id="l-senha" placeholder="Sua senha" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif" onkeydown="if(event.key==='Enter')fazerLogin()">
    </div>
    <button onclick="fazerLogin()" style="width:100%;background:var(--blue);color:#fff;border:none;border-radius:var(--r);padding:14px;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;margin-bottom:.75rem">Entrar</button>
    <div style="text-align:center">
      <a href="#" onclick="mostrarEsqueciSenha()" style="font-size:.8rem;color:var(--muted);text-decoration:none">Esqueci minha senha</a>
    </div>
    <div id="login-err" style="display:none;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:10px 14px;font-size:.875rem;color:#fca5a5;margin-top:1rem;text-align:center"></div>
  </div>
</div>

<!-- ESQUECI SENHA -->
<div class="login-wrap" id="esqueci-wrap" style="display:none">
  <div class="login-box">
    <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;text-align:center;margin-bottom:.5rem">Tracking<span style="color:var(--blue-bright)">You</span></div>
    <div style="text-align:center;color:var(--muted);font-size:.875rem;margin-bottom:2rem">Recuperar senha</div>
    <div style="margin-bottom:1rem">
      <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">CPF / CNPJ cadastrado</label>
      <input type="text" id="e-cpf" placeholder="000.000.000-00" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif">
    </div>
    <button onclick="enviarRecuperacao()" style="width:100%;background:var(--blue);color:#fff;border:none;border-radius:var(--r);padding:14px;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;margin-bottom:.75rem">Enviar email de recuperacao</button>
    <div style="text-align:center">
      <a href="#" onclick="voltarLogin()" style="font-size:.8rem;color:var(--muted);text-decoration:none">Voltar ao login</a>
    </div>
    <div id="esqueci-msg" style="display:none;padding:10px 14px;border-radius:8px;font-size:.875rem;margin-top:1rem;text-align:center"></div>
  </div>
</div>

<!-- RESET SENHA -->
<div class="login-wrap" id="reset-wrap" style="display:none">
  <div class="login-box">
    <div style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;text-align:center;margin-bottom:.5rem">Tracking<span style="color:var(--blue-bright)">You</span></div>
    <div style="text-align:center;color:var(--muted);font-size:.875rem;margin-bottom:2rem">Nova senha</div>
    <div style="margin-bottom:1rem">
      <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Nova senha</label>
      <input type="password" id="r-senha" placeholder="Minimo 6 caracteres" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif">
    </div>
    <div style="margin-bottom:1rem">
      <label style="display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Repetir senha</label>
      <input type="password" id="r-senha2" placeholder="Repita a senha" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:11px 14px;font-size:.875rem;outline:none;font-family:Inter,sans-serif">
    </div>
    <button onclick="resetarSenha()" style="width:100%;background:var(--blue);color:#fff;border:none;border-radius:var(--r);padding:14px;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif">Salvar nova senha</button>
    <div id="reset-msg" style="display:none;padding:10px 14px;border-radius:8px;font-size:.875rem;margin-top:1rem;text-align:center"></div>
  </div>
</div>
`;

// CSS para login-wrap
const loginCss = `
.login-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem;background:var(--bg)}
.login-box{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:2.5rem;width:100%;max-width:400px}
`;

c = c.replace('</style>', loginCss + '</style>');
c = c.replace('<nav>', loginHtml + '<nav>');

// Atualiza funcao init para verificar login
const novaInit = `async function init(){
  const params = new URLSearchParams(window.location.search);
  
  // Verifica se tem token de reset
  const resetToken = params.get('reset');
  if(resetToken){
    window._resetToken = resetToken;
    document.getElementById('reset-wrap').style.display='flex';
    return;
  }

  // Verifica se ja esta logado
  const savedId = sessionStorage.getItem('ty_vendor_id');
  if(savedId){
    ID = savedId;
    VD = null;
    carregarPainelLogado();
    return;
  }

  // Verifica se tem id na URL (link direto antigo)
  ID = params.get('id');
  if(ID){
    sessionStorage.setItem('ty_vendor_id', ID);
    carregarPainelLogado();
    return;
  }

  // Mostra login
  document.getElementById('login-wrap').style.display='flex';
}

async function carregarPainelLogado(){
  document.getElementById('loading').style.display='flex';
  try{
    const r=await fetch(B+'/api/vendedor/'+ID);
    if(!r.ok)throw 0;
    VD=await r.json();
    render(VD);
    loadTree();
  }catch(e){
    sessionStorage.removeItem('ty_vendor_id');
    document.getElementById('loading').style.display='none';
    document.getElementById('login-wrap').style.display='flex';
  }
}

async function fazerLogin(){
  const cpf=document.getElementById('l-cpf').value.trim();
  const senha=document.getElementById('l-senha').value.trim();
  const err=document.getElementById('login-err');
  err.style.display='none';
  if(!cpf||!senha){err.textContent='Preencha CPF/CNPJ e senha';err.style.display='block';return;}
  try{
    const r=await fetch(B+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cpfCnpj:cpf,senha})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error);
    ID=d.id;
    sessionStorage.setItem('ty_vendor_id',ID);
    document.getElementById('login-wrap').style.display='none';
    carregarPainelLogado();
  }catch(e){err.textContent=e.message;err.style.display='block';}
}

function mostrarEsqueciSenha(){
  document.getElementById('login-wrap').style.display='none';
  document.getElementById('esqueci-wrap').style.display='flex';
}

function voltarLogin(){
  document.getElementById('esqueci-wrap').style.display='none';
  document.getElementById('login-wrap').style.display='flex';
}

async function enviarRecuperacao(){
  const cpf=document.getElementById('e-cpf').value.trim();
  const msg=document.getElementById('esqueci-msg');
  if(!cpf){msg.textContent='Informe seu CPF/CNPJ';msg.style.background='rgba(239,68,68,.1)';msg.style.color='#fca5a5';msg.style.display='block';return;}
  try{
    const r=await fetch(B+'/api/auth/esqueci-senha',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cpfCnpj:cpf})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error);
    msg.textContent='Email enviado! Verifique sua caixa de entrada.';msg.style.background='rgba(16,185,129,.1)';msg.style.color='#6ee7b7';msg.style.display='block';
  }catch(e){msg.textContent=e.message;msg.style.background='rgba(239,68,68,.1)';msg.style.color='#fca5a5';msg.style.display='block';}
}

async function resetarSenha(){
  const nova=document.getElementById('r-senha').value;
  const nova2=document.getElementById('r-senha2').value;
  const msg=document.getElementById('reset-msg');
  if(!nova||nova.length<6){msg.textContent='Senha deve ter pelo menos 6 caracteres';msg.style.background='rgba(239,68,68,.1)';msg.style.color='#fca5a5';msg.style.display='block';return;}
  if(nova!==nova2){msg.textContent='As senhas nao coincidem';msg.style.background='rgba(239,68,68,.1)';msg.style.color='#fca5a5';msg.style.display='block';return;}
  try{
    const r=await fetch(B+'/api/auth/resetar-senha',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:window._resetToken,novaSenha:nova})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error);
    msg.textContent='Senha redefinida! Redirecionando...';msg.style.background='rgba(16,185,129,.1)';msg.style.color='#6ee7b7';msg.style.display='block';
    setTimeout(()=>{window.location.href='painel.html';},2000);
  }catch(e){msg.textContent=e.message;msg.style.background='rgba(239,68,68,.1)';msg.style.color='#fca5a5';msg.style.display='block';}
}`;

c = c.replace('async function init(){', '// SUBSTITUIDO\nasync function init_OLD(){');
c = c.replace('// SUBSTITUIDO\nasync function init_OLD(){', novaInit + '\nasync function init_OLD(){');

fs.writeFileSync('painel.html', c);
console.log('OK - login adicionado ao painel!');