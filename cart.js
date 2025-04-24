// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  // Update cart count
  document.getElementById('cartCount').textContent = cart.length;
  
  // Update cart modal
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">P${item.price.toFixed(2)}</div>
        </div>
        <button class="remove-item" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });
  
  cartTotal.textContent = `Total: P${total.toFixed(2)}`;
  
  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.closest('.remove-item').getAttribute('data-index');
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  });
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
  
  // Cart toggle
  document.getElementById('cartIcon')?.addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'block';
  });
  
  document.getElementById('closeCart')?.addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
  });
  
  // Checkout
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Proceeding to checkout with ${cart.length} items. Total: P${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
  });
});

// Function to add items to cart (call this from product pages)
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

