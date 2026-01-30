let history = JSON.parse(localStorage.getItem("searchHistory")) || []
let container = document.getElementById("historyList")

history.sort((a,b) => b.time - a.item);

history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";

    let date = new Date(item.time);
    let formattedTime = date.toLocaleString();
    console.log("time",date,formattedTime)

    div.innerHTML = `
    <strong>${item.query}</search>
    <span class="time">${formattedTime}</span>
    `;
    

    div.addEventListener("click", () => {
        window.location.href = `search.html?q=${encodeURIComponent(item)}`
    });

    container.appendChild(div)
})

// Clear Search History
function clearHistory(){
    localStorage.removeItem('searchHistory');
}