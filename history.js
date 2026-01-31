let history = JSON.parse(localStorage.getItem("searchHistory")) || []
let container = document.getElementById("historyList")

history.sort((a,b) => b.time - a.time);

history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";

    let dateObj = new Date(item.time);

    let formattedDate = dateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    let formattedTime = dateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    div.innerHTML = `
    <strong>${item.query}</strong>
    <div class="date">${formattedDate}</div>
    <span class="time">${formattedTime}</span>
    `;
    

    div.addEventListener("click", () => {
        window.location.href = `search.html?q=${encodeURIComponent(item.query)}`
    });

    container.appendChild(div)
})

// Clear Search History
function clearHistory(){
    localStorage.removeItem('searchHistory');
    container.innerHTML = "";
}