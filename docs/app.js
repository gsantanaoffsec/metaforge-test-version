"use strict";
const examples={
 pdf:{name:"proposta-comercial.pdf",format:"PDF",fields:[["Título","Proposta comercial","Documento"],["Autor","Equipe Exemplo","Documento"],["Assunto","Apresentação de serviços","Documento"],["Palavras-chave","proposta, organização","Documento"],["Tamanho","248 KB","Sistema"]]},
 docx:{name:"relatorio-mensal.docx",format:"DOCX",fields:[["Título","Relatório mensal","Documento"],["Autor","Equipe Exemplo","Documento"],["Assunto","Acompanhamento de resultados","Documento"],["Palavras-chave","relatório, mensal","Documento"],["Tamanho","96 KB","Sistema"]]},
 jpg:{name:"imagem-campanha.jpg",format:"JPG",fields:[["Título","Campanha de outono","Imagem"],["Artista","Equipe Exemplo","Imagem"],["Descrição","Imagem de campanha — exemplo fictício","Imagem"],["Direitos autorais","Créditos ilustrativos","Imagem"],["Dimensões","1920 × 1080","Sistema"]]}
};
let section="editor",example="pdf",tab="profiles";
const $=id=>document.getElementById(id);
const table=(headers,rows)=>`<div class="table-wrap"><table><thead><tr>${headers.map(x=>`<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const previews={
 policies:["Conferência por políticas","<p>Confira se um conjunto atende aos requisitos escolhidos, sem alterar os documentos.</p>"+table(["Requisito","Exemplo de resultado"],[["Título preenchido","Atendido"],["Autor informado","Atendido"],["Sem dados GPS","Atendido"]])],
 inventory:["Inventário CSV","<p>Organize as propriedades de vários arquivos em uma tabela para consulta e conferência.</p>"+table(["Arquivo","Título","Autor"],[["proposta-comercial.pdf","Proposta comercial","Equipe Exemplo"],["relatorio-mensal.docx","Relatório mensal","Equipe Exemplo"]])],
 normalize:["Normalização","<p>Revise transformações de texto antes de aplicar a um conjunto.</p>"+table(["Antes","Depois"],[["  Relatório   mensal  ","Relatório mensal"]])],
 comparison:["Comparar arquivos","<p>Veja as diferenças entre as propriedades de arquivos selecionados.</p>"+table(["Propriedade","Arquivo A","Arquivo B"],[["Título","Proposta comercial","Proposta revisada"],["Autor","Equipe Exemplo","Equipe Exemplo"]])],
 rename:["Renomeação por metadados","<p>Prepare novos nomes usando valores das propriedades e confira o resultado antes de executar.</p><div class='preview-value'>documento-01.docx → Relatório mensal.docx</div>"],
 queue:["Filas persistentes","<p>Organize tarefas e revise itens pendentes antes de retomar o trabalho.</p>"+table(["Arquivo","Estado ilustrativo"],[["relatorio-mensal.docx","Pendente"],["proposta-comercial.pdf","Preparado"]])],
 diagnostic:["Diagnóstico para suporte","<p>No aplicativo completo, revise informações técnicas antes de exportar.</p>"+table(["Informação","Exemplo fictício"],[["Versão","MetaForge 1.3"],["Plataforma","Windows x64"],["Componentes","Disponíveis"]])],
 guide:["Guia de uso","<ol class='steps'><li>Abra um documento ou imagem no aplicativo completo.</li><li>Confira os valores e edite os campos disponíveis.</li><li>Valide as alterações e escolha o destino.</li><li>Confira os metadados do resultado.</li></ol><p>A edição instalável de demonstração permite somente mudar o título de DOCX e salvar uma nova cópia.</p>"]
};
const panels={
 profiles:"<h2>Perfis reutilizáveis</h2><p class='muted'>Regras organizadas para repetir um padrão com revisão antes de aplicar.</p><div class='preview-value'>Autoria e organização · exemplo fictício</div><div class='profile-rule'><strong>Título</strong><span>Definir valor</span><span>Relatório mensal</span></div><div class='profile-rule'><strong>Autor</strong><span>Preservar</span><span>—</span></div><div class='profile-rule'><strong>Assunto</strong><span>Preservar</span><span>—</span></div><div class='action-row'><button data-unavailable='O editor de perfis está bloqueado nesta demonstração.'>Criar perfil</button><button data-unavailable='A aplicação de perfis está bloqueada nesta demonstração.'>Aplicar perfil</button></div>",
 batch:"<h2>Processamento em lote</h2><p class='muted'>Prepare as operações de um conjunto e revise cada arquivo antes de executar.</p>"+table(["Arquivo","Estado ilustrativo"],[["relatorio-mensal.docx","Preparado"],["proposta-comercial.pdf","Preparado"],["imagem-campanha.jpg","Preparado"]])+"<button data-unavailable='O processamento em lote está bloqueado nesta demonstração.'>Executar lote</button>",
 inspection:"<h2>Inspeção dos metadados</h2><p class='muted'>Confira as propriedades disponíveis em uma consulta.</p>"+table(["Propriedade","Valor fictício"],[["Título","Proposta comercial"],["Autor","Equipe Exemplo"],["Formato","PDF"]])+"<button data-unavailable='A exportação de relatórios está bloqueada nesta demonstração.'>Exportar relatório</button>",
 history:"<h2>Histórico local e backups</h2><p class='muted'>Acompanhe operações e consulte resultados anteriores.</p>"+table(["Arquivo","Resultado fictício"],[["proposta-comercial.pdf","Cópia criada"],["relatorio-mensal.docx","Conferido"]])+"<p class='small muted'>Estes registros são ilustrações; nenhuma operação foi executada.</p>"
};
function navigate(next){
 if(!["license","editor","workspace","settings"].includes(next))return;
 section=next;
 document.querySelectorAll(".section").forEach(el=>el.hidden=el.id!==section);
 document.querySelectorAll("[data-section]").forEach(el=>{if(el.dataset.section===section)el.setAttribute("aria-current","page");else el.removeAttribute("aria-current");});
 $("breadcrumb").textContent="WORKSPACE / "+({license:"LICENÇA",editor:"METADADOS",workspace:"PERFIS, LOTE E HISTÓRICO",settings:"CONFIGURAÇÕES"}[section]);
}
function renderFields(){
 const data=examples[example],query=$("search").value.trim().toLocaleLowerCase("pt-BR"),group=$("group").value;
 const matching=data.fields.filter(([label,,g])=>(group==="all"||g===group)&&label.toLocaleLowerCase("pt-BR").includes(query));
 $("fields").replaceChildren();
 matching.forEach(([label,value,g],i)=>{
  const row=document.createElement("div");row.className="field";
  const title=document.createElement("label");title.htmlFor="field-"+i;title.textContent=label;
  const caption=document.createElement("span");caption.textContent=g+" · somente leitura";title.append(caption);
  const input=document.createElement("input");input.id="field-"+i;input.value=value;input.readOnly=true;
  row.append(title,input);$("fields").append(row);
 });
 if(!matching.length){const p=document.createElement("p");p.className="no-results";p.textContent="Nenhuma propriedade corresponde ao filtro.";$("fields").append(p);}
}
function setExample(next){
 if(!examples[next])return;example=next;
 const data=examples[example];$("file-name").textContent=data.name;$("file-format").textContent=data.format;$("file-size").textContent=(example==="docx"?"96 KB":example==="jpg"?"420 KB":"248 KB")+" · Exemplo fictício";$("file-path").textContent="Documentos / Exemplos / "+data.name;
 document.querySelectorAll("[data-example]").forEach(el=>el.setAttribute("aria-pressed",String(el.dataset.example===example)));
 $("group").value="all";$("search").value="";renderFields();
}
function setTab(next){
 if(!panels[next])return;tab=next;
 document.querySelectorAll("[data-tab]").forEach(el=>{el.setAttribute("aria-selected",String(el.dataset.tab===tab));el.tabIndex=el.dataset.tab===tab?0:-1;});
 $("workspace-panel").setAttribute("aria-labelledby","tab-"+tab);$("workspace-panel").innerHTML=panels[tab];
}
document.addEventListener("click",event=>{
 const button=event.target.closest("button");if(!button)return;
 if(button.dataset.section)navigate(button.dataset.section);
 if(button.dataset.example)setExample(button.dataset.example);
 if(button.dataset.tab)setTab(button.dataset.tab);
 if(button.dataset.unavailable){$("notice-text").textContent=button.dataset.unavailable;$("notice").hidden=false;}
 if(previews[button.dataset.preview]){const [title,body]=previews[button.dataset.preview];$("preview-title").textContent=title;$("preview-body").innerHTML=body;$("preview-dialog").showModal();}
});
document.querySelector(".tabs").addEventListener("keydown",event=>{
 const keys=["profiles","batch","inspection","history"],i=keys.indexOf(tab);let next;
 if(event.key==="ArrowRight")next=keys[(i+1)%keys.length];if(event.key==="ArrowLeft")next=keys[(i+keys.length-1)%keys.length];if(event.key==="Home")next=keys[0];if(event.key==="End")next=keys.at(-1);
 if(next){event.preventDefault();setTab(next);$("tab-"+next).focus();}
});
$("next-example").addEventListener("click",()=>{const keys=Object.keys(examples);setExample(keys[(keys.indexOf(example)+1)%keys.length]);});
$("search").addEventListener("input",renderFields);$("group").addEventListener("change",renderFields);
$("close-dialog").addEventListener("click",()=>$("preview-dialog").close());
$("dismiss-notice").addEventListener("click",()=>$("notice").hidden=true);
navigate(section);setExample(example);setTab(tab);
