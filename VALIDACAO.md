# Validação da demonstração 1.1.0

Revisão de 19/10/2026. Passaram **42 verificações automatizadas do motor/pacotes** e **13 verificações da interface macOS em WKWebView real**. A abertura/cancelamento pelo seletor nativo, ⌘O, ⌘S, revisão e gravação via NSSavePanel também foram exercitados; o título salvo foi conferido por leitor ZIP/XML independente. Os testes de 1.0.0 pertencem à versão anterior e não comprovam a nova interface.

| Item | Estado |
| --- | --- |
| Separação do motor comercial e da edição privada completa | Projetos independentes; nenhum ProjectReference para produção/licenciamento |
| Alteração exclusiva do título DOCX | Verificada no motor compartilhado com arquivos reais de teste e leitor ZIP/XML independente |
| Original, outros metadados e partes preservados | Verificados por hash, comparação XML e bytes descompactados |
| Recusa de destino existente, origem modificada, assinatura, macros, links, XML inválido e limites | Coberta pela aceitação automatizada |
| Aplicativo macOS com runtime incluído | Executado com abertura e gravação reais pela interface AppKit/WebKit |
| Navegação, estado de edição e texto malicioso na interface macOS | Verificados em WKWebView real |
| Assinatura local do pacote macOS | `codesign --verify --deep --strict` aprovado; assinatura ad hoc, sem identidade Developer ID |
| Windows x64 | Compilação self-contained concluída, runtime/WPF incluídos; sem execução do aplicativo no Windows nesta entrega |
| Conteúdo público e ZIPs | Revisados para excluir fontes privados, motor completo, PDB, bancos, chaves e configurações de produção |
| Windows limpo, SmartScreen e interface em outras escalas/DPI | Pendente |
| Notarização Apple e certificado comercial Windows | Não disponíveis nesta entrega |
| macOS Intel e macOS 14–26 | Não validados; nenhum pacote Intel publicado |

O motor da demo compartilha a mesma implementação .NET entre Windows e macOS. Testá-lo no macOS não comprova a interface WPF ou todos os comportamentos do sistema de arquivos no Windows. A comparação de conteúdo é estrutural; não renderiza o documento no Word nem garante anonimização.

Nenhuma pendência é apresentada como concluída. Os hashes identificam os arquivos publicados; não substituem certificados do publicador.
