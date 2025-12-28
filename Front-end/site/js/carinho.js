// ---------------------------
// Carrinho Persistente Universal
// ---------------------------

// Recupera o carrinho do localStorage ou cria um vazio
let cart = JSON.parse(localStorage.getItem("carrinho")) || [];

// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  const carrinhoIcon = document.getElementById("MenuCarrinho");
  const cartBox = document.getElementById("cartBox");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const clearBtn = document.getElementById("clearBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!carrinhoIcon || !cartBox || !cartItems || !cartTotal) return;

  // Mostrar/ocultar carrinho ao clicar no ícone
  carrinhoIcon.addEventListener("click", () => {
    cartBox.classList.toggle("hidden");
  });

  // Limpar carrinho
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart = [];
      localStorage.setItem("carrinho", JSON.stringify(cart));
      updateCart();
      showAlert("Carrinho limpo!");
    });
  }

  // Finalizar compra
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return alert("Carrinho vazio!");
      showAlert(`Compra finalizada! Total: R$ ${cartTotal.textContent}`);
      cart = [];
      localStorage.setItem("carrinho", JSON.stringify(cart));
      updateCart();
    });
  }

  // Atualiza o carrinho ao carregar
  updateCart();
});

// ---------------------------
// Adiciona produto ao carrinho
// ---------------------------
function adicionarAoCarrinho(produto) {
  if (!produto) return alert("Erro: produto inválido.");

  if (!cart.find((p) => p.id_prod === produto.id_prod)) {
    cart.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(cart));
    alert(`${produto.nome} adicionado ao carrinho!`);
  } else {
    alert(`${produto.nome} já está no carrinho!`);
  }

  updateCart();
}

// ---------------------------
// Atualiza carrinho
// ---------------------------
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cartItem");
    itemDiv.innerHTML = `
      <span>${item.nome} - R$ ${item.preco}</span>
      <button class="removeBtn">Remover</button>
    `;
    itemDiv.querySelector(".removeBtn").addEventListener("click", () => removeFromCart(index));
    cartItems.appendChild(itemDiv);

    const precoNum = parseFloat(item.preco.toString().replace(",", "."));
    if (!isNaN(precoNum)) total += precoNum;
  });

  cartTotal.textContent = total.toFixed(2);
}



function showAlert(mensagem) {
  const container = document.getElementById("customAlertContainer");
  if (!container) return;

  const alerta = document.createElement("div");
  alerta.classList.add("custom-alert");
  alerta.textContent = mensagem;
  container.appendChild(alerta);

  // Mostrar alerta
  setTimeout(() => alerta.classList.add("show"), 100);

  // Remover alerta depois de 3 segundos
  setTimeout(() => {
    alerta.classList.remove("show");
    setTimeout(() => container.removeChild(alerta), 500);
  }, 3000);
}


// ---------------------------
// Remove item do carrinho
// ---------------------------
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(cart));
  updateCart();
}
