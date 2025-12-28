function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function search() {
  const input = document.getElementById("searchInput").value;
  const normalizedInput = normalizeText(input);
  const products = document.querySelectorAll(".prod-card");
  const noResults = document.getElementById("noResults");
  const productsContainer = document.getElementById("products");
  let found = false;
  let firstMatch = null;

  // Se o campo estiver vazio, mostra todos os produtos
  if (normalizedInput.trim() === "") {
    productsContainer.style.display = "grid";
    productsContainer.style.justifyContent = "center";
    productsContainer.style.alignItems = "start";

    products.forEach(prod => (prod.style.display = "block"));
    noResults.style.display = "none";
    window.scrollTo({ top: productsContainer.offsetTop, behavior: "smooth" });
    return;
  }

  // Oculta todos os produtos e exibe apenas os pesquisados
  products.forEach(prod => {
    const name = prod.querySelector("h3").textContent;
    const normalizedName = normalizeText(name);

    if (normalizedName.includes(normalizedInput)) {
      prod.style.display = "block";
      if (!firstMatch) firstMatch = prod; // salva o primeiro produto encontrado
      found = true;
    } else {
      prod.style.display = "none";
    }
  });

  if (found) {
    // Centraliza o resultado
    productsContainer.style.display = "flex";
    productsContainer.style.flexWrap = "wrap";
    productsContainer.style.justifyContent = "center";
    productsContainer.style.alignItems = "center";
    noResults.style.display = "none";

    // Rola suavemente até o primeiro produto encontrado
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    productsContainer.style.display = "grid";
    noResults.style.display = "block";
  }
}

// Permite buscar pressionando Enter
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    search();
  }
});



//Carrosel
let count=1;
document.getElementById("radio1").checked=true;
setInterval(function(){
  nextImagem();
},2000)

function nextImagem(){
  count++;
  if(count>4){
    count=1;
  }
  document.getElementById("radio"+count).checked= true;
}

//Carrosel Categoria
const carousel = document.querySelector(".carousel");
const arrowBtns=document.querySelectorAll(".categorias i")
const firstCardWidth=carousel.querySelector(".card").offsetWidth;
const carouselChildreens =[...carousel.children];


let isDragging=false, startX, startScrollLeft;
let cardPerView = Math.round(carousel.offsetWidth/firstCardWidth);



arrowBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
      carousel.scrollLeft += btn.id==="left"? - firstCardWidth:firstCardWidth;
    });
});

const draStart=(e)=>{
  isDragging=true;
  carousel.classList.add("dragging");
  startX=e.pageX;
  startScrollLeft = carousel.scrollLeft;
}
const dragging=(e)=>{
  if(!isDragging) return;
  carousel.scrollLeft=startScrollLeft-(e.pageX - startX);
}
const dragStop=()=>{
    isDragging=false;
    carousel.classList.remove("dragging");
}
carousel.addEventListener("mousedown",draStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);


// Função para direcionar para o WhatsApp
function enviarMensagem() {
  var numeroTelefone = "5511952076430";
  var mensagem = "Olá,Estou com problemas preciso de ajuda"; // Mensagem pré-definida
  var url = "https://wa.me/" + numeroTelefone + "?text=" + encodeURIComponent(mensagem);
  window.open(url, '_blank');
}

