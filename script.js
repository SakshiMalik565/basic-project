fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    let products = data.products;
    let container = document.getElementById("prod");

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




// Searching

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  console.log(query)
  if(!query) return;

  // Save to localStorage
  saveSearch(query);

  // Redirect with query param
  window.location.href = `search.html?q=${encodeURIComponent(query)}`
  searchInput.value="";
})

// function saveSearch(query){
//   let searches = JSON.parse(localStorage.getItem("searches")) || [];
//   searches = searches.filter(item => item.toLowerCase() !== query.toLowerCase());
//   searches.unshift(query);
//   searches = searches.slice(0, 5);
//   localStorage.setItem("searches", JSON.stringify(searches));
// }

function saveSearch(query){
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  // history = history.filter(item => item.toLowerCase() !== query.toLowerCase());

  const exists = history.some(
    item => item.query.toLowerCase() === query.toLowerCase()
  );

  if(!exists){
    history.push({
      query: query,
      time: Date.now()
    })
    localStorage.setItem("searchHistory",JSON.stringify(history));
  }
}

const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  console.log("Suggestion working");

  const text = searchInput.value.toLowerCase();
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Filter based on query field
  const matches = history.filter(item => item.query.toLowerCase().includes(text));

  console.log(matches);
  
  // Clear previous suggestions
  suggestionBox.innerHTML = "";

  // Show suggestions
  matches.forEach(item => {
    const div = document.createElement("div")
    div.className = "suggestion-item";
    div.innerText = item.query;

    div.addEventListener("click" , () => {
      searchInput.value = item.query;
      suggestionBox.innerText = "";
    });

    suggestionBox.appendChild(div);
  });
});