const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const ids = c.match(/id="cc-[^"]+"/g);
console.log([...new Set(ids)]);