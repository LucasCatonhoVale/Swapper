// ---------------------------
// Carrega produtos do backend
// ---------------------------
async function carregarProdutos() {
  try {
    const response = await fetch("http://localhost:8080/produtos");
    if (!response.ok) throw new Error("Erro ao buscar produtos do servidor");

    const produtos = await response.json();
    renderProducts(produtos);

    // Salva lista completa para poder buscar na página de detalhes
    localStorage.setItem("produtosLista", JSON.stringify(produtos));
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    const container = document.getElementById("products");
    if (container) {
      container.innerHTML = `<p class="erro">Erro ao carregar produtos. Verifique o servidor.</p>`;
    }
  }
}

// ---------------------------
// Renderiza produtos na página inicial
// ---------------------------
function renderProducts(produtos) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  produtos.forEach((p) => {
    const li = document.createElement("li");
    li.className = "prod-card";

    li.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p class="preco ">R$:${p.preco},00</p>
      <div class="botoes-prod">
        <button class="btn-detalhes">Ver detalhes</button>
      </div>
    `;

    // Salva o nome do produto no localStorage ao clicar
    li.querySelector(".btn-detalhes").addEventListener("click", () => {
      localStorage.setItem("selectedProductName", p.nome);
      window.location.href = "./detalhe.html";
    });

    container.appendChild(li);
  });
}

// ---------------------------
// Inicializa
// ---------------------------
document.addEventListener("DOMContentLoaded", carregarProdutos);
