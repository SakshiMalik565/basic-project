fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    let products = data.products;
    let container = document.getElementById("products");

    products.forEach(product => {
      
      let card = document.createElement("div");
      card.className = "card";

      let img = document.createElement("img");
      img.src = product.thumbnail;

      let title = document.createElement("h3");
      title.innerText = product.title;

      let price = document.createElement("p");
      price.innerText = "₹ " + product.price;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);

      container.appendChild(card);
    });
  })
  .catch(err => console.log(err));