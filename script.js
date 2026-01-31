let currentPage =1
let itemPerPage = 8;
let allProducts = []

let container = document.getElementById("prod");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let pageInfo = document.getElementById("pageInfo");

fetch(`https://dummyjson.com/products`)
.then(res => res.json())
.then(data => {
    allProducts = data.products;
    if(allProducts.length == 0){
        container.innerHTML = "<p>No products available</p>";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        pageInfo.innerText = "";
        return;
    }
    renderPage()
});

function renderPage(){
    container.innerHTML = ""

    let start = (currentPage - 1) * itemPerPage;
    let end = start + itemPerPage;
    
    let pageItems = allProducts.slice(start, end);

    pageItems.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src = "${product.thumbnail}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
        `;

        card.addEventListener("click", () => {
            let history = JSON.parse(localStorage.getItem("viewHistory")) || [];

        const exists = history.some(
        vitem => vitem.id === product.id
        );

        if(!exists){
            history.push({
              productId:product.id,
              time: Date.now()
            })
            localStorage.setItem("viewHistory", JSON.stringify(history));
        }
        
            window.location.href = `product.html?id=${product.id}`;
        });
        container.appendChild(card);
    });

    let totalPages = Math.ceil(allProducts.length / itemPerPage);
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
    window.scrollTo({top:0, behavior: "smooth"});
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderPage();
});


// Searching

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
console.log(searchBtn)
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  console.log(query)
  if(!query) return;

  // Save to localStorage
  saveSearch(query);

  // Redirect with query param
  window.location.href = `search.html?q=${encodeURIComponent(query)}`
  searchInput.value="";
})

function saveSearch(query){
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter(item => item.query.toLowerCase() !== query.toLowerCase());

    history.push({
      query: query,
      time: Date.now()
    })
    localStorage.setItem("searchHistory",JSON.stringify(history));
  
}

const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  console.log("Suggestion working");

  const text = searchInput.value.trim().toLowerCase();
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log("history ",history)
  // Filter based on query field
  const matches = history.filter(item => item.query.toLowerCase().includes(text));

  console.log("matches",matches);
  
  // Clear previous suggestions
  suggestionBox.innerHTML = "";

  // Show suggestions
  matches.forEach(item => {
    const div1 = document.createElement("div")
    div1.className = "suggestion-item";
    div1.innerText = item.query;    
    
    div1.addEventListener("click" , () => {
      searchInput.value = item.query;
      suggestionBox.innerHTML = "";
    });
    suggestionBox.appendChild(div1);    

  });
});