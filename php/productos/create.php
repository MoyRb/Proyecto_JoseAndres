<?php
include '../../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'];
$descripcion = $data['descripcion'];
$cantidad = $data['cantidad'];
$precio = $data['precio'];

$sql = "INSERT INTO productos (nombre, descripcion, cantidad, precio)
        VALUES ('$nombre', '$descripcion', $cantidad, $precio)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>