// Cart Logic
const cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cartCount').innerText = cart.length;
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';

  total = 0;
  cart.forEach(item => {
    total += item.price;
    const div = document.createElement('div');
    div.textContent = `${item.name} - P${item.price.toFixed(2)}`;
    cartItems.appendChild(div);
  });

  cartTotal.innerText = `Total: P${total.toFixed(2)}`;
}

document.getElementById('cartIcon').onclick = () => {
  document.getElementById('cartModal').style.display = 'block';
};

document.getElementById('closeCart').onclick = () => {
  document.getElementById('cartModal').style.display = 'none';
};

// Likes / Favorites Logic
const likedFlowers = new Set();

function toggleLike(flowerId) {
  const icon = document.getElementById(`heart-${flowerId}`);
  const favoritesList = document.getElementById('favoritesList');
  const favoritesSection = document.getElementById('favoritesSection');

  if (likedFlowers.has(flowerId)) {
    likedFlowers.delete(flowerId);
    icon.classList.remove('liked');
  } else {
    likedFlowers.add(flowerId);
    icon.classList.add('liked');
  }

  favoritesList.innerHTML = '';
  if (likedFlowers.size > 0) {
    favoritesSection.style.display = 'block';
    likedFlowers.forEach(flower => {
      const item = document.createElement('div');
      item.textContent = flower;
      favoritesList.appendChild(item);
    });
  } else {
    favoritesSection.style.display = 'none';
    favoritesList.innerHTML = 'No flowers liked yet.';
  }
}

