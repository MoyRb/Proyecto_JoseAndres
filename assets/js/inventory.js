document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function loadProducts() {
    fetch("php/productos/read.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#inventoryTable tbody");
            tbody.innerHTML = "";

            data.forEach(producto => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${parseFloat(producto.precio).toFixed(2)}</td>
                    <td>
                        <button onclick='editProduct(${JSON.stringify(producto)})'>Editar</button>
                        <button onclick='deleteProduct(${producto.id_producto})'>Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function addProduct(event) {
    event.preventDefault();

    const product = {
        nombre: document.getElementById("productName").value,
        descripcion: document.getElementById("productDescription").value,
        cantidad: parseInt(document.getElementById("quantity").value),
        precio: parseFloat(document.getElementById("price").value)
    };

    fetch("php/productos/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
        loadProducts();
        document.getElementById("productForm").reset();
    });
}

function editProduct(producto) {
    const nuevoNombre = prompt("Nombre:", producto.nombre);
    const nuevaDescripcion = prompt("Descripción:", producto.descripcion);
    const nuevaCantidad = prompt("Cantidad:", producto.cantidad);
    const nuevoPrecio = prompt("Precio:", producto.precio);

    if (nuevoNombre && nuevaCantidad && nuevoPrecio) {
        fetch("php/productos/update.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_producto: producto.id_producto,
                nombre: nuevoNombre,
                descripcion: nuevaDescripcion,
                cantidad: parseInt(nuevaCantidad),
                precio: parseFloat(nuevoPrecio)
            })
        }).then(() => loadProducts());
    }
}

function deleteProduct(id_producto) {
    if (confirm("¿Estás seguro?")) {
        fetch("php/productos/delete.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_producto })
        }).then(() => loadProducts());
    }
}