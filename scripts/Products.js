// # Products.js



import { getProducts } from "./database.js"
const products = getProducts()

document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target;

    // Was a product list item clicked?
    if (itemClicked.classList.contains('products')) {
        // Get the id of the product clicked
        const productId = itemClicked.getAttribute('data-productId');
        const product = products.find(prod => prod.id === parseInt(productId));

        window.alert(`A ${product.name} costs $${product.price.toFixed(2)}`)
    }

});





export const Products = () => {
    let html = `<ul>`

    for (const product of products) {
        // Ensure class is properly assigned and include the data-productId attribute
        html += `<li class="products" data-productId="${product.id}">${product.name}</li>`
    }

    html += "</ul>"

    return html
}


