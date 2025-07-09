// Simulación de base de datos local
let sales = [];

// Función para calcular el total
function calculateTotal(quantity, unitPrice) {
    return (quantity * unitPrice).toFixed(2);
}

// Función para renderizar la tabla de ventas
function renderSalesTable() {
    const tableBody = document.querySelector('#salesTable tbody');
    tableBody.innerHTML = '';

    sales.forEach((sale, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.customer}</td>
            <td>${sale.product}</td>
            <td>${sale.quantity}</td>
            <td>$${parseFloat(sale.unitPrice).toFixed(2)}</td>
            <td>$${calculateTotal(sale.quantity, sale.unitPrice)}</td>
            <td>${sale.date}</td>
            <td>
                <button onclick="editSale(${index})">Editar</button>
                <button onclick="deleteSale(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Manejador de formulario
document.getElementById('saleForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const customer = document.getElementById('customerName').value.trim();
    const product = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const date = document.getElementById('saleDate').value;

    if (customer && product && quantity > 0 && !isNaN(unitPrice) && date) {
        sales.push({ customer, product, quantity, unitPrice, date });
        renderSalesTable();
        this.reset(); // Limpiar formulario
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
});

// Función para editar venta
function editSale(index) {
    const sale = sales[index];
    const newCustomer = prompt("Nombre del cliente:", sale.customer);
    const newProduct = prompt("Producto vendido:", sale.product);
    const newQuantity = prompt("Cantidad vendida:", sale.quantity);
    const newUnitPrice = prompt("Precio unitario:", sale.unitPrice);
    const newDate = prompt("Fecha de venta (YYYY-MM-DD):", sale.date);

    if (newCustomer && newProduct && newQuantity && newUnitPrice && newDate) {
        sales[index] = {
            customer: newCustomer,
            product: newProduct,
            quantity: parseInt(newQuantity),
            unitPrice: parseFloat(newUnitPrice),
            date: newDate
        };
        renderSalesTable();
    }
}

// Función para eliminar venta
function deleteSale(index) {
    if (confirm("¿Estás seguro de querer eliminar esta venta?")) {
        sales.splice(index, 1);
        renderSalesTable();
    }
}

// Renderizar al cargar
renderSalesTable();