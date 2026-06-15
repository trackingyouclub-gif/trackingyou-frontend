const fs = require('fs');
let c = fs.readFileSync('painel.html', 'utf8');

// Encontra onde o script começa (antes de init())
const scriptStart = c.indexOf('init().catch');
if (scriptStart === -1) { console.log('Nao achou init'); process.exit(1); }

// Insere a tag script antes do conteudo
const antes = c.substring(0, scriptStart);
const depois = c.substring(scriptStart);

// Verifica se tem a tag
if (!antes.includes('<script>')) {
  // Adiciona a tag script apos o ultimo </div> antes do script
  const lastDiv = antes.lastIndexOf('</div>');
  const novoHtml = antes.substring(0, lastDiv + 6) + '\n<script>\n' + antes.substring(lastDiv + 6) + depois;
  fs.writeFileSync('painel.html', novoHtml);
  console.log('Tag script adicionada!');
} else {
  console.log('Tag script ja existe');
}