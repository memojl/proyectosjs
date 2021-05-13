<?php 
if($_SERVER["REQUEST_METHOD"] == "POST"){//print_r($_POST);
    $data=$_POST;
    foreach($data as $campo=>$dato){
        echo $campo.'='.$dato.'<br>';
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post">
        <div><input type="text" name="nombre" id="nombre"></div>
        <div><input type="email" name="email" id="email"></div>
        <div><button type="submit">Enviar</button></div>

    </form>
</body>
</html>