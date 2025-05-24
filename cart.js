// cart.js - Shared cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Add to cart function
function addToCart(productName, price, imageSrc, quantity = 1) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity,
            image: imageSrc
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
    
    return false; // Prevent default form submission
}

// Update cart modal display
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="images/${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">P${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div>P${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `Total: P${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted py-3">Your cart is empty</p>';
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // Cart modal toggle
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
            updateCartModal();
        });
        
        closeCart.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
        
        document.addEventListener('click', (event) => {
            if (!cartModal.contains(event.target) && event.target !== cartIcon && !cartIcon.contains(event.target)) {
                cartModal.style.display = 'none';
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Proceeding to checkout!');
            // Here you would typically redirect to a checkout page
        });
    }
    
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.quantity-controls');
            const input = container.querySelector('.quantity-input');
            let change = this.classList.contains('minus') ? -1 : 1;
            let newValue = parseInt(input.value) + change;
            if (newValue < 1) newValue = 1;
            input.value = newValue;
        });
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.plant-info, .bouquet-info, .dried-flower-info');
            const productName = container.querySelector('.plant-name, .bouquet-name, .dried-flower-name').textContent;
            const price = parseFloat(container.querySelector('.plant-price, .bouquet-price, .dried-flower-price').textContent.replace('P', ''));
            const quantity = parseInt(container.querySelector('.quantity-input').value);
            const imageSrc = container.closest('.plant-item, .bouquet-card, .dried-flower-item').querySelector('img').src.split('/').pop();
            
            addToCart(productName, price, imageSrc, quantity);
            
            // Visual feedback
            this.textContent = "✓ Added";
            this.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                this.textContent = "Add to Cart";
                this.style.backgroundColor = "#5a7247";
            }, 2000);
        });
    });
});
