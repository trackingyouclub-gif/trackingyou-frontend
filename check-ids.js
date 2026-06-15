const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const ids = c.match(/id="[^"]+"/g);
const inputs = ids.filter(i => !i.includes('section') && !i.includes('tab') && !i.includes('modal') && !i.includes('feedback') && !i.includes('btn') && !i.includes('product') && !i.includes('nav'));
console.log([...new Set(inputs)]);