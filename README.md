# MetaForge — demonstração pública

Conheça a interface de um aplicativo para editar, organizar e conferir metadados de documentos e imagens.

Este repositório contém **somente a vitrine web e a documentação da demonstração**. O código-fonte do aplicativo comercial, suas licenças, chaves e serviços não fazem parte dele.

## Duas formas de conhecer

**Vitrine web:** explore as seções, três exemplos de arquivo e prévias das ferramentas pelo navegador, inclusive no celular. Os dados são fictícios. A vitrine não abre, edita ou exporta arquivos; não instala componentes nem se conecta ao servidor do produto.

**MetaForge Demo para Windows x64:** uma edição independente e instalável, com runtime incluído. Você pode abrir um DOCX, alterar **somente o título** e salvar uma **nova cópia**. Todos os demais campos e operações estão bloqueados. PDF e imagens aparecem somente como exemplos fictícios. Esta edição não contém o motor completo do MetaForge, servidor, ExifTool, ativação de licença ou coleta de HWID.

O instalador cria uma cópia em `%LOCALAPPDATA%\MetaForgeDemo` e um atalho no menu Iniciar, sem exigir administrador. Pode ser desinstalado pela própria tela de Configurações. Não é registrado em Aplicativos instalados do Windows.

![Prévia da vitrine no navegador](docs/preview-web.png)

![Prévia da edição Windows com título DOCX disponível](docs/preview-windows.png)

### Limites da edição Windows

- Windows x64; não é um aplicativo para macOS ou Linux.
- DOCX com até 32 MB; título de até 512 caracteres.
- Exige propriedades básicas existentes em `docProps/core.xml`.
- Recusa documentos com assinatura digital, entradas duplicadas e estruturas incompatíveis.
- Preserva o original e recusa sobrescrever destinos existentes.
- Não substitui o aplicativo completo e não usa sua avaliação gratuita comercial.

## Publicar a vitrine

Envie `docs/`, `.gitignore`, este README, `LEIA-ME-DEMO.txt` e `TERMOS-DE-USO.md` para **este repositório separado**. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch publicada e a pasta **/docs**, depois salve. [Instruções oficiais do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

O endereço previsto é `https://gsantanaoffsec.github.io/metaforge-test-version/`; ele só estará disponível depois de publicar e habilitar Pages. O HTML/CSS/JavaScript da vitrine é público e inspecionável pelo navegador. Ele contém somente interface e dados fictícios.

Para prévia local, abra `docs/index.html` ou sirva a pasta `docs` com um servidor estático local.

## Publicar o instalador

Em **Releases → Draft a new release**, crie uma tag, por exemplo `demo-v1.0.0`, e anexe **MetaForge-Demo-win-x64.zip** e seu arquivo de checksums. Publique a release e divulgue o link dela. [Instruções oficiais de releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

O executável inclui o runtime e pode exceder 100 MB. Distribua o ZIP em **Releases**, sem adicionar binários ao histórico Git. Não envie `private-source/`, `artifacts/`, fontes C#, arquivos de teste, `.git` ou o repositório principal para esta publicação. Essas pastas locais estão ignoradas.

Fontes da demonstração e scripts de compilação são mantidos localmente, fora do conteúdo público. Faça um backup privado deles antes de trocar de computador: `git pull` deste repositório não os recupera.

## Verificações locais

Foram concluídas 40 verificações da edição Windows e 90 verificações da vitrine. Os testes cobrem alteração exclusiva do título, preservação de outras partes do DOCX e da origem, recusa de sobrescrita, entradas incompatíveis, navegação rápida, foco, filtros, abas por teclado e layouts de 375 a 1920 pixels. O instalador publicado abriu com o runtime incluído, sem executar a instalação.

A instalação/desinstalação completa em uma máquina Windows limpa e um certificado comercial de assinatura ainda não foram validados nesta entrega. A vitrine e a release precisam ser publicadas para disponibilizar os endereços de acesso e download.

## Direitos e proteção

Veja [TERMOS-DE-USO.md](TERMOS-DE-USO.md). As restrições de uso ressalvam permissões legais e licenças de terceiros. Texto, assinatura digital ou hash não tornam o software impossível de analisar. A proteção adotada nesta demo é distribuir uma edição reduzida que não inclui o motor completo do produto. O executável gerado não está assinado com certificado Authenticode comercial.
