document.addEventListener('DOMContentLoaded', () => {
    // --- Common JavaScript Functions (apply to all pages) ---

    // Function to toggle mobile navigation (assuming you have a nav-toggle-button and main-nav)
    const navToggleButton = document.getElementById('nav-toggle-button');
    const mainNav = document.getElementById('main-nav');

    if (navToggleButton && mainNav) {
        navToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggleButton.classList.toggle('active'); // Optional: style the button when active
        });
    }

    // --- Page-Specific JavaScript Logic ---

    // Get the current path to determine which page is loaded
    const currentPath = window.location.pathname;

    // JavaScript for index.html (Homepage)
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '/index.html') {
        console.log('Running scripts for the homepage.');

        // Hero banner fade-in animation
        const heroBanner = document.getElementById('hero-banner');
        if (heroBanner) {
            // Use setTimeout to ensure CSS transition has effect after DOM render
            setTimeout(() => {
                heroBanner.style.opacity = '1';
            }, 100);
        }

        // Example: Heart icon toggle for best sellers (if applicable)
        const heartIcons = document.querySelectorAll('.best-sellers .heart');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                icon.classList.toggle('favorited'); // Add/remove a class for styling
                console.log('Heart clicked!');
            });
        });

        // Example: Initialize any carousel or slider for the homepage
        // (This would typically involve a library or more complex JS)
        // console.log('Initializing homepage carousel...');

    }

    // JavaScript for dried_flower.html (Product Page)
    if (currentPath.includes('dried_flower.html')) {
        console.log('Running scripts for the dried flowers product page.');

        const mainProductImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        const addToCartButton = document.getElementById('add-to-cart-btn');

        if (mainProductImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    // Update main image source
                    mainProductImage.src = this.src;

                    // Remove 'active' class from all thumbnails
                    thumbnails.forEach(t => t.classList.remove('active'));

                    // Add 'active' class to the clicked thumbnail
                    this.classList.add('active');
                });
            });
        }

        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                // In a real application, this would add to a cart state or send to a server
                alert('Dried flowers added to cart!');
                console.log('Product added to cart!');
            });
        }
    }

    // JavaScript for bouquets.html (Bouquets Listing Page)
    // This is included based on your provided CSS, assuming you have this page
    if (currentPath.includes('bouquets.html')) {
        console.log('Running scripts for the bouquets listing page.');

        const infoButtons = document.querySelectorAll('.info-btn');

        infoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const description = button.previousElementSibling; // The .bouquet-description
                if (description) {
                    description.classList.toggle('show'); // Toggle a class to show/hide
                    if (description.classList.contains('show')) {
                        button.textContent = 'Hide Details';
                    } else {
                        button.textContent = 'Show Details';
                    }
                }
            });
        });
    }

    // JavaScript for contact.html (Contact Page)
    // This is included based on your provided CSS, assuming you have this page
    if (currentPath.includes('contact.html')) {
        console.log('Running scripts for the contact page.');

        // Example: Form submission handling
        const contactForm = document.getElementById('contact-form'); // Assuming you have a form with this ID
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                alert('Message sent successfully!');
                console.log('Contact form submitted!');
                // Here you would typically send form data to a server using fetch() or XMLHttpRequest
                contactForm.reset(); // Clear the form after submission
            });
        }
    }
});

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








    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Plants - Heavenly Blooms</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css"/>
</head>

<body>
  <header>
    <div class="logo">
      <img src="Logo.jpg" alt="Heavenly Blooms Logo"/>
      <h1 class="shop-name">Heavenly Blooms</h1>
    </div>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="plants.html" class="active">Plants</a></li>
        <li><a href="bouquets.html">Bouquets</a></li>
        <li><a href="driedflower.html">Dried Flowers</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </nav>
  </header>

    <section class="product-section">
    <h2 class="page-title">Our Plants Collection</h2>
    <p class="category-description">
      Discover our wide variety of healthy, vibrant plants perfect for your home or garden. Each plant is carefully nurtured to ensure it arrives at your doorstep in perfect condition.
    </p>

        <h3>Flowering Plants</h3>
        <div class="product-grid">
      <div class="product-card">
        <div class="product-image-container">
          <img src="Roses.jpeg" alt="Rose Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Rose Plant</p>
          <p class="product-price">P120</p>
          <p class="product-desc">Classic roses with vibrant colors and sweet fragrance. Perfect for gardens and patios.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Moderate water</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image-container">
          <img src="Tulip.jpeg" alt="Tulip Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Tulip Bulbs</p>
          <p class="product-price">P150</p>
          <p class="product-desc">Bright tulip bulbs that bloom in spring. Available in various colors.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Moderate water</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image-container">
          <img src="Lily.jpeg" alt="Lily Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Lily Plant</p>
          <p class="product-price">P130</p>
          <p class="product-desc">Elegant lilies with large, fragrant flowers. Great for borders or containers.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Partial Shade | <i class="fas fa-tint"></i> Keep Moist</p>
        </div>
      </div>

        

        <h3>Herbs</h3>
        <div class="product-grid">
      <div class="product-card">
        <div class="product-image-container">
          <img src="Rosemary plant.jpeg" alt="Rosemary Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Rosemary Plant</p>
          <p class="product-price">P80</p>
          <p class="product-desc">Woody herb with needle-like leaves. Great for roasting and grilling.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Low Water</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image-container">
          <img src="Mint.jpeg" alt="Mint Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Mint Plant</p>
          <p class="product-price">P50</p>
          <p class="product-desc">Refreshing mint ideal for teas and cocktails. Grows vigorously.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Partial sun | <i class="fas fa-tint"></i> Keep moist</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image-container">
          <img src="Basil.jpeg" alt="Basil Plant" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Basil Plant</p>
          <p class="product-price">P90</p>
          <p class="product-desc">Aromatic basil perfect for cooking.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Daily water</p>
        </div>
      </div>
    </div>

        <h3>Trees</h3>
        <div class="product-grid">
      <div class="product-card">
        <div class="product-image-container">
          <img src="Avocado.jpeg" alt="Avocado Tree" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Avocado Tree</p>
          <p class="product-price">P6 00</p>
          <p class="product-desc">Produces creamy avocados. Self-pollinating variety. Grows up to 3–5m tall.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Moderate water</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image-container">
          <img src="Pine.jpeg" alt="Pine Tree" class="product-image"/>
        </div>
        <div class="product-info">
          <p class="product-name">Pine Tree</p>
          <p class="product-price">P500</p>
          <p class="product-desc">Classic evergreen suitable for landscaping and privacy. Tolerates various climates.</p>
          <p class="plant-care"><i class="fas fa-sun"></i> Full sun | <i class="fas fa-tint"></i> Low water once established</p>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="social-icons">
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
    </div>
    <p class="copyright">&copy; 2024 Heavenly Blooms. All rights reserved.</p>
  </footer>
</body>
</html>  

});
