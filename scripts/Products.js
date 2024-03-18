import { getProducts } from "./database.js"




const products  = getProducts()

document.addEventListener("click", (clickEvent) => {
    const itemClicked  = clickEvent.target;

      
    if (itemClicked.classList.contains('products')) {
          
        const productId  = itemClicked.getAttribute('data-productId');
        const product    = products.find(prod => prod.id === parseInt(productId)); // find the name prop by keyid

        window.alert(`A ${product.name} costs $${product.price.toFixed(2)}`)  // formatting
    }

});





export const Products = () => {
    let html  = `<ul>`

    for (const product of products) {
        html += `<li class="products"
                 data-productId  = "${product.id}"
                 >${product.name}</li>`
        }

    html  += "</ul>"

    return html
}


