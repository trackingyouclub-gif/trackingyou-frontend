const fs = require('fs');
let c = fs.readFileSync('painel.html', 'utf8');

// 1. Substitui a secao "Sua Rede" por novo layout com sidebar + SVG tree
const oldStart = c.indexOf('<div class="card">\n      <h2>Sua Rede');
if (oldStart === -1) {
  console.log('ERRO: nao encontrou secao Sua Rede');
  process.exit(1);
}
const oldEnd = c.indexOf('</div>\n\n  </div>\n</main>');
if (oldEnd === -1) {
  console.log('ERRO: nao encontrou fim da secao');
  process.exit(1);
}

const novaRedeHtml = `<div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;flex-wrap:wrap">
        <div style="width:240px;background:var(--bg2);border-right:1px solid var(--border);padding:1.25rem 1rem;flex-shrink:0">
          <h2 style="border-bottom:none;padding-bottom:0;margin-bottom:1rem">Sua Rede</h2>
          <div id="rede-resumo" style="display:flex;flex-direction:column;gap:6px;margin-bottom:1rem">
            <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;background:var(--blue-glow)">
              <span style="font-size:.8rem;font-weight:700;color:var(--blue-bright)" id="rede-total">0 partners na rede</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px">
              <span style="font-size:.8rem;color:var(--muted)" id="rede-niveis">0 niveis ativos</span>
            </div>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:1rem;margin-top:.5rem">
            <div style="font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Filtrar por nivel</div>
            <div id="rede-filtros" style="display:flex;flex-direction:column;gap:6px">
              <button onclick="filtrarRede(0)" class="filtro-nivel ativo" data-nivel="0" style="text-align:left;background:var(--card2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:6px;font-size:.78rem;cursor:pointer">Todos os niveis</button>
            </div>
          </div>
          <div style="background:var(--bg);border-radius:8px;padding:.75rem;margin-top:1rem">
            <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px">Total em comissoes</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--success)" id="rede-comissoes">R$ 0,00</div>
          </div>
        </div>
        <div style="flex:1;padding:1.5rem;overflow-x:auto;min-width:300px">
          <div id="tree-svg-container" style="min-width:500px"><div class="empty">Carregando rede...</div></div>
        </div>
      </div>
    </div>`;

c = c.slice(0, oldStart) + novaRedeHtml + c.slice(oldEnd + 6);

// 2. Adiciona CSS para os pinos de mapa
const novoCss = `
.pin-node{cursor:pointer;transition:opacity .15s}
.pin-node:hover{opacity:.8}
.filtro-nivel.ativo{background:var(--blue-glow)!important;border-color:var(--blue-border)!important;color:var(--blue-bright)!important}
`;
c = c.replace('</style>', novoCss + '</style>');

// 3. Substitui as funcoes loadTree/node por nova logica de arvore ramificada em SVG
const oldFnStart = c.indexOf('async function loadTree()');
const oldFnEnd = c.indexOf('function updTotal()');
if (oldFnStart === -1 || oldFnEnd === -1) {
  console.log('ERRO: nao encontrou funcoes loadTree/node');
  process.exit(1);
}

const novasFn = `let REDE_DATA = null;
let REDE_FILTRO = 0;

const NIVEL_CORES = [
  {fill:'#60a5fa', stroke:'#3b82f6', text:'#0c2540'},
  {fill:'#c4b5fd', stroke:'#a78bfa', text:'#2e1a5c'},
  {fill:'#5eead4', stroke:'#14b8a6', text:'#0a3a32'},
  {fill:'#fca5a5', stroke:'#ef4444', text:'#4a1010'},
  {fill:'#d1d5db', stroke:'#9ca3af', text:'#1f2937'}
];

async function loadTree(){
  try{
    const r=await fetch(B+'/api/rede/'+ID);
    const t=await r.json();
    REDE_DATA = t;
    renderRedeResumo(t);
    renderRedeFiltros(t);
    renderRedeSvg(t);
  }catch(e){
    document.getElementById('tree-svg-container').innerHTML='<div class="empty">Erro ao carregar rede</div>';
  }
}

function contarNodos(n, nivel, contagem){
  if(!n) return contagem;
  if(nivel > 0) contagem.total++;
  contagem.porNivel[nivel] = (contagem.porNivel[nivel]||0) + (nivel>0?1:0);
  (n.children||[]).forEach(c => contarNodos(c, nivel+1, contagem));
  return contagem;
}

function renderRedeResumo(t){
  const c = contarNodos(t, 0, {total:0, porNivel:{}});
  document.getElementById('rede-total').textContent = c.total + (c.total===1?' partner na rede':' partners na rede');
  const niveisAtivos = Object.keys(c.porNivel).filter(k=>c.porNivel[k]>0).length;
  document.getElementById('rede-niveis').textContent = niveisAtivos + (niveisAtivos===1?' nivel ativo':' niveis ativos');
  let comissaoTotal = 0;
  if(VD && VD.comissoes) comissaoTotal = VD.comissoes.reduce((s,x)=>s+parseFloat(x.valor),0);
  document.getElementById('rede-comissoes').textContent = f(comissaoTotal);
}

function renderRedeFiltros(t){
  const c = contarNodos(t, 0, {total:0, porNivel:{}});
  const maxNivel = Math.max(0, ...Object.keys(c.porNivel).map(Number));
  const cont = document.getElementById('rede-filtros');
  let html = '<button onclick="filtrarRede(0)" class="filtro-nivel'+(REDE_FILTRO===0?' ativo':'')+'" data-nivel="0" style="text-align:left;background:var(--card2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:6px;font-size:.78rem;cursor:pointer">Todos os niveis</button>';
  for(let i=1;i<=maxNivel;i++){
    if(c.porNivel[i]>0){
      html += '<button onclick="filtrarRede('+i+')" class="filtro-nivel'+(REDE_FILTRO===i?' ativo':'')+'" data-nivel="'+i+'" style="text-align:left;background:var(--card2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:6px;font-size:.78rem;cursor:pointer">Nivel '+i+' ('+c.porNivel[i]+' partner'+(c.porNivel[i]>1?'s':'')+')</button>';
    }
  }
  cont.innerHTML = html;
}

function filtrarRede(nivel){
  REDE_FILTRO = nivel;
  document.querySelectorAll('.filtro-nivel').forEach(b=>b.classList.toggle('ativo', parseInt(b.dataset.nivel)===nivel));
  if(REDE_DATA) renderRedeSvg(REDE_DATA);
}

function buildTreeLayout(node, nivel, x, spacing){
  if(!node) return {nodes:[], width:0};
  const children = node.children || [];
  if(children.length === 0){
    return {
      nodes:[{node, nivel, x, childrenX:[]}],
      width: spacing
    };
  }
  let totalWidth = 0;
  let childResults = [];
  let curX = x - (children.length-1) * spacing / 2;
  children.forEach((child, i) => {
    const childSpacing = spacing;
    const res = buildTreeLayout(child, nivel+1, curX, childSpacing * 0.85);
    childResults.push(res);
    curX += childSpacing;
    totalWidth += res.width;
  });
  const childrenX = childResults.map(r => r.nodes[0] ? r.nodes[0].x : 0);
  const avgX = childrenX.length ? childrenX.reduce((a,b)=>a+b,0)/childrenX.length : x;
  let allNodes = [{node, nivel, x: avgX, childrenX}];
  childResults.forEach(r => { allNodes = allNodes.concat(r.nodes); });
  return {nodes: allNodes, width: Math.max(totalWidth, spacing)};
}

function renderRedeSvg(t){
  const cont = document.getElementById('tree-svg-container');
  if(!t){ cont.innerHTML = '<div class="empty">Nenhum dado de rede</div>'; return; }

  let filteredTree = JSON.parse(JSON.stringify(t));
  if(REDE_FILTRO > 0){
    function pruneToLevel(node, curLevel){
      if(curLevel >= REDE_FILTRO){ node.children = []; return; }
      (node.children||[]).forEach(c => pruneToLevel(c, curLevel+1));
    }
    pruneToLevel(filteredTree, 0);
  }

  const layout = buildTreeLayout(filteredTree, 0, 300, 130);
  if(!layout.nodes.length){ cont.innerHTML = '<div class="empty">Nenhum indicado ainda</div>'; return; }

  const maxNivel = Math.max(...layout.nodes.map(n=>n.nivel));
  const width = Math.max(600, layout.width + 100);
  const height = 70 + maxNivel * 110 + 60;

  let svg = '<svg viewBox="0 0 '+width+' '+height+'" style="width:100%;height:'+height+'px;min-width:'+Math.min(width,1200)+'px">';

  const nodeByNivel = {};
  layout.nodes.forEach(n => { (nodeByNivel[n.nivel] = nodeByNivel[n.nivel]||[]).push(n); });

  layout.nodes.forEach(n => {
    const y = 40 + n.nivel * 110;
    (n.node.children||[]).forEach((child, i) => {
      const childNode = layout.nodes.find(cn => cn.nivel === n.nivel+1 && cn.node.id === child.id);
      if(!childNode) return;
      const cy = 40 + (n.nivel+1) * 110;
      const midY = y + 28 + (cy - 28 - (y+28))/2 + 15;
      svg += '<line x1="'+n.x+'" y1="'+(y+28)+'" x2="'+n.x+'" y2="'+midY+'" stroke="var(--border)" stroke-width="2"/>';
      svg += '<line x1="'+n.x+'" y1="'+midY+'" x2="'+childNode.x+'" y2="'+midY+'" stroke="var(--border)" stroke-width="2"/>';
      svg += '<line x1="'+childNode.x+'" y1="'+midY+'" x2="'+childNode.x+'" y2="'+(cy-28)+'" stroke="var(--border)" stroke-width="2"/>';
    });
  });

  layout.nodes.forEach(n => {
    const y = 40 + n.nivel * 110;
    const color = NIVEL_CORES[Math.min(n.nivel, NIVEL_CORES.length-1)];
    const isRoot = n.nivel === 0;
    const radius = isRoot ? 28 : 24;
    const initials = (n.node.nome||'??').split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
    const nomeExibido = (n.node.nome||'').split(' ')[0];

    svg += '<g class="pin-node" onclick="abrirPartnerInfo(\\''+n.node.id+'\\')">';
    svg += '<circle cx="'+n.x+'" cy="'+y+'" r="'+radius+'" fill="'+color.fill+'" stroke="'+color.stroke+'" stroke-width="2"/>';
    svg += '<text x="'+n.x+'" y="'+(y+5)+'" text-anchor="middle" font-size="'+(isRoot?14:12)+'" font-weight="700" fill="'+color.text+'">'+initials+'</text>';
    if(!isRoot){
      svg += '<path d="M '+n.x+' '+(y+radius)+' L '+(n.x-9)+' '+(y+radius+20)+' L '+(n.x+9)+' '+(y+radius+20)+' Z" fill="'+color.fill+'" stroke="'+color.stroke+'" stroke-width="1"/>';
    }
    const labelY = isRoot ? y + radius + 18 : y + radius + 36;
    svg += '<text x="'+n.x+'" y="'+labelY+'" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">'+nomeExibido+'</text>';
    if(isRoot){
      svg += '<text x="'+n.x+'" y="'+(labelY+14)+'" text-anchor="middle" font-size="10" fill="var(--muted)">Voce</text>';
    }else{
      svg += '<text x="'+n.x+'" y="'+(labelY+14)+'" text-anchor="middle" font-size="10" fill="var(--muted)">Nivel '+n.nivel+' &middot; '+n.node.id+'</text>';
    }
    svg += '</g>';
  });

  svg += '</svg>';
  cont.innerHTML = svg;
}

function abrirPartnerInfo(partnerId){
  window.open('painel.html?id='+partnerId, '_blank');
}

function node(n,root){return'';}

function updTotal()`;

c = c.slice(0, oldFnStart) + novasFn + c.slice(oldFnEnd + 'function updTotal()'.length);

fs.writeFileSync('painel.html', c);
console.log('OK!');
console.log('renderRedeSvg:', c.includes('function renderRedeSvg'));
console.log('tree-svg-container:', c.includes('tree-svg-container'));
console.log('tamanho:', c.length);
