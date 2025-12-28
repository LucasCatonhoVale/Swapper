// Seleciona o formulário e os campos
const formulario = document.querySelector("#produtoForm");
const inome = document.querySelector(".nome");
const idescricao = document.querySelector(".descricao");
const ipreco = document.querySelector(".preco");
const icategoria = document.querySelector(".categoria");
const itipoVenda = document.querySelector('input[name="tipo"][value="venda"]');
const itipoTroca = document.querySelector('input[name="tipo"][value="troca"]');
const iimagem = document.querySelector("#imagem");
const cadastroCompleto = document.getElementById("cadastroCompleto");

// Container para alertas customizados
const alertContainer = document.createElement("div");
alertContainer.id = "customAlertContainer";
document.body.appendChild(alertContainer);

// Função para criar alerta customizado
function showCustomAlert(message, type = "success") {
    const alert = document.createElement("div");
    alert.classList.add("custom-alert");
    alert.textContent = message;
    alert.style.backgroundColor = type === "success" ? "#4BB543" : "#FF4C4C";
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add("show");
    }, 100); // animação

    setTimeout(() => {
        alert.classList.remove("show");
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Função para converter imagem em Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function cadastra() {
    // Validação
    if (!inome.value || !idescricao.value || !ipreco.value || !icategoria.value) {
        showCustomAlert("Todos os campos são obrigatórios!", "error");
        return;
    }

    let tipos = [];
    if (itipoVenda.checked) tipos.push("venda");
    if (itipoTroca.checked) tipos.push("troca");
    if (tipos.length === 0) {
        showCustomAlert("Selecione pelo menos um tipo: venda ou troca", "error");
        return;
    }

    let imagemBase64 = "";
    if (iimagem.files.length > 0) {
        try {
            imagemBase64 = await getBase64(iimagem.files[0]);
        } catch (err) {
            showCustomAlert("Erro ao processar a imagem", "error");
            return;
        }
    }

    const produto = {
        nome: inome.value,
        descricao: idescricao.value,
        preco: parseFloat(ipreco.value),
        categoria: icategoria.value,
        tipo: tipos.join(","),
        imagem: imagemBase64
    };

    fetch("http://localhost:8080/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar produto!");
        return res.json();
    })
    .then(data => {
        formulario.reset();
        preview.classList.remove("show");
        showCustomAlert(`Produto "${inome.value}" cadastrado com sucesso!`, "success");
    })
    .catch(err => {
        console.error(err);
        showCustomAlert("Erro ao cadastrar produto!", "error");
    });
}

// Envio do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    cadastra();
});

// Preview da imagem
const imageInput = document.getElementById('imagem');
const imageUploadDiv = document.getElementById('imageUpload');
const preview = document.getElementById('preview');

imageUploadDiv.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            preview.src = reader.result;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
});
