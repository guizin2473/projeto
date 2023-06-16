var btn = document.querySelector("#send");

btn.addEventListener("click",(event) => {

    event.preventDefault();
        
    var testeEmail = document.getElementById("email").value;
    var testeSenha = document.getElementById("pass").value;

    // Teste das entradas de dados do formulário
    
    if(((testeEmail === " ") || (testeSenha.length <8)  || (testeSenha === " ")|| !(EmailValidacao(testeEmail)))){
        alert("Preencha os campos corretamente");
    }else{
      // teste de requisições e envio de dados para php 
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          console.log("Acessando dados");
        }
      };
      var formData = new FormData();
      formData.append("email",testeEmail);
      formData.append("pass",testeSenha);
      
      xhr.open("POST", "dados_login.php", true);
      xhr.send(formData);
      alert("Acessando dados");



      
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