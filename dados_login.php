
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

            $conn = mysqli_connect($servername, $username, $password, $dbname);

            if(!$conn){
                echo("Falha na conexão com o banco de dados: " . mysqli_connect_error());
            }
            $email = $_POST['email'];
            $senha = $_POST['pass'];
                
            $senha_HASH = hash('md5', $senha);
                    
            $sql = "SELECT * FROM cadastro WHERE email = '$email' and senha = '$senha_HASH' ";
        
            $resultado = mysqli_query($conn, $sql);
        
            if (mysqli_num_rows($resultado) ==1) {
                echo 'Email já existe no banco de dados e senha correta <br>ACESSO<br>';
                header('Location:calculopag.html');
            } else {
                echo 'Email não encontrado ou senha inválida';
            }
            mysqli_close($conn);    

        }    
    ?>
