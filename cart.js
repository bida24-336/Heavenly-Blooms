document.addEventListener('DOMContentLoaded', () => {
    // --- Common JavaScript Functions and Elements ---
    const navToggleButton = document.getElementById('nav-toggle-button');
    const mainNav = document.getElementById('main-nav');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p>${item.name} (x${item.quantity})</p>
                    <p>P${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: P${total.toFixed(2)}`;
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
    }

    // Function to add item to cart
    function addItemToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }
        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
    }

    // Event listener for removing items from cart
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemId = event.target.dataset.id;
            removeItemFromCart(itemId);
        }
    });

    // Cart Modal functionality
    if (cartIcon && cartModal && closeCartBtn) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('show');
        });

        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('show');
        });

        // Close modal when clicking outside of it
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.classList.remove('show');
            }
        });

        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout! (This is a demo)');
            // In a real application, redirect to checkout page or process order
            cart = []; // Clear cart after checkout
            updateCartDisplay();
            cartModal.classList.remove('show');
        });
    }

    // Initial update of cart display on load
    updateCartDisplay();


    // Mobile navigation toggle
    if (navToggleButton && mainNav) {
        navToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Optional: style the button when active, if you add a 'active' class to it in CSS
            // navToggleButton.classList.toggle('active');
        });
    }

    // --- Page-Specific JavaScript Logic ---

    const currentPath = window.location.pathname;

    // JavaScript for index.html (Homepage)
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '/index.html') {
        console.log('Running scripts for the homepage.');

        // Hero banner fade-in animation
        const heroBanner = document.getElementById('hero-banner');
        if (heroBanner) {
            setTimeout(() => {
                heroBanner.style.opacity = '1';
            }, 100);
        }

        const heartIcons = document.querySelectorAll('.best-sellers .heart');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                icon.classList.toggle('favorited');
                console.log('Heart clicked!');
            });
        });
    }

    // JavaScript for dried_flower.html (Product Page)
    if (currentPath.includes('driedflower.html')) { // Corrected from dried_flower.html to driedflower.html
        console.log('Running scripts for the dried flowers product page.');

        const mainProductImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        const addToCartButton = document.getElementById('add-to-cart-btn'); // Main product page add to cart

        if (mainProductImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    mainProductImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                // Example: Hardcoded product details for demo
                const product = {
                    id: 'dried-flower-bouquet-1', // Unique ID
                    name: document.querySelector('.product-info h1').textContent,
                    price: parseFloat(document.querySelector('.product-info .price').textContent.replace('P', '')),
                    image: mainProductImage.src,
                    quantity: 1 // Default quantity for single product page
                };
                addItemToCart(product);
                alert(`${product.name} added to cart!`);
            });
        }
    }

    // JavaScript for bouquets.html (Bouquets Listing Page)
    if (currentPath.includes('bouquets.html')) {
        console.log('Running scripts for the bouquets listing page.');

        // Handle quantity controls for each bouquet item
        document.querySelectorAll('.bouquet-card').forEach(card => {
            const minusBtn = card.querySelector('.quantity-btn.minus');
            const plusBtn = card.querySelector('.quantity-btn.plus');
            const quantityInput = card.querySelector('.quantity-input');
            const addToCartBtn = card.querySelector('.add-to-cart-btn'); // Ensure this matches HTML

            if (minusBtn && plusBtn && quantityInput) {
                minusBtn.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInput.value);
                    if (currentValue > 1) {
                        quantityInput.value = currentValue - 1;
                    }
                });

                plusBtn.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInput.value);
                    quantityInput.value = currentValue + 1;
                });
            }

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    const name = card.querySelector('.bouquet-name').textContent;
                    const priceText = card.querySelector('.bouquet-price').textContent;
                    const price = parseFloat(priceText.replace('P', ''));
                    const image = card.querySelector('.bouquet-image').src;
                    const quantity = parseInt(quantityInput.value);

                    // Create a unique ID for the item, e.g., based on name
                    const id = name.toLowerCase().replace(/\s/g, '-');

                    const product = { id, name, price, image, quantity };
                    addItemToCart(product);
                    alert(`${quantity} x ${name} added to cart!`);
                });
            }
        });
    }

    // JavaScript for contact.html (Contact Page)
    if (currentPath.includes('contact.html')) {
        console.log('Running scripts for the contact page.');

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('Message sent successfully! We will get back to you soon.');
                console.log('Contact form submitted!');
                contactForm.reset();
            });
        }
    }

    // JavaScript for about.html (About Us Page)
    // No specific JS needed based on previous discussions, but keeping the structure
    if (currentPath.includes('about.html')) {
        console.log('Running scripts for the about us page.');
        // Add any About Us specific scripts here if needed, e.g., team member carousels
    }

    // JavaScript for plants.html (Plants Page) - Assuming similar structure to bouquets if it exists
    if (currentPath.includes('plants.html')) {
        console.log('Running scripts for the plants listing page.');
        // Add similar logic for plants as for bouquets if they have quantity/add to cart
    }
});


           
