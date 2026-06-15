const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const idx = c.indexOf('id="qty-select"');
console.log(c.substring(idx-20, idx+300));