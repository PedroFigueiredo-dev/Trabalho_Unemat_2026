document.addEventListener('DOMContentLoaded', () => {
  // Estado global da aplicação
  let produtosGerais = [];
  
  // Elementos do DOM
  const gridProdutos = document.getElementById('grid-produtos');
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const emptyState = document.getElementById('empty-state');
  const btnRetry = document.getElementById('btn-retry');
  
  const campoBusca = document.getElementById('campo-busca');
  const selectCategoria = document.getElementById('select-categoria');
  
  // Instância do Modal Bootstrap
  const modalDetalhesElement = document.getElementById('modalDetalhes');
  const bsModalDetalhes = new bootstrap.Modal(modalDetalhesElement);
  const modalBodyContent = document.getElementById('modal-body-content');

  // Inicializa o carregamento dos produtos
  carregarProdutos();

  // Listener para tentar carregar novamente em caso de erro
  btnRetry.addEventListener('click', carregarProdutos);

  // Listeners para Busca e Filtros
  campoBusca.addEventListener('input', aplicarFiltros);
  selectCategoria.addEventListener('change', aplicarFiltros);

  /**
   * Requisita a lista inicial de produtos via AJAX (Fetch API)
   */
  async function carregarProdutos() {
    exibirEstado('loading');

    try {
      // Simula uma pequena latência de rede para visualização do spinner
      const response = await fetch('data/produtos.json');
      
      if (!response.ok) {
        throw new Error(`Erro na requisição HTTP: ${response.status}`);
      }

      produtosGerais = await response.json();
      
      if (produtosGerais.length === 0) {
        exibirEstado('empty');
      } else {
        renderizarProdutos(produtosGerais);
        exibirEstado('content');
      }
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
      exibirEstado('error');
    }
  }

  /**
   * Renderiza os cards de produtos no Grid
   */
  function renderizarProdutos(lista) {
    gridProdutos.innerHTML = '';

    if (lista.length === 0) {
      exibirEstado('empty');
      return;
    }

    exibirEstado('content');

    lista.forEach(produto => {
      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
        <article class="card h-100 shadow-sm border-0">
          <img src="${produto.imagem}" class="card-img-top" alt="${produto.titulo}">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 align-self-start text-uppercase fs-6" style="font-size: 0.7rem !important;">
              ${produto.categoria}
            </span>
            <h3 class="card-title h6 fw-bold text-dark">${produto.titulo}</h3>
            <p class="card-text text-muted small flex-grow-1">${produto.resumo}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="fw-bold text-primary fs-5">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
              <button class="btn btn-outline-primary btn-sm btn-detalhes" data-id="${produto.id}">
                Ver detalhes
              </button>
            </div>
          </div>
        </article>
      `;

      gridProdutos.appendChild(col);
    });

    // Adiciona evento de clique aos botões de detalhes
    document.querySelectorAll('.btn-detalhes').forEach(botao => {
      botao.addEventListener('click', (e) => {
        const idProduto = e.target.getAttribute('data-id');
        carregarDetalhesProduto(idProduto);
      });
    });
  }

  /**
   * Requisita os detalhes estendidos de um produto específico via AJAX
   */
  async function carregarDetalhesProduto(id) {
    // Configura estado de carregamento dentro da Modal
    modalBodyContent.innerHTML = `
      <div class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando detalhes...</span>
        </div>
        <p class="mt-2 text-muted mb-0">Buscando informações adicionais...</p>
      </div>
    `;
    bsModalDetalhes.show();

    try {
      const response = await fetch('data/detalhes.json');
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar detalhes: ${response.status}`);
      }

      const todosDetalhes = await response.json();
      const detalhes = todosDetalhes[id];

      if (detalhes) {
        // Renderiza as informações complementares obtidas na requisição AJAX
        modalBodyContent.innerHTML = `
          <p class="mb-3">${detalhes.descricaoCompleta}</p>
          <ul class="list-group list-group-flush mb-3">
            <li class="list-group-item"><strong>Composição:</strong> ${detalhes.material}</li>
            <li class="list-group-item"><strong>Tamanhos Disponíveis:</strong> ${detalhes.tamanhos.join(', ')}</li>
            <li class="list-group-item"><strong>Instruções de Cuidado:</strong> ${detalhes.cuidados}</li>
          </ul>
        `;
      } else {
        modalBodyContent.innerHTML = `<div class="alert alert-warning">Detalhes adicionais não encontrados para este produto.</div>`;
      }
    } catch (error) {
      console.error('Erro na requisição de detalhes:', error);
      modalBodyContent.innerHTML = `
        <div class="alert alert-danger mb-0">
          Não foi possível carregar os detalhes do produto. Tente novamente mais tarde.
        </div>
      `;
    }
  }

  /**
   * Aplica a busca por texto e o filtro por categoria localmente nos dados já carregados
   */
  function aplicarFiltros() {
    const termoBusca = campoBusca.value.toLowerCase().trim();
    const categoriaSelecionada = selectCategoria.value;

    const produtosFiltrados = produtosGerais.filter(produto => {
      const atendeBusca = produto.titulo.toLowerCase().includes(termoBusca) || 
                         produto.resumo.toLowerCase().includes(termoBusca);
      
      const atendeCategoria = categoriaSelecionada === 'todas' || 
                              produto.categoria === categoriaSelecionada;

      return atendeBusca && atendeCategoria;
    });

    renderizarProdutos(produtosFiltrados);
  }

  /**
   * Gerencia a exibição dos estados da UI (Loading, Content, Empty, Error)
   */
  function exibirEstado(estado) {
    loadingState.classList.add('d-none');
    errorState.classList.add('d-none');
    emptyState.classList.add('d-none');
    gridProdutos.classList.add('d-none');

    switch (estado) {
      case 'loading':
        loadingState.classList.remove('d-none');
        break;
      case 'error':
        errorState.classList.remove('d-none');
        break;
      case 'empty':
        emptyState.classList.remove('d-none');
        break;
      case 'content':
        gridProdutos.classList.remove('d-none');
        break;
    }
  }
});