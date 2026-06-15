const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Após pagamento aprovado com cartao, redireciona para painel
c = c.replace(
  "showFeedback('✅ Pagamento aprovado! Você receberá a confirmação por e-mail em breve.','success');\n  document.getElementById('btn-checkout').disabled = true;",
  `showFeedback('✅ Pagamento aprovado! Redirecionando para seu painel...','success');
  document.getElementById('btn-checkout').disabled = true;
  setTimeout(async()=>{
    try{
      const r=await fetch(BACKEND_URL+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cpfCnpj:customerData.cpfCnpj,senha:document.getElementById('f-senha').value})});
      const d=await r.json();
      if(d.ok){sessionStorage.setItem('ty_vendor_id',d.id);window.open('painel.html','_blank');}
    }catch(e){}
  },2000);`
);

// Após PIX gerado, mostra link do painel
c = c.replace(
  "showFeedback('⚡ QR Code gerado! Pague via PIX para confirmar.','success');\n  document.getElementById('btn-checkout').disabled = true;",
  `showFeedback('⚡ QR Code gerado! Pague via PIX para confirmar. Após pagamento acesse seu painel.','success');
  document.getElementById('btn-checkout').disabled = true;`
);

fs.writeFileSync('index.html', c);
console.log('OK - redirecionamento adicionado!');
console.log('redirect:', c.includes('Redirecionando para seu painel'));