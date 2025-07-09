<?php
$host = "localhost";
$user = "root";        // Cambia si tu servidor usa otro usuario
$password = "marlen17";        // Contraseña de MySQL (por defecto vacía en XAMPP)
$dbname = "gestion_empresa";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>