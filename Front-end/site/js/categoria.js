if (typeof renderProducts === "function") {
  const produtosSection = document.querySelector("#produtos");
  const productsContainer = document.getElementById("products");

  // Remove qualquer conteúdo antigo
  productsContainer.innerHTML = "";

  // Renderiza os produtos filtrados
  produtosFiltrados.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("prod-card");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="categoria">${produto.categoria}</p>
      <p class="descricao">${produto.descricao}</p>
      <p class="preco">${produto.preco}</p>
      <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Adicionar ao Carrinho</button>
    `;

    productsContainer.appendChild(card);
  });

  // Mostra ou esconde "nenhum resultado"
  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.style.display = produtosFiltrados.length ? "none" : "block";
  }

  // Rolagem suave
  if (produtosSection) {
    produtosSection.scrollIntoView({ behavior: "smooth" });
  }
}
