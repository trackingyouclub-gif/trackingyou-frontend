const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Extrai o footer
const footerStart = c.indexOf('<footer>');
const footerEnd = c.indexOf('</footer>') + 9;
const footer = c.slice(footerStart, footerEnd);

// Remove footer do lugar atual
c = c.slice(0, footerStart) + c.slice(footerEnd);

// Insere footer antes do </body>
c = c.replace('</body>', footer + '\n</body>');

fs.writeFileSync('index.html', c);
console.log('OK');
const newFooterIdx = c.indexOf('<footer>');
const newVideoIdx = c.indexOf('riPKBId_YhY');
console.log('video antes do footer:', newVideoIdx < newFooterIdx);