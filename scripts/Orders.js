import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copies of state for use in this module
const products = getProducts();
const employees = getEmployees();
const orders = getOrders();

// Function to find the product for an order
const findProduct = (order, allProducts) => {
    return allProducts.find(product => product.id === order.productId);
};

// Function to find the employee for an order
const findEmployee = (order, allEmployees) => {
    return allEmployees.find(employee => employee.id === order.employeeId);
};

// Initialize a flag object to track which orders have their details generated
const orderDetailsGenerated = {};

export const Orders = () => {
    let html = "<ul class='order-list'>";

    for (const order of orders) {
        // Using findProduct and findEmployee to get the respective product and employee
        const employee = findEmployee(order, employees);
        const product = findProduct(order, products);

        // Initialize flag as false for each order
        orderDetailsGenerated[order.id] = orderDetailsGenerated[order.id] ?? false;

        html += `
            <li id="order--${order.id}" class='order-item'>
                Order #${order.id}
                <div id="orderDetails--${order.id}" class="order-details" style="display: none;"></div>
            </li>`;
    }

    html += "</ul>";
    return html;
};

document.addEventListener("click", event => {
    if (event.target.id.startsWith("order--")) {
        const orderId = parseInt(event.target.id.split("--")[1]);
        const detailsElement = document.querySelector(`#orderDetails--${orderId}`);
        
        // Toggle the display and generate details if not already generated
        if (!orderDetailsGenerated[orderId]) {
            detailsElement.innerHTML = generateOrderDetails(orderId);
            orderDetailsGenerated[orderId] = true; // Update the flag after generating
        }

        detailsElement.style.display = detailsElement.style.display === "none" ? "block" : "none";
    }
});

function generateOrderDetails(orderId) {
    // Find the order in the orders array
    const order = orders.find(o => o.id === orderId);
    if (!order) return `<p>Order details not found.</p>`;

    // Use findProduct and findEmployee to get the respective product and employee for the order
    const product = findProduct(order, products);
    const employee = findEmployee(order, employees);
    
    // Format the date
    const date = new Date(order.timestamp).toLocaleDateString("en-US");

    return `<p> A ${product.name} sold by ${employee.name}, on ${date}</p>`;
}
