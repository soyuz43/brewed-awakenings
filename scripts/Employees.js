// Employees.js

import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        
        html += `<li id="employee--${employee.id}">${employee.name}</li>`  // listening to the interpolation w/in html
    }

    html += "</ul>"
    return html
}


const showEmployeeSales = (employeeId) => {
    
    const sales = [];
        for (const order of orders) {
            if (order.employeeId === parseInt(employeeId)) {                                                     // * find & show the number of products sold by an employee
            sales.push(order);
            }
    }      
    let employee;
        for (const emp of employees) {
            if (emp.id === parseInt(employeeId)) {
                employee = emp;
                break;                                                                                              // * break the loop once the employee is found
            }
    }
    

    alert(`${employee.name} has sold ${sales.length} product(s).`)
}


document.addEventListener("click", event => {
    if (event.target.id.startsWith("employee")) {                                                       
        const [, employeeId] = event.target.id.split("--")
        showEmployeeSales(employeeId)                                                       // call still in global scope :)
    }
})
