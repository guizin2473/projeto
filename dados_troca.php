<?php

    // variaveis de conxeão
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "banco_teste";

 
    // conexão 
    $conn = new mysqli($servername, $username, $password, $dbname);
            
    if(!$conn){
        echo("Falha na conexão com o banco de dados: " . mysqli_connect_error());
    }

    $email = $_POST["email"];
    $senha = $_POST["pass"];
//lRxCLb%aj4ZCjOr&lLRD
    // Código SQL
    $sql = "SELECT * FROM cadastro WHERE email = '$email'";

    $resultado = mysqli_query($conn, $sql); 

    if(mysqli_num_rows($resultado) == 1){
        echo 'Email já cadastrado';
        $senhaHASH = hash('md5',$senha);
        $sql = "UPDATE cadastro SET senha = '$senhaHASH'WHERE email = '$email'";
        if (mysqli_query($conn, $sql)) {
            echo "Senha atualizada com sucesso.";
        } else {
            echo "Erro ao atualizar a senha: " . mysqli_error($conn);
        }    
    }else{
        echo 'Email não existe';
    }

    mysqli_close($conn);        

?>