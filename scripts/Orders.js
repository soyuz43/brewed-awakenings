//Orders.js

import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts();
const employees = getEmployees();
const orders = getOrders();

// Function whose responsibility is to find the product for an order
const findProduct = (order, allProducts) => {
    return allProducts.find(product => product.id === order.productId);
};

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    return allEmployees.find(employee => employee.id === order.employeeId);
};

export const Orders = () => {
    let html = "<div class='order-list'>";

    for (const order of orders) {
        const employee = findEmployee(order, employees); // Correctly utilize findEmployee
        const product = findProduct(order, products); // Correctly utilize findProduct

        if (!employee || !product) {
            console.warn('Missing employee or product for order:', order);
            continue; // Skip this iteration if necessary data is missing
        }

        html += `<div class='order-item'>${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</div>`;
    }

    html += "</div>";

    return html;
};
