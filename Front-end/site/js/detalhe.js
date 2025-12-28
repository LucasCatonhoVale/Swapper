// ---------------------------
// detalhe.js
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetails");
  if (!container) return;

  // Verifica se há mensagem pendente no localStorage
  const mensagem = localStorage.getItem("alertMessage");
  if (mensagem) {
    showAlert(mensagem);
    localStorage.removeItem("alertMessage");
  }

  const nomeSelecionado = localStorage.getItem("selectedProductName");
  if (!nomeSelecionado) {
    container.innerHTML = `
      <p class="erro">Nenhum produto selecionado.</p>
      <a href="./index.html">Voltar</a>
    `;
    return;
  }

  const produtos = JSON.parse(localStorage.getItem("produtosLista")) || [];
  const produto = produtos.find(p => p.nome === nomeSelecionado);

  if (!produto) {
    container.innerHTML = `
      <p class="erro">Produto não encontrado.</p>
      <a href="./index.html">Voltar</a>
    `;
    return;
  }

  // Renderiza detalhes do produto
  container.innerHTML = `
    <div class="detalhe-produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="infor">
        <h2>${produto.nome}</h2>
        <p class="desc">${produto.descricao}</p>
        <p class="preco"><strong>R$:</strong> ${produto.preco},00</p>
        <button id="btnCarrinho">Adicionar ao carrinho</button>
        <button id="btnChat" class="chat-btn">Trocar</button> 
        <a href="./index.html" class="voltar">Voltar</a>
      </div>
    </div>
  `;

  // ---------------------------
  // Botão carrinho
  // ---------------------------
  const btnCarrinho = document.getElementById("btnCarrinho");
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => adicionarAoCarrinho(produto));
  }

  // ---------------------------
  // Botão chat
  // ---------------------------
  const btnChat = document.getElementById("btnChat");
  if (btnChat) {
    btnChat.addEventListener("click", () => {
      // Salva o produto selecionado para o chat
      localStorage.setItem("selectedChatProduct", JSON.stringify(produto));
      // Redireciona para a página de chat
      window.location.href = "./chat.html";
    });
  }
});

// ---------------------------
// Adiciona produto ao carrinho
// ---------------------------
function adicionarAoCarrinho(produto) {
  if (!produto) return showAlert("Produto inválido.");

  let cart = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (!cart.find(p => p.nome === produto.nome)) {
    cart.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(cart));

    // Salva a mensagem antes do reload
    localStorage.setItem("alertMessage", `${produto.nome} adicionado ao carrinho 🛒`);

    // Atualiza a página imediatamente
    window.location.reload();
  } else {
    showAlert(`${produto.nome} já está no carrinho!`);
  }

  if (typeof updateCart === "function") updateCart();
}

// ---------------------------
// Função de alerta customizado
// ---------------------------
function showAlert(mensagem) {
  const container = document.getElementById("customAlertContainer");
  if (!container) return;

  const alerta = document.createElement("div");
  alerta.classList.add("custom-alert");
  alerta.textContent = mensagem;
  container.appendChild(alerta);

  // Mostrar alerta com animação
  setTimeout(() => alerta.classList.add("show"), 100);

  // Remover alerta depois de 3 segundos
  setTimeout(() => {
    alerta.classList.remove("show");
    setTimeout(() => container.removeChild(alerta), 500);
  }, 3000);
}
