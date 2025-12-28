const formulario = document.querySelector("form");
const inome = document.querySelector(".nome");
const iemail=document.querySelector(".email");
const icpf=document.querySelector(".cpf");
const itelefone=document.querySelector(".telefone");
const isenha=document.querySelector(".senha");


// --- Função principal de cadastro ---
function cadastra() {
    if (!inome.value || !iemail.value || !isenha.value || !itelefone.value || !icpf.value) {
        showAlert("Todos os campos são obrigatórios!");
        return;
    }

    const cpfLimpo = icpf.value.replace(/\D/g, "");
    if (!validarCPF(cpfLimpo)) {
        showAlert("❌ CPF inválido! Verifique e tente novamente.");
        icpf.focus();
        return;
    }

     fetch("http://localhost:8080/usuarios", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: inome.value,
            email: iemail.value,
            cpf: icpf.value,
            telefone: itelefone.value,
            senha: isenha.value
        })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => { throw new Error(err.error || JSON.stringify(err)) });
        }
        return res.json();
    })
    .then(data => {
                   
            showAlert("Cadastro Realizado com sucesso");
            window.location.href = "index.html"; // redireciona
    })
    .catch(err => {
        console.error("Erro ao cadastrar usuário!", err);
        cadastroCompleto.textContent = "❌ Erro ao cadastrar usuário: " + err.message;
        cadastroCompleto.style.color = "red";
    });
}

//  Limpa os campos após cadastro 
function limpar() {
    inome.value = "";
    iemail.value = "";
    isenha.value = "";
    itelefone.value = "";
    icpf.value = "";
}

//Envio do formulário 
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        cadastra();
    });
}

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


//  Lógica para mostrar/ocultar senha 
if (toggleSenha) {
    toggleSenha.addEventListener("click", () => {
        if (isenha.type === "password") {
            isenha.type = "text";
           toggleSenha.src = "../img/ocultar.png";
        } else {
            isenha.type = "password";
            toggleSenha.src = "../img/ver.png";
        }
    });
}
//Formatação automática do CPF
icpf.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    e.target.value = valor;
});

//Validação oficial do CPF 
function validarCPF(cpf) {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const nums = cpf.split("").map(Number);
    let soma = 0;

    for (let i = 0; i < 9; i++) soma += nums[i] * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== nums[9]) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += nums[i] * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== nums[10]) return false;

    return true;
}