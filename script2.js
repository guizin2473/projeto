/*
Parâmetros do Cálculo 
Eletrecidade => Cerca de:0,055 Kg C02 X gasto_de_luz
Alimentação =>  Aprodução de 1 kg de carne bovina emite em média cerca de 27 kg de CO2,supondo 200g de carne = 16,2 kg C02
Botijão de gás => Cerca de 60 a 80kg de C02 (media: 70Kg/CO2)  1.35 por KM (em média faz 5.5 km) *4(semanas)..
O carro consome em média 8 litros de gasolina por cada 100 km rodados, o que resulta em um consumo de 80 litros de gasolina por mês. Sabemos que a queima de 1 litro de gasolina emite cerca de 2,35 kg de CO2. Então, a emissão de CO2 associada ao uso do carro é:80 litros/mês x 2,35 kg CO2/litro = 184 kg CO2/mês  1.35 por KM (em média faz 5.5 km) *4(semanas)...
De acordo com estimativas do Instituto de Energia e Meio Ambiente (IEMA), uma moto com motor de 125 cc (modelo popular) que utiliza gasolina comum pode emitir em média cerca de 72 g de CO2 por quilômetro rodado. 
---> para 125 cc: 0,072 * KM (em media 350 ) * 4 semanas 
*/

// Função criando inputs 
function criarInput(type, id, name, placeholder, required) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;
    input.required = required;
    return input;
  }

  // Retorno da função para cada input 
const input = criarInput('number', 'numero', 'numero', 'R$:', true);
const input2 = criarInput('number', 'numero2', 'numero2', 'Digite a quantidade: ', true);
const input3 = criarInput('number', 'numero3', 'numero3', 'Botijões por mês:  ', true);

// adiciona o input ao elemento  formulario
document.querySelector('.campo1').appendChild(input);
document.querySelector('.campo2').appendChild(input2);
document.querySelector('.campo3').appendChild(input3);
var botao = document.getElementById("botao");

// variavel que pega valor da classe escolhido (select)
var selectElement = document.querySelector(".escolhido");

