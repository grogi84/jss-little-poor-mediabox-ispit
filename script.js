//Definiranje osnovnih varijabli - search, loading i results
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const loadingMessage = document.getElementById("loading-message");
const resultsContainer = document.getElementById("results");

let timeoutId;

//EventListener na input SEARCH
searchInput.addEventListener("input", handleInputChange);

function handleInputChange() {
  clearTimeout(timeoutId);
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    timeoutId = setTimeout(() => {
      showLoadingMessage();
      searchItunes(searchTerm);
    }, 500);
  } else {
    clearResults();
  }
}

function showLoadingMessage() {
  loadingMessage.style.display = "block";
  resultsContainer.innerHTML = "";
}

function hideLoadingMessage() {
  loadingMessage.style.display = "none";
}

//Search function s itunes API implementacijom s parametrom "term"
function searchItunes(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results);
      hideLoadingMessage();
    })
    .catch((error) => {
      console.error("Error:", error);
      hideLoadingMessage();
    });
}

//Prikaz rezultata
function displayResults(results) {
  resultsContainer.innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.className = "result-item";

    const img = document.createElement("img");
    img.src = result.artworkUrl100;
    img.alt = result.trackName;

    const span = document.createElement("span");
    span.textContent = result.trackName;

    div.appendChild(img);
    div.appendChild(span);
    resultsContainer.appendChild(div);
  });
}

function clearResults() {
  resultsContainer.innerHTML = "";
}
