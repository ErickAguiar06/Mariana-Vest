function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }
  
  function renderCarrinho() {
    const tbody = document.getElementById('corpo-tabela');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;
  
    carrinho.forEach(produto => {
      const tr = document.createElement('tr');
      const subtotal = produto.preco * produto.quantidade;
      total += subtotal;
  
      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.descricao}</td>
        <td><img src="${produto.imagem}" alt="${produto.nome}" width="60"></td>
        <td>
          <button onclick="alterarQuantidade(${produto.id}, -1)">-</button>
          ${produto.quantidade}
          <button onclick="alterarQuantidade(${produto.id}, 1)">+</button>
        </td>
        <td>${formatarPreco(subtotal)}</td>
      `;
  
      tbody.appendChild(tr);
    });
  
    document.getElementById("total-geral").textContent = `Total R$ ${formatarPreco(total)}`;
  }
  
  function alterarQuantidade(id, delta) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
    const produto = carrinho.find(p => p.id === id);
    if (!produto) return;
  
    produto.quantidade += delta;
    if (produto.quantidade <= 0) {
      carrinho = carrinho.filter(p => p.id !== id);
    }
  
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload();
  }
  
  function enviarPedido() {
    localStorage.removeItem('carrinho');
    alert('Pedido enviado com sucesso!');
    location.reload();
  }
  
renderCarrinho();