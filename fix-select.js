const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const s = c.indexOf('<select class="qty-select" id="product-select"');
const e = c.indexOf('</select>', s) + 9;

const novoSelect = `<select class="qty-select" id="product-select" onchange="updateOrder()" style="display:none">
              <option value="299.90" data-name="TrackingYou Tag+" data-key="tag" selected>TrackingYou Tag+ — R$ 299,90</option>
            </select>`;

c = c.slice(0, s) + novoSelect + c.slice(e);
fs.writeFileSync('index.html', c);
console.log('OK');
console.log('299.90:', c.includes('299.90'));
console.log('Tag Veicular:', c.includes('Tag Veicular'));