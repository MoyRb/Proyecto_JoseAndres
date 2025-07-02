// Simulación de datos desde otros módulos
const mockSales = [
    { product: "Producto A", quantity: 10, unitPrice: 20.00, date: "2023-10-01" },
    { product: "Producto B", quantity: 5, unitPrice: 15.00, date: "2023-10-05" },
    { product: "Producto C", quantity: 3, unitPrice: 45.00, date: "2023-10-10" }
];

const mockTransactions = [
    { type: "Ingreso", description: "Venta de Productos", amount: 200.00, date: "2023-10-01" },
    { type: "Egreso", description: "Pago de nómina", amount: 100.00, date: "2023-10-02" },
    { type: "Ingreso", description: "Venta de Productos", amount: 75.00, date: "2023-10-05" },
    { type: "Egreso", description: "Compra de materiales", amount: 150.00, date: "2023-10-08" }
];

const mockProduction = [
    { product: "Producto A", quantity: 100, date: "2023-10-01", status: "Completado" },
    { product: "Producto B", quantity: 50, date: "2023-10-03", status: "En Proceso" },
    { product: "Producto C", quantity: 20, date: "2023-10-09", status: "Pendiente" }
];

// Función para calcular totales
function calculateTotals(filteredData) {
    let totalSales = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    filteredData.forEach(item => {
        if (item.type === "sale") {
            totalSales += item.quantity;
        } else if (item.type === "income") {
            totalIncome += item.amount;
        } else if (item.type === "expense") {
            totalExpenses += item.amount;
        }
    });

    document.getElementById("totalSales").textContent = totalSales;
    document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("netBalance").textContent = (totalIncome - totalExpenses).toFixed(2);
}

// Función para renderizar tabla
function renderFilteredData(data) {
    const tbody = document.querySelector("#filteredData tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        if (item.type === "sale") {
            row.innerHTML = `
                <td>Venta</td>
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>${item.date}</td>
            `;
        } else if (item.type === "income") {
            row.innerHTML = `
                <td>Ingreso</td>
                <td>${item.description}</td>
                <td>$${item.amount.toFixed(2)}</td>
                <td>${item.date}</td>
            `;
        } else if (item.type === "expense") {
            row.innerHTML = `
                <td>Egreso</td>
                <td>${item.description}</td>
                <td>$${item.amount.toFixed(2)}</td>
                <td>${item.date}</td>
            `;
        }

        tbody.appendChild(row);
    });
}

// Función para convertir datos a CSV
function exportToCSV() {
    let csv = "Tipo,Descripción/Material,Cantidad/Monto,Fecha\n";

    document.querySelectorAll("#filteredData tbody tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        csv += `${cells[0].textContent},${cells[1].textContent},${cells[2].textContent},${cells[3].textContent}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "reporte.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Manejador de formulario
document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Convertir fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Consolidar todos los datos
    const consolidatedData = [];

    // Agregar ventas
    mockSales.forEach(sale => {
        const date = new Date(sale.date);
        if (date >= start && date <= end) {
            consolidatedData.push({
                type: "sale",
                product: sale.product,
                quantity: sale.quantity,
                date: sale.date
            });
        }
    });

    // Agregar transacciones financieras
    mockTransactions.forEach(t => {
        const date = new Date(t.date);
        if (date >= start && date <= end) {
            if (t.type === "Ingreso") {
                consolidatedData.push({
                    type: "income",
                    description: t.description,
                    amount: parseFloat(t.amount),
                    date: t.date
                });
            } else {
                consolidatedData.push({
                    type: "expense",
                    description: t.description,
                    amount: parseFloat(t.amount),
                    date: t.date
                });
            }
        }
    });

    // Actualizar UI
    calculateTotals(consolidatedData);
    renderFilteredData(consolidatedData);
});