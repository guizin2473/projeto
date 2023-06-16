

            <?php
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                ini_set('display_errors', 1);
                ini_set('display_startup_errors', 1);
                error_reporting(E_ALL);
                
                // variaveis de conxeão
                $servername = "localhost";
                $username = "root";
                $password = "";
                $dbname = "banco_teste";
            
                $nome = $_POST["nome"];
                $email = $_POST["email"];
                $senha = $_POST["pass"];
                $cell = $_POST['telefone'];
                // conexão 
                $conn = mysqli_connect($servername, $username, $password, $dbname);
            
            
            
                if(!$conn){
                    echo("Falha na conexão com o banco de dados: " . mysqli_connect_error());
                }
                
                // Consulta SQL
                $sql = "SELECT * FROM cadastro WHERE email = '$email'";
                
                $resultado = mysqli_query($conn, $sql); 
            
                if(mysqli_num_rows($resultado) == 1) {
                    echo "\n\nEmail já cadastrado no banco de dados";
                }else{
                    echo "\n\nEmail não existe no banco de dados \n\nCadastrando dados";
                
                    // Senha criptografada 
                    $senhaHASH = hash('md5',$senha);
                    $sql = "INSERT INTO cadastro (nome,senha,email,telefone) VALUES ('$nome','$senhaHASH','$email','$cell')";
                    if(mysqli_query($conn,$sql)){
                        echo("\n\n Dados cadastrados com sucesso");
                    }//
                }
            
                mysqli_close($conn);     
            }
            ?>

 