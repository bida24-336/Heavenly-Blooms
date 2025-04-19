const likedFlowers = [];

function toggleLike(heartElement, flowerName) {
  const isLiked = heartElement.classList.toggle("liked");
  heartElement.textContent = "♡";

  if (isLiked) {
    if (!likedFlowers.includes(flowerName)) {
      likedFlowers.push(flowerName);
    }
  } else {
    const index = likedFlowers.indexOf(flowerName);
    if (index > -1) {
      likedFlowers.splice(index, 1);
    }
  }

  updateFavoritesList();
}

function toggleFavorites() {
  const section = document.getElementById("favoritesSection");
  section.style.display = section.style.display === "block" ? "none" : "block";
}

function updateFavoritesList() {
  const list = document.getElementById("favoritesList");
  list.innerHTML = likedFlowers.length
    ? likedFlowers.map(name => `<div class="favorite-item">${name}</div>`).join("")
    : "<p>No flowers liked yet.</p>";
}

