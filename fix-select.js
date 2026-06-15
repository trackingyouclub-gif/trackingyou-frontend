const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Fix product-select - produto unico 299.90
const s1 = c.indexOf('<select class="qty-select" id="product-select"');
const e1 = c.indexOf('</select>', s1) + 9;
c = c.slice(0, s1) + `<select class="qty-select" id="product-select" style="display:none">
              <option value="299.90" data-name="TrackingYou Tag+" data-key="tag" selected>TrackingYou Tag+</option>
            </select>` + c.slice(e1);

// Fix qty-select - apenas 1 unidade sem desconto
const s2 = c.indexOf('<select class="qty-select" id="qty-select"');
const e2 = c.indexOf('</select>', s2) + 9;
c = c.slice(0, s2) + `<select class="qty-select" id="qty-select" onchange="updateOrder()">
              <option value="1">1 unidade</option>
            </select>` + c.slice(e2);

// Remove descontos
c = c.replace('const discounts = { 1: 0, 2: 0.10, 3: 0.15, 5: 0.20 };', 'const discounts = { 1: 0 };');

fs.writeFileSync('index.html', c);
console.log('OK');
console.log('299.90:', c.includes('299.90'));
console.log('Tag Veicular HTML:', c.includes('<option value="197"'));