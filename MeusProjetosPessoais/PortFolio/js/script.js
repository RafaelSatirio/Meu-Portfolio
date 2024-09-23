document.addEventListener("DOMContentLoaded", function () {
    // Captura todos os links que começam com #
    var linksSuaves = document.querySelectorAll('a[href^="#"]');
  
    // Adiciona um ouvinte de evento de clique a cada link
    linksSuaves.forEach(function (link) {
        link.addEventListener("click", function (event) {
            // Previne o comportamento padrão do clique
            event.preventDefault();
  
            // Obtém o destino do link
            var targetId = this.getAttribute("href").substring(1);
  
            // Obtém o elemento de destino
            var targetElement = document.getElementById(targetId);
  
            // Rola suavemente até o elemento de destino
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

// Adicione isso no seu arquivo script.js
document.addEventListener("DOMContentLoaded", function () {
    // Obtenha todas as barras de progresso
    var progressBars = document.querySelectorAll('.progress-bar-inner');

    // Para cada barra de progresso, adicione a classe 'active'
    progressBars.forEach(function (progressBar) {
        progressBar.parentElement.addEventListener('mouseover', function () {
            progressBar.classList.add('active');
        });
        progressBar.parentElement.addEventListener('mouseout', function () {
            progressBar.classList.remove('active');
        });
    });
});

// Botão de rolar para cima
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Quando a página é rolada, verifica a posição para mostrar ou ocultar o botão
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// Quando o botão é clicado, rola suavemente para o topo
scrollToTopBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

 // Função para enviar e-mail
 function sendEmail() {
    var name = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('mensagem').value;

    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    // Substitua essas chaves pelos valores fornecidos pelo Email.js
    emailjs.init("cXjdFwYdSBazrrS7q");

    emailjs.send("service_a69o84q", "template_sblgj1u", {
        to_name: nome,
        from_email: email,
        message_html: mensagem
    })
    .then(function(response) {
        console.log("E-mail enviado com sucesso!", response);
        alert("E-mail enviado com sucesso!");
        document.getElementById("email-form").reset();
    }, function(error) {
        console.log("Erro ao enviar e-mail:", error);
        alert("Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.");
    });
}