botao.addEventListener("click",(event)=>{
    event.preventDefault();

    //String para number  
    var selectedValue = selectElement.value;
    var selectedValueN = Number(selectedValue);
    //Teste dos inputs 
    if((input.value == ' ') || (input2.value == '') || (input.value <= 0 ) || (input2.value <=0)){
        alert("Preencha o formulário");        
    }
    else{
        //String para number 
        const num1 = Number(input.value);
        const num2 = Number(input2.value);
        const num3 = Number(input3.value);
        

        if(selectedValueN === 1){
            var xvezes = parseFloat(prompt("Quantas vezes usa ônibus por semana ? ")); //replace(',','.')
            while(isNaN(xvezes) || xvezes % 1 !== 0 || xvezes < 1){
                xvezes = parseInt(prompt("Valor inválido! Digite quantas vezes usa o ônibus por semana (apenas números inteiros maiores que zero):"));
            }
            const pegadaTotal  = (1.35*5.5*xvezes*4) +  (0.055*num1) + (27*num2*4) + (num3*70);
            var resultado = document.getElementById("resultado");
            
            // atualiza o conteúdo do elemento de resultado
            resultado.innerHTML ="Pegada de carbono: "+pegadaTotal.toFixed(2)+" KgC no mês";
            // mostra o elemento de resultado
            resultado.style.display = "block";

            //Envio para o php
            const formData = new FormData();
            formData.append('pegadaTotal',pegadaTotal);

            fetch('dadosC.php',{
                method:'POST',body:formData
            })
            .then(response =>{
                console.log("Teste resposta servidor: ",response);
                alert("Dados enviados");
            })
            .catch(error =>{
                alert("Erro de envio",error);
            });

            if(xvezes < 7){
                exibir_modal_B_menor7();
                exibir_solucao4();
            }else{
                if(xvezes >=7){
                    exibir_modal_B_maior7();
                    exibir_solucao4()                       
                }
            }
            if(num2 >= 5){
                exibirS_num2_maior_5();
                exibir_solucao4()
            }else{
                if(num2 < 5){
                    //  Return função
                    exibirS_num2_memnor_5();
                    exibir_solucao4()
                }
            }
            if(num1 >= 300){
                //  Return função
                exibirS_num1_maior_300();
                exibir_solucao4()
            }else{
                if(num1 <300){
                    // Return função
                    exibirS_num1_menor_300();
                    exibir_solucao4()
                }
            }  
        }
            
        if(selectedValueN === 2){
            var xvezesC = parseFloat(prompt("Quantas vezes usa carro por semana ? ")); //replace(',','.')
            while(isNaN(xvezesC) || xvezesC % 1 !== 0 || xvezesC < 1){
                xvezesC = parseInt(prompt("Valor inválido! Digite quantas vezes usa o carro por semana "));
            }
            const pegadaTotal2 = (184*xvezesC) +  (0.055*num1) + (27*num2*4)  + (num3*70) ;
            var resultado = document.getElementById("resultado");
            resultado.innerHTML ="Pegada de carbono: "+pegadaTotal2.toFixed(2)+" KgC no mês";
            resultado.style.display = "block";
                    
            //Envio para o php
            const formData = new FormData();
            formData.append('pegadaTotal',pegadaTotal2);

            fetch('dadosC.php',{
                method:'POST',body:formData
            })
            .then(response =>{
                console.log("Teste resposta servidor: ",response);
                alert("Dados enviados");
            })
            .catch(error =>{
                console.log("Erro de envio",error);
            });

            if(xvezesC >=7){
                exibir_modal_C_maior7();
                exibir_solucao4()
            }else{
                if(xvezesC <7){
                    exibir_modal_C_menor7();
                    exibir_solucao4()
                }
            }
            if(num2 >= 5){
                exibirS_num2_maior_5();
                exibir_solucao4()
            }else{
                if(num2 < 5){
                    //  Return função
                    exibirS_num2_memnor_5();
                    exibir_solucao4()
                }
            }
            if(num1 >= 300){
                //  Return função
                exibirS_num1_maior_300();
                exibir_solucao4()
            }else{
                if(num1 <300){
                    // Return função
                    exibirS_num1_menor_300();
                    exibir_solucao4()
                }
            }  
        }
            
        if(selectedValueN === 3){
            var xvezesM = parseFloat(prompt("Quantas vezes usa moto por semana ? ")); //replace(',','.')
            while(isNaN(xvezesM) || xvezesM % 1 !== 0 || xvezesM < 1){
                xvezesM = parseInt(prompt("Valor inválido! Digite quantas vezes usa o moto por semana "));
            }
            const pegadaTotal3 = (0.072*350*4*xvezesM) +(0.055*num1) + (27*num2*4)  + (num3*70);
            var resultado = document.getElementById("resultado");
            
            // atualiza o conteúdo do elemento de resultado
            resultado.innerHTML ="Pegada de carbono: "+pegadaTotal3.toFixed(2)+" KgC no mês";
            // mostra o elemento de resultado
            resultado.style.display = "block";
                        
            //Envio para o php
            const formData = new FormData();
            formData.append('pegadaTotal',pegadaTotal3);

            fetch('dadosC.php',{
                method:'POST',body:formData
            })
            .then(response =>{
                console.log("Teste resposta servidor: ",response);
                alert("Dados enviados");
            })
            .catch(error =>{
                console.log("Erro de envio",error);
            });

            if(xvezesM >=7){
                exibir_modal_M_maior7();
                exibir_solucao4()
            }else{
                if(xvezesM <7){
                    exibir_modal_M_menor7();
                    exibir_solucao4()
                }
            }
            if(num2 >= 5){
                exibirS_num2_maior_5();
                exibir_solucao4()
            }else{
                if(num2 < 5){
                    //  Return função
                    exibirS_num2_memnor_5();
                    exibir_solucao4()
                }
            }
            if(num1 >= 300){
                //  Return função
                exibirS_num1_maior_300();
                exibir_solucao4()
            }else{
                if(num1 <300){
                    // Return função
                    exibirS_num1_menor_300();
                    exibir_solucao4()
                }
            }
        }
        if(selectedValueN === 4){
            var solucoes3 = document.getElementById("solucoes3");
            var bloco3 = document.querySelector(".bloco3");
            solucoes3.innerHTML= "Aqueles que preferem utilizar o transporte público,bicicletas ou caminhadas ao invés do transporte privado merecem elogios por sua conscientização e comprometimento com o meio ambiente e com a sociedade em geral. Optar pelo transporte público é uma escolha que demonstra preocupação com a preservação do meio ambiente e com a redução da poluição do ar, uma vez que reduz significativamente a emissão de gases poluentes.";
            solucoes3.style.display = "block";
            bloco3.style.display = "flex";    
            
            //Considerando a pé,bike e etc.....
            const pegadaOutros = (0.055*num1) + (27*num2*4)  + (num3*70);
            var resultado = document.getElementById("resultado");
            
            // atualiza o conteúdo do elemento de resultado
            resultado.innerHTML ="Pegada de carbono: "+pegadaOutros.toFixed(2)+" KgC no mês";
            // mostra o elemento de resultado
            resultado.style.display = "block";     
                        
            //Envio para o php
            const formData = new FormData();
            formData.append('pegadaTotal',pegadaOutros);

            fetch('dadosC.php',{
                method:'POST',body:formData
            })
            .then(response =>{
                console.log("Teste resposta servidor: ",response);
                alert("Dados enviados");
            })
            .catch(error =>{
                console.log("Erro de envio",error);
            });

            if(num2 >= 5){
                exibirS_num2_maior_5();
                exibir_solucao4()
            }else{
                if(num2 < 5){
                    //  Return função
                    exibirS_num2_memnor_5();
                    exibir_solucao4()
                }
            }
            if(num1 >= 300){
                //  Return função
                exibirS_num1_maior_300();
                exibir_solucao4()
            }else{
                if(num1 <300){
                    // Return função
                    exibirS_num1_menor_300();
                    exibir_solucao4()
                }
            }  
        }
    }
});

function exibirS_num2_maior_5(){
    var solucoes = document.getElementById("solucoes");
    var bloco = document.querySelector(".bloco");

    solucoes.innerHTML = "O alto consumo de carne tem se mostrado um problema ambiental e de saúde pública cada vez mais evidente. A produção de carne exige um grande uso de recursos naturais, como água, terra e energia, além de contribuir significativamente para a emissão de gases de efeito estufa e para o desmatamento de áreas naturais. Além disso, o consumo excessivo de carne pode estar associado a diversos problemas de saúde, como doenças cardiovasculares e câncer."
    solucoes.style.display = "block";
    bloco.style.display = "flex";
    
}
function exibirS_num2_memnor_5(){
    var solucoes = document.getElementById("solucoes");
    var bloco = document.querySelector(".bloco");
    solucoes.innerHTML = "Continue reduzindo o consumo de carne e laticíneos, já que a produção de carne e laticíneos é responsável por cerca de 14,5% das emissões globais de gases de efeito estufa.";
    solucoes.style.display = "block";
    bloco.style.display = "flex";

}
function exibirS_num1_maior_300(){
    var bloco2 = document.querySelector(".bloco2");
    var solucoes2 = document.getElementById("solucoes2");
    solucoes2.innerHTML = "Reduza o consumo de energia elétrica,usando fontes renováveis de energia e evitando o desperdício de energia. A porcentagem de emissões correspondente dependerá da fonte de eletricidade utilizada, mas em geral a geração de eletricidade é responsável por cerca de 31% das emissões globais de gases de efeito estufa."
    solucoes2.style.display = "block";
    
    bloco2.style.display = "flex";
}

function exibirS_num1_menor_300(){
    var bloco2 = document.querySelector(".bloco2");
    var solucoes2 = document.getElementById("solucoes2");
    solucoes2.innerHTML = "Continue reduzindo o consumo de energia elétrica,usando fontes renováveis de energia e evitando o desperdício de energia. A porcentagem de emissões correspondente dependerá da fonte de eletricidade utilizada, mas em geral a geração de eletricidade é responsável por cerca de 31% das emissões globais de gases de efeito estufa."
    solucoes2.style.display = "block";
    bloco2.style.display = "flex";
}

function exibir_modal_B_menor7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "O uso de transporte público para curtas distâncias traz benefícios ambientais significativos, pois é uma alternativa mais sustentável e eficiente do que o uso de veículos particulares. Ao optar pelo transporte público em trajetos curtos, as pessoas contribuem para a redução da emissão de gases de efeito estufa e para a melhoria da qualidade do ar nas cidades. Além disso, o transporte público para curtas distâncias pode reduzir a necessidade de construção de mais vias e estacionamentos, o que ajuda a preservar áreas verdes e reduzir a expansão urbana. ";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex";
}

function exibir_modal_B_maior7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "Continue optando pelo uso de transporte público,pois traz benefícios ambientais significativos, pois é uma alternativa mais sustentável e eficiente do que o uso de veículos particulares. Ao optar pelo transporte público em trajetos curtos, as pessoas contribuem para a redução da emissão de gases de efeito estufa e para a melhoria da qualidade do ar nas cidades. Além disso, o transporte público para curtas distâncias pode reduzir a necessidade de construção de mais vias e estacionamentos, o que ajuda a preservar áreas verdes e reduzir a expansão urbana. ";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex";   
}
function exibir_modal_C_maior7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "Reduza o uso de transporte privado,recorrendo ao transporte púlbico  para curtas distâncias,pois  traz benefícios ambientais significativos para a redução da emissão de gases de efeito estufa e para a melhoria da qualidade do ar nas cidades Outra vantagem é a economia financeira, já que o transporte público costuma ser mais acessível do que o uso de veículos particulares em termos de manutenção, combustível e estacionamento.   ";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex";  
}
function exibir_modal_C_menor7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "Continue utilizando o transporte público ao invés do transporte privado merecem elogios por sua conscientização e comprometimento com o meio ambiente e com a sociedade em geral. Optar pelo transporte público é uma escolha que demonstra preocupação com a preservação do meio ambiente e com a redução da poluição do ar, uma vez que reduz significativamente a emissão de gases poluentes.";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex";  
}

function exibir_modal_M_maior7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "Reduza o uso de veículo privados,busque por transporte público para curtas distâncias,pois as motos  emissões de CO2 das motos são proporcionais ao consumo de combustível, o que significa que quanto mais uma moto consome combustível, mais CO2 ela emite.";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex";  
}
function exibir_modal_M_menor7(){
    var solucoes3 = document.getElementById("solucoes3");
    var bloco3 = document.querySelector(".bloco3");
    solucoes3.innerHTML= "Continue reduzindo o uso de veículos privados,especialmente para curta distâncias.Além do aspecto ambiental estra a economia financeira, já que o transporte público costuma ser mais acessível do que o uso de veículos particulares em termos de manutenção, combustível e estacionamento";
    solucoes3.style.display = "block";
    bloco3.style.display = "flex"; 
}

function exibir_solucao4(){
    var solucoes4 = document.getElementById("solucoes4");
    var bloco4 = document.querySelector(".bloco4");
    solucoes4.innerHTML = "Plantar árvores diminui a pegada de carbono e contribui para um ambiente mais saudável. As árvores atuam como sumidouros de carbono, absorvendo dióxido de carbono da atmosfera, reduzindo assim as mudanças climáticas. Além disso, liberam oxigênio, melhorando a qualidade do ar. Plantar uma árvore é um gesto que conta, promovendo a sustentabilidade e deixando um legado positivo para o futuro.";
    solucoes4.style.display = "block";
    bloco4.style.display = "flex";
}

var blocosobre = document.getElementById("blocosobre");
var bloco_texto = document.getElementById("bloco_texto");
document.getElementById("img1").addEventListener("click",function(){
    blocosobre.style.display = "block";
    bloco_texto.style.display = "block";
});

document.addEventListener("click",function(event){
    if(blocosobre.contains(event.target)){
        blocosobre.style.display = "none";
    }
});

var blocosobre2 = document.getElementById("blocosobre2");
var bloco_texto2 = document.getElementById("bloco_texto2");
document.getElementById("img2").addEventListener("click",function(){
    blocosobre2.style.display = "block";
    bloco_texto2.style.display = "block";
});
document.addEventListener("click",function(event){
    if(blocosobre2.contains(event.target)){
        blocosobre2.style.display = "none";
    }
});


var blocosobre3 = document.getElementById("blocosobre3");
var bloco_texto3 = document.getElementById("bloco_texto3");

document.getElementById("img3").addEventListener("click",function(){
    blocosobre3.style.display = "block";
    bloco_texto3.style.display = "block";
});
document.addEventListener("click",function(event){
    if(blocosobre3.contains(event.target)){
        blocosobre3.style.display = "none";
    }
});

var blocosobre4 = document.getElementById("blocosobre4");
var bloco_texto4 = document.getElementById("bloco_texto4");
document.getElementById("img4").addEventListener("click",function(){
    blocosobre4.style.display = "block";
    bloco_texto4.style.display = "block";
});
document.addEventListener("click",function(event){
    if(blocosobre4.contains(event.target)){
        blocosobre4.style.display = "none";
    }
});
