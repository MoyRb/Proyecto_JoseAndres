// Simulación de base de datos
let products = [];

// Función para renderizar la tabla de productos
function renderProductsTable() {
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para agregar un producto
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    if (productName && quantity) {
        products.push({ name: productName, quantity: parseInt(quantity) });
        renderProductsTable();
        document.getElementById('productName').value = '';
        document.getElementById('quantity').value = '';
    }
});

// Función para editar un producto
function editProduct(index) {
    const product = products[index];
    const newName = prompt('Nuevo nombre del producto:', product.name);
    const newQuantity = prompt('Nueva cantidad:', product.quantity);

    if (newName !== null && newQuantity !== null) {
        products[index] = { name: newName, quantity: parseInt(newQuantity) };
        renderProductsTable();
    }
}

// Función para eliminar un producto
function deleteProduct(index) {
    if (confirm('¿Estás seguro de querer eliminar este producto?')) {
        products.splice(index, 1);
        renderProductsTable();
    }
}

// Renderizar la tabla al cargar la página
renderProductsTable();