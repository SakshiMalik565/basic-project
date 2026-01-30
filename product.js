let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

console.log("Product ID:", productId);

fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    console.log("Product Data:", product);
    
    document.getElementById("title").innerText = product.title;
    document.getElementById("thumbnail").src = product.thumbnail;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = "₹ " + product.price;
    document.getElementById("availability").innerText = product.available ? "In Stock" : "Out of Stock";
    let details=document.getElementById("details");
    details.innerHTML=`
    <li><b>Brand:</b> ${product.brand}</li>
    <li><b>Category: </b>${product.category}</li>
    <li><b>Rating:</b> ${product.rating}</li>
    <li><b>Stock:</b> ${product.stock}</li>        
    <li><b>Discount: </b>${product.discountPercentage}%</li>
    <li><b>SKU:</b> ${product.sku}</li>
    <li><b>Weight:</b> ${product.weight} kg</li>
    <li><b>Warranty:</b> ${product.warrantyInformation}</li>
    <li><b>Return Policy:</b> ${product.returnPolicy}</li>
    <li><b>Shipping Information:</b> ${product.shippingInformation}</li>
    <li><b>Minimum Order Quantity:</b> ${product.minimumOrderQuantity}</li>
    `;
    document.getElementById("addToCart")
        .addEventListener("click", function () {
          alert(`${product.title} added to cart 🛒`);
        });
    })
    .catch(err => {
    console.log("Error fetching product data:", err);

})