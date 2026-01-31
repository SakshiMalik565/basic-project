let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

console.log("On product page, id=", productId);

fetch(`https://dummyjson.com/products/${productId}`)
.then(res => res.json())
.then(product => {
    console.log("Product data: ", product);

    // Basic info
    document.getElementById("title").innerText = product.title;
    document.getElementById("thumbnail").src = product.thumbnail;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = product.price;
    document.getElementById("availability").innerText = product.stock > 0 ? "In Stock" : "Out of Stock";
    
    // Details list
    
    let details = document.getElementById("details");
    details.innerHTML = `
        <li><b>Brand:</b>${product.brand}</li>
        <li><b>Category:</b>${product.category}</li>
        <li><b>Rating:</b>${product.rating}</li>
        <li><b>Stock:</b>${product.stock}</li>
        <li><b>Discount:</b>${product.discountPercentage}</li>
        <li><b>SKU:</b>${product.sku}</li>
        <li><b>Weight:</b>${product.weight}</li>
        <li><b>Warranty:</b>${product.warrantyInformation}</li>
        <li><b>Return Policy:</b>${product.returnPolicy}</li>
        <li><b>Shipping:</b>${product.shippingInformation}</li>
        <li><b>Minimum Order:</b>${product.minimumOrderQuantity}</li>
    `;

    // Tags
    let tagsDiv = document.getElementById("tags");

    tagsDiv.innerHTML = "";
    product.tags.forEach(tag => {
        let span = document.createElement("span");
        span.className = "tag";
        span.innerHTML = tag;
        tagsDiv.appendChild(span);
    });
})

  .catch(err => console.log(err));