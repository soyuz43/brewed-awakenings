import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copies of state for use in this module
const products = getProducts();
const employees = getEmployees();
const orders = getOrders();


const findProduct = (order, allProducts) => {
    for (const product of allProducts) {
        if (product.id === order.productId) {
            return product;
        }
    }
    
};



const findEmployee = (order, allEmployees) => {
    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            return employee;
        }
    }
    
};



const orderDetailsGenerated = {};                                               // TO-DO I believe this needs refactor flag is possibly not needed!!!!!

export const Orders = () => {   
    let html = "<ul class='order-list'>";

    for (const order of orders) {
    
        const employee = findEmployee(order, employees); 
        const product = findProduct(order, products);

       
        orderDetailsGenerated[order.id] = orderDetailsGenerated[order.id] ?? false;         // start filling that flag obj

        // * Order # diplays the number from the database directly on the DOM!
        html += `
            <li id="order--${order.id}"
             class='order-item'>
             Order #${order.id}                                                
            <div id="orderDetails--${order.id}" 
             class="order-details"> 
            </div>
            </li>`;
    }

    html += "</ul>";
    return html;
};

document.addEventListener("click", event => {
    if (event.target.id.startsWith("order--")) {
        const orderId = parseInt(event.target.id.split("--")[1]);                                           // * split the string element into an array, -- is delimiter (!slicker parseint)
        const detailsElement = document.querySelector(`#orderDetails--${orderId}`);
        
        
        if (!orderDetailsGenerated[orderId]) {
            detailsElement.innerHTML = generateOrderDetails(orderId);    
            orderDetailsGenerated[orderId] = true; //                                                      // * now updating flg to prevent re-load on each click.
        }
        // ! if clicked goes to block, then back to none, the colon means that instead of updating true/false instead block/none are used 
        detailsElement.style.display = detailsElement.style.display === "none" ? "block" : "none"; 
    }
});

const generateOrderDetails = (orderId) => {                            // TO-DO: Answer "so is this a good way to do it or should I load it into the DOM and set it to none?""
    // Find the order in the orders array
    const order = orders.find(orders => orders.id === orderId);

    const product = findProduct(order, products);
    const employee = findEmployee(order, employees);
    
    
    const date = new Date(order.timestamp).toLocaleDateString("en-US");         // * Format the date

    return `<p> A ${product.name} sold by ${employee.name}, on ${date}</p>`;
}
