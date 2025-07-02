// Simulación de base de datos local
let productionOrders = [];

// Función para renderizar la tabla de órdenes
function renderProductionTable() {
    const tableBody = document.querySelector('#productionTable tbody');
    tableBody.innerHTML = '';

    productionOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td>
                <button onclick="editOrder(${index})">Editar</button>
                <button onclick="deleteOrder(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Manejador de formulario
document.getElementById('productionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const product = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const date = document.getElementById('startDate').value;
    const status = document.getElementById('status').value;

    if (product && quantity > 0 && date && status) {
        productionOrders.push({ product, quantity, date, status });
        renderProductionTable();
        this.reset(); // Limpiar formulario
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
});

// Función para editar orden
function editOrder(index) {
    const order = productionOrders[index];
    const newProduct = prompt("Nombre del producto:", order.product);
    const newQuantity = prompt("Cantidad:", order.quantity);
    const newDate = prompt("Fecha de inicio:", order.date);
    const newStatus = prompt("Estado (Pendiente, En Proceso, Completado):", order.status);

    if (newProduct && newQuantity && newDate && newStatus) {
        productionOrders[index] = {
            product: newProduct,
            quantity: parseInt(newQuantity),
            date: newDate,
            status: newStatus
        };
        renderProductionTable();
    }
}

// Función para eliminar orden
function deleteOrder(index) {
    if (confirm("¿Estás seguro de querer eliminar esta orden?")) {
        productionOrders.splice(index, 1);
        renderProductionTable();
    }
}

// Renderizar al cargar
renderProductionTable();