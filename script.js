const likedFlowers = [];

function toggleLike(heart, flowerName) {
  const liked = heart.classList.toggle("liked");
  heart.textContent = liked ? "❤️" : "♡";
  heart.style.color = liked ? "#d48a8a" : "#3a4a42"; // Change color for liked state

  if (liked) {
    likedFlowers.push(flowerName);
  } else {
    const index = likedFlowers.indexOf(flowerName);
    if (index > -1) likedFlowers.splice(index, 1);
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
    ? likedFlowers.map(name => `<div class="py-2">${name}</div>`).join("")
    : "<p>No flowers liked yet.</p>";
}

 
