[README.md](https://github.com/user-attachments/files/32588326/README.md)
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
   ```bash
   python -m http.server 8000

---

## 4. Roteiro de Testes para Avaliação
- **Testar Listagem Dinâmica e Grid:**
  - Acesse o sistema e verifique o carregamento automático dos 8 cards de roupas.
- **Testar Consulta de Detalhes via AJAX:**
  - Clique no botão "Ver detalhes" em qualquer item.
  - Observe a Modal abrir exibindo o indicador de carregamento e, logo em seguida, os dados complementares puxados via AJAX.
- **Testar Busca e Filtro:**
  - Digite no campo de busca palavras como "Jeans" ou "Algodão".
  - Altere o select de categoria para "Jaquetas" e valide a filtragem.
- **Testar Estado Vazio:**
  - Digite um termo inexistente no campo de busca (ex: "xyz123") para visualizar a mensagem de lista vazia.
-**Testar Estado de Erro:**
  - Altere temporariamente o caminho do arquivo no app.js (linha 29) para um nome inexistente (ex: data/produtos_errado.json) e recarregue a página.
  - Verifique a mensagem de erro e teste o botão "Tentar Novamente".
