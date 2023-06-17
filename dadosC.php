<?php
    // variaveis de conxeão
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "banco_teste";

    // conexão 
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Pegando input do js
    $pegadaTotal = $_POST["pegadaTotal"];

    $sql = "INSERT INTO pegadaC (pegada_carbono) VALUES ('$pegadaTotal')";

    // Teste de conexão do banco de dados
    if($conn -> connect_error){
        echo("ERRO".$conn->connect_error);
    }else{
        echo("Conexão com o banco de dados efetuada");
    }
    if($conn ->query($sql) === TRUE){
        echo("Conexão com o banco efetuada e dados cadastrados");
    }else{
        echo("Erro");
    }
    
    $conn ->close();
?>