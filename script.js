// Esperar a pagina carregar toda a mídia
window.addEventListener('load', function() {
    var loading = document.getElementById('loading');
    setTimeout(function() {
      loading.style.display = 'none';
    }, 2000);
  });


var btn = document.querySelector("#send");

btn.addEventListener("click",(event) => {

    event.preventDefault();
    
    
    var testeNome = document.getElementById("nome").value;
    var testeEmail = document.getElementById("email").value;
    var testeCell = document.getElementById("telefone").value;
    var testeSenha = document.getElementById("pass").value;

    // Teste das entradas de dados do formulário
    
    if( (testeNome === " ")   || (testeNome.lenght<3) || (testeCell === " " ) || (testeCell.length < 8 ) || ((testeEmail === " ") || (testeSenha.length <8) || (testeSenha === " ")|| !(EmailValidacao(testeEmail)))){
        alert("Preencha os campos corretamente");
    }else{
      
      // teste de requisições e envio de dados para php 
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          console.log("Dados cadastrados");
        }
      };
      var formData = new FormData();
      formData.append("nome",testeNome);
      formData.append("email",testeEmail);
      formData.append("telefone",testeCell);
      formData.append("pass",testeSenha);
      
      xhr.open("POST", "dados.php", true);
      xhr.send(formData);
      alert("Dados Cadastrados com sucesso");
      window.open('calculopag.html');
    }

});
//Validação de email com regex (define uma padrão de entrada)
function EmailValidacao (email){
    const emailRegex = new RegExp(
        // a até z minúsculo,a a z maiusculo e traços seguidos por @ e .com
        /^[a-zA-z0-9._-]+@[a-zA-z0-9._-]+\.[a-zA-Z]{2,}$/
    );
    if(emailRegex.test(email)){
        return true;
    }
    else{
        return false;
    }
}


// Carrosel

const botaoAnterior = document.querySelector(".anterior");
const botaoProximo = document.querySelector(".proximo");
const carrossel = document.querySelector(".carrossel");

// Manipulanodo posição dos elementos 
let posicaoAtual = 0;
botaoProximo.addEventListener("click", () => {
    if (posicaoAtual < 5) {
      posicaoAtual++;
      carrossel.style.transform = `translateX(-${posicaoAtual * 420}px)`;
    }
});

// Manipulanodo posição dos elementos 
botaoAnterior.addEventListener("click", () => {
  if (posicaoAtual >= 0) {
    posicaoAtual = posicaoAtual-posicaoAtual;
    carrossel.style.transform = `translateX(-${posicaoAtual * 10}px)`;
  }
});



// scroll para cima
function voltar (){
    window.scrollTo({
        top:0,behavior:"smooth" 
    });
}