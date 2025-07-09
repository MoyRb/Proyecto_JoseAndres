<?php
include '../../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id_producto = $data['id_producto'];
$nombre = $data['nombre'];
$descripcion = $data['descripcion'];
$cantidad = $data['cantidad'];
$precio = $data['precio'];

$sql = "UPDATE productos SET
            nombre='$nombre',
            descripcion='$descripcion',
            cantidad=$cantidad,
            precio=$precio
        WHERE id_producto=$id_producto";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>