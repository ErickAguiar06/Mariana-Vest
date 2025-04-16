let produtos = [];

fetch("assets/produtos.json")
  .then(res => res.json())
  .then(data => {
    produtos = data;
    renderProdutos();
    atualizarQuantidadeCarrinho();
    window.atualizarQuantidadeCarrinho = atualizarQuantidadeCarrinho;
  })
  .catch(error => console.error("Erro ao carregar produtos:", error));

const container = document.getElementById("produtos");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalNome = document.getElementById("modal-nome");
const modalDesc = document.getElementById("modal-desc");
const modalPreco = document.getElementById("modal-preco");
const modalFrete = document.getElementById("modal-frete");
const btnAddCarrinho = document.getElementById("btn-add-carrinho");
const btnClose = document.querySelector(".close");

let produtoSelecionado = null;

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function renderProdutos() {
  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <p><strong>${formatarPreco(produto.preco)}</strong></p>
      <button onclick="abrirModal(${produto.id})">Detalhes</button>
    `;
    container.appendChild(card);
  });
}

function abrirModal(id) {
  const produto = produtos.find(p => p.id === id);
  produtoSelecionado = produto;

  modalImg.src = produto.imagem;
  modalNome.textContent = produto.nome;
  modalDesc.textContent = produto.descricao;
  modalPreco.textContent = `Preço: ${formatarPreco(produto.preco)}`;

  const frete = produto.peso * 0.1;
  modalFrete.textContent = `Frete: ${formatarPreco(frete)}`;

  modal.classList.remove("hidden");
}

btnClose.onclick = () => {
  modal.classList.add("hidden");
};

btnAddCarrinho.onclick = () => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const existente = carrinho.find(p => p.id === produtoSelecionado.id);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ ...produtoSelecionado, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if (typeof atualizarQuantidadeCarrinho === 'function') {
    atualizarQuantidadeCarrinho();
  }

  modal.classList.add("hidden");
};

function atualizarQuantidadeCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  const span = document.getElementById("quantidade-carrinho");
  if (span) span.textContent = totalItens;
}

atualizarQuantidadeCarrinho();
