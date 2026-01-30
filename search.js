

let param = new URLSearchParams(window.location.search)
let query = param.get("q");


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    let products = data.products;
    let filtered = products.filter((p) => {
        return p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    })


    let container = document.getElementById("prod");

    filtered.forEach(product => {
      
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