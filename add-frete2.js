const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Adiciona campo frete apos campo CEP (apenas o HTML visual)
const freteHtml = `\n        <div id="frete-box" style="margin-top:8px;display:none">
          <div id="frete-load" style="font-size:.8rem;color:var(--muted);padding:4px 0">Calculando frete...</div>
          <div id="frete-ops" style="display:flex;flex-direction:column;gap:6px;margin-top:4px"></div>
        </div>`;

c = c.replace(
  'oninput="maskCEP(this)">',
  'oninput="maskCEP(this);initFrete(this.value)">' + freteHtml
);

// 2. Adiciona linha de frete no resumo (antes do total)
c = c.replace(
  '<div class="order-divider"></div>',
  '<div class="order-divider"></div>\n          <div class="order-item" id="frete-row" style="display:none"><span>Frete</span><span id="frete-preco" style="color:var(--blue-bright)">R$ 0,00</span></div>'
);

// 3. Adiciona funcoes de frete ANTES do fechamento do script (antes de </script>)
const fnFrete = `
// ─── FRETE ───────────────────────────────────────────────────
let _freteTimer = null;
let _freteSel = null;

function initFrete(cep) {
  cep = (cep || '').replace(/\\D/g, '');
  if (cep.length !== 8) { document.getElementById('frete-box').style.display='none'; return; }
  clearTimeout(_freteTimer);
  _freteTimer = setTimeout(() => buscarFrete(cep), 800);
}

async function buscarFrete(cep) {
  const box = document.getElementById('frete-box');
  const load = document.getElementById('frete-load');
  const ops = document.getElementById('frete-ops');
  box.style.display = 'block';
  load.style.display = 'block';
  ops.innerHTML = '';
  _freteSel = null;
  atualizaFreteResumo(0);
  try {
    const r = await fetch(BACKEND_URL + '/api/frete/calcular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cep })
    });
    const d = await r.json();
    load.style.display = 'none';
    if (!d.opcoes || !d.opcoes.length) {
      ops.innerHTML = '<div style="font-size:.8rem;color:var(--muted)">Frete indisponivel para este CEP</div>';
      return;
    }
    ops.innerHTML = d.opcoes.map((o, i) =>
      '<label style="cursor:pointer;border:1px solid var(--border);border-radius:8px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;gap:8px">'
      + '<input type="radio" name="frete_op" value="' + i + '" ' + (i===0?'checked':'') + ' onchange="escolherFrete(' + JSON.stringify(d.opcoes).replace(/"/g,"'") + ',' + i + ')" style="accent-color:var(--blue)">'
      + '<div style="flex:1"><div style="font-size:.85rem;font-weight:600">' + o.empresa + ' ' + o.nome + '</div><div style="font-size:.75rem;color:var(--muted)">' + o.prazo + '</div></div>'
      + '<div style="font-weight:700;color:var(--blue-bright);white-space:nowrap">R$ ' + o.preco.toFixed(2).replace('.', ',') + '</div>'
      + '</label>'
    ).join('');
    if (d.opcoes.length > 0) escolherFrete(d.opcoes, 0);
  } catch(e) {
    load.style.display = 'none';
    ops.innerHTML = '<div style="font-size:.8rem;color:var(--muted)">Erro ao calcular frete</div>';
  }
}

function escolherFrete(opcoes, idx) {
  _freteSel = opcoes[idx];
  atualizaFreteResumo(_freteSel.preco);
}

function atualizaFreteResumo(valor) {
  const row = document.getElementById('frete-row');
  const preco = document.getElementById('frete-preco');
  if (!row || !preco) return;
  if (valor > 0) {
    row.style.display = 'flex';
    preco.textContent = 'R$ ' + valor.toFixed(2).replace('.', ',');
  } else {
    row.style.display = 'none';
  }
}
`;

// Insere antes do ultimo </script>
const lastScript = c.lastIndexOf('</script>');
c = c.slice(0, lastScript) + fnFrete + c.slice(lastScript);

fs.writeFileSync('index.html', c);
console.log('OK!');
console.log('initFrete:', c.includes('initFrete'));
console.log('frete-box:', c.includes('frete-box'));
console.log('tamanho:', c.length);
