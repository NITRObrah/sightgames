// SIGHT GAMES CONFIG - All games preserved ✅
var sitename = "SIGHT GAMES"; 
var subtext = "v1.2";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;

let gamesData = []; 

// Enhanced display with cool hover effects
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");
    
    // Add smooth hover animation class
    gameDiv.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      // Smooth transition to game
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = `play.html?gameurl=${game.url}/`;
      }, 200);
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Enhanced search with live filtering
function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Load ALL your games from JSON (unchanged)
fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
    console.log(`✅ Loaded ${data.length} games!`);
  })
  .catch((error) => {
    console.error("Error fetching games:", error);
    // Fallback games if JSON fails
    gamesData = [
      {"name":"1v1lol","image":"logo.png","url":"1v1lol"},
      {"name":"1v1space","image":"splash.png","url":"1v1space"}
    ];
    displayFilteredGames(gamesData);
  });

// Smooth search input handling
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
    
    // Add cool focus effect
    searchInput.addEventListener("focus", function() {
      this.style.transform = "scale(1.02)";
    });
    searchInput.addEventListener("blur", function() {
      this.style.transform = "scale(1)";
    });
  }

  // Update title/subtitle with smooth fade
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  if (titleEl) {
    titleEl.style.opacity = "0";
    titleEl.style.transition = "opacity 0.5s ease";
    titleEl.innerHTML = `${sitename}`;
    setTimeout(() => titleEl.style.opacity = "1", 100);
  }
  if (subtitleEl) {
    subtitleEl.innerHTML = `${subtext}`;
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.target.matches('#searchInput')) return;
  
  if (e.key === '/') {
    e.preventDefault();
    document.getElementById("searchInput").focus();
  }
});


