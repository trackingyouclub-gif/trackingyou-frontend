const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');

// Adiciona botao editar na tabela de afiliados
c = c.replace(
  "'<td><a href=\"painel.html?id='+u.id+'\" target=\"_blank\" class=\"btn ghost\" style=\"font-size:.75rem\">Ver painel</a></td>'",
  "'<td><div class=\"btn-group\"><a href=\"painel.html?id='+u.id+'\" target=\"_blank\" class=\"btn ghost\" style=\"font-size:.75rem\">Ver painel</a><button class=\"btn warn\" onclick=\"editarVendedor(\\'' + u.id + '\\',\\'' + u.email + '\\')\" style=\"font-size:.75rem\">Editar</button></div></td>'"
);

// Adiciona funcao editarVendedor
const fn = `
function editarVendedor(id, emailAtual){
  const novoEmail=prompt('Email atual: '+emailAtual+'\\nNovo email (deixe vazio para manter):',emailAtual);
  const novaSenha=prompt('Nova senha (deixe vazio para nao alterar):');
  if(novoEmail===null&&novaSenha===null)return;
  const body={};
  if(novoEmail&&novoEmail!==emailAtual)body.email=novoEmail;
  if(novaSenha&&novaSenha.length>=6)body.novaSenha=novaSenha;
  if(!Object.keys(body).length){alert('Nada alterado.');return;}
  fetch(B+'/api/admin/vendedor/'+id+'/editar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    .then(r=>r.json()).then(d=>{if(d.ok)alert('Dados atualizados!');else alert('Erro: '+d.error);carregarAfiliados();})
    .catch(()=>alert('Erro ao atualizar'));
}
`;

c = c.replace('function fecharEtiqueta()', fn + '\nfunction fecharEtiqueta()');

fs.writeFileSync('admin.html', c);
console.log('OK');