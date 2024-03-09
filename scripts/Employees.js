// Employees.js

import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        // Adding an id attribute for each employee that can be used in the event listener
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"
    return html
}

// Function to calculate and show the number of products sold by an employee
const showEmployeeSales = (employeeId) => {
    const sales = orders.filter(order => order.employeeId === parseInt(employeeId))
    const employee = employees.find(emp => emp.id === parseInt(employeeId))
    alert(`${employee.name} has sold ${sales.length} product(s).`)
}

// Listening for clicks on the document and checking if the clicked element is an employee
document.addEventListener("click", event => {
    if (event.target.id.startsWith("employee")) {
        const [, employeeId] = event.target.id.split("--")
        showEmployeeSales(employeeId)
    }
})
