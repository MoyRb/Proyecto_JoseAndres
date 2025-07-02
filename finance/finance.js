// Simulación de base de datos local
let transactions = [];

// Función para calcular el balance total
function calculateBalance() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        if (t.type === "Ingreso") {
            income += parseFloat(t.amount);
        } else {
            expenses += parseFloat(t.amount);
        }
    });

    const net = income - expenses;

    document.getElementById("totalIncome").textContent = income.toFixed(2);
    document.getElementById("totalExpenses").textContent = expenses.toFixed(2);
    document.getElementById("netBalance").textContent = net.toFixed(2);
}

// Función para renderizar la tabla de transacciones
function renderTransactionsTable() {
    const tableBody = document.querySelector('#transactionsTable tbody');
    tableBody.innerHTML = '';

    transactions.forEach((t, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.type}</td>
            <td>${t.description}</td>
            <td class="${t.type === 'Ingreso' ? 'income' : 'expense'}">
                ${t.type === 'Ingreso' ? '+' : '-'}$${parseFloat(t.amount).toFixed(2)}
            </td>
            <td>${t.date}</td>
            <td>
                <button onclick="editTransaction(${index})">Editar</button>
                <button onclick="deleteTransaction(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    calculateBalance();
}

// Manejador de formulario
document.getElementById('transactionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (type && description && !isNaN(amount) && amount > 0 && date) {
        transactions.push({ type, description, amount, date });
        renderTransactionsTable();
        this.reset(); // Limpiar formulario
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
});

// Función para editar una transacción
function editTransaction(index) {
    const t = transactions[index];
    const newType = prompt("Tipo (Ingreso/Egreso):", t.type);
    const newDescription = prompt("Descripción:", t.description);
    const newAmount = prompt("Monto:", t.amount);
    const newDate = prompt("Fecha (YYYY-MM-DD):", t.date);

    if (newType && newDescription && newAmount && newDate) {
        transactions[index] = {
            type: newType,
            description: newDescription,
            amount: parseFloat(newAmount),
            date: newDate
        };
        renderTransactionsTable();
    }
}

// Función para eliminar una transacción
function deleteTransaction(index) {
    if (confirm("¿Estás seguro de querer eliminar esta transacción?")) {
        transactions.splice(index, 1);
        renderTransactionsTable();
    }
}

// Renderizar al cargar
renderTransactionsTable();