// Employees.js

import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li>${employee.name}</li>`
    }

    html += "</ul>"

    return html
}

// Add an event listener to the entire document, but specifically check if an employee item was clicked
document.addEventListener("click", event => {
    if (event.target.id.startsWith("employee--")) {
        const [, employeeId] = event.target.id.split("--")
        showEmployeeSales(employeeId)
    }
})

// Function to calculate and show the number of products sold by the employee
const showEmployeeSales = (employeeId) => {
    const sales = orders.filter(order => order.employeeId === parseInt(employeeId))
    const employee = employees.find(emp => emp.id === parseInt(employeeId))
    window.alert(`${employee.name} has sold ${sales.length} product(s).`)}
