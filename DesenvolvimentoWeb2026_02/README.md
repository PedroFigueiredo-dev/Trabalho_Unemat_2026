# Catálogo Urban Wear - Avaliação Prática Web (UNEMAT)

**Estudante:** Pedro Henrique Figueiredo
**Disciplina:** Desenvolvimento Web  
**Professor:** Ivan Luiz Pedroso Pires  
**Entrega:** 28/09/2026  

---

## 1. Descrição do Projeto
O **Urban Wear** é um catálogo interativo de loja de roupas desenvolvido em HTML5 semântico, CSS3 e Bootstrap 5. O sistema obtém as informações dos produtos de forma assíncrona via requisições AJAX (Fetch API) sem a necessidade de recarregar a página.

---

## 2. Funcionalidades Implementadas
- **Listagem Dinâmica (AJAX):** Carregamento inicial de 8 produtos a partir de `data/produtos.json`.
- **Consulta de Detalhes (AJAX):** Requisição adicional a `data/detalhes.json` exibida dentro de um componente Modal do Bootstrap.
- **Filtro e Busca:** Filtragem por palavra-chave e categoria com atualização em tempo real no DOM.
- **Estados da Interface:**
  - *Carregamento:* Spinner do Bootstrap exibido durante as chamadas.
  - *Vazio:* Mensagem orientativa quando a busca/filtro não retorna produtos.
  - *Erro e Tentar Novamente:* Botão de recuperação caso ocorra falha na requisição HTTP.

---

## 3. Instruções para Execução Local (Servidor HTTP)
Como o projeto utiliza requisições AJAX (`fetch`), ele não pode ser aberto diretamente pelo protocolo de arquivos (`file://`). É necessário rodar um servidor HTTP local.

### Opção 1: Usando Python (Recomendado)
1. Abra o terminal na pasta raiz do projeto.
2. Execute o comando:
   ```bash python -m http.server 8000