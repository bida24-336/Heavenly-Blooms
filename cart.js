document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing scripts...');

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

    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem('heavenlyBloomsCart')) || []; // Using a more unique key

    console.log('Initial cart state:', cart);

    // Function to update cart display in the modal and count icon
    function updateCartDisplay() {
        console.log('Updating cart display...');
        cartItemsContainer.innerHTML = ''; // Clear current items
        let total = 0;
        let totalQuantity = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                // Ensure price is treated as a number for calculation and formatting
                const itemPrice = parseFloat(item.price) || 0;
                const itemQuantity = parseInt(item.quantity) || 0;

                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p>${item.name} (x${itemQuantity})</p>
                        <p>P${(itemPrice * itemQuantity).toFixed(2)}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += itemPrice * itemQuantity;
                totalQuantity += itemQuantity;
            });
        }

        cartTotalElement.textContent = `Total: P${total.toFixed(2)}`;
        cartCountElement.textContent = totalQuantity;
        localStorage.setItem('heavenlyBloomsCart', JSON.stringify(cart)); // Save cart to local storage
        console.log('Cart updated:', cart);
    }

    // Function to add item to cart
    function addItemToCart(item) {
        // Ensure item.id, item.name, item.price, item.image, item.quantity are valid
        if (!item.id || !item.name || typeof item.price === 'undefined' || !item.image || typeof item.quantity === 'undefined') {
            console.error('Invalid item data provided to addItemToCart:', item);
            alert('Could not add item to cart due to invalid product data.');
            return;
        }

        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            console.log(`Updated quantity for existing item: ${item.name}, new quantity: ${existingItem.quantity}`);
        } else {
            cart.push({ ...item }); // Use spread to create a new object to avoid reference issues
            console.log(`Added new item to cart: ${item.name}`);
        }
        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeItemFromCart(id) {
        console.log(`Attempting to remove item with ID: ${id}`);
        const initialLength = cart.length;
        cart = cart.filter(item => item.id !== id);
        if (cart.length < initialLength) {
            console.log(`Item with ID ${id} removed.`);
        } else {
            console.log(`Item with ID ${id} not found in cart.`);
        }
        updateCartDisplay();
    }

    // Event listener for removing items from cart modal
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemId = event.target.dataset.id;
            removeItemFromCart(itemId);
        }
    });

    // Cart Modal functionality
    if (cartIcon && cartModal && closeCartBtn && checkoutBtn) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('show');
            console.log('Cart modal opened.');
        });

        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('show');
            console.log('Cart modal closed.');
        });

        // Close modal when clicking outside of it
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) { // Only close if the background overlay is clicked
                cartModal.classList.remove('show');
                console.log('Cart modal closed by clicking outside.');
            }
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Proceeding to checkout! (This is a demo)');
                console.log('Checkout initiated.');
                cart = []; // Clear cart after checkout
                updateCartDisplay();
                cartModal.classList.remove('show');
            } else {
                alert('Your cart is empty. Please add items before checking out.');
            }
        });
    } else {
        console.warn('Cart modal elements not found. Cart functionality may be limited.');
    }

    // Initial update of cart display on page load
    updateCartDisplay();


    // Mobile navigation toggle
    if (navToggleButton && mainNav) {
        navToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            console.log('Nav toggle clicked.');
        });
    } else {
        console.warn('Navigation toggle elements not found.');
    }

    // --- Page-Specific JavaScript Logic ---
    const currentPath = window.location.pathname;
    console.log('Current Path:', currentPath);

    // JavaScript for index.html (Homepage)
    // Check for both / and /index.html for robustness
    if (currentPath === '/' || currentPath.includes('index.html')) {
        console.log('Running scripts for the homepage.');

        const heroBanner = document.getElementById('hero-banner');
        if (heroBanner) {
            setTimeout(() => {
                heroBanner.style.opacity = '1';
                console.log('Hero banner faded in.');
            }, 100);
        }

        const heartIcons = document.querySelectorAll('.best-sellers .heart');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                icon.classList.toggle('favorited');
                console.log('Heart clicked on best seller.');
            });
        });
    }

    // JavaScript for driedflower.html (Product Page)
    if (currentPath.includes('driedflower.html')) {
        console.log('Running scripts for the dried flowers product page.');

        const mainProductImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        const addToCartButton = document.getElementById('add-to-cart-btn');

        if (mainProductImage && thumbnails.length > 0) {
            // Set first thumbnail as active initially
            if (!document.querySelector('.thumbnail-image.active')) {
                thumbnails[0].classList.add('active');
            }

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    mainProductImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    console.log('Thumbnail clicked, main image updated.');
                });
            });
        } else {
            console.warn('Dried flower product page elements (main image or thumbnails) not found.');
        }

        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const productContainer = addToCartButton.closest('.product-detail-container');
                if (!productContainer) {
                    console.error('Could not find product container for dried flowers.');
                    alert('Error: Could not retrieve product details.');
                    return;
                }

                const name = productContainer.querySelector('.product-info h1')?.textContent;
                const priceText = productContainer.querySelector('.product-info .price')?.textContent;
                const price = priceText ? parseFloat(priceText.replace(/[^\d.]/g, '')) : 0; // Robust price parsing
                const image = productContainer.querySelector('#main-product-image')?.src;
                const quantity = 1; // Assuming always 1 for this page, or add quantity input

                const id = 'dried-flower-' + (name ? name.toLowerCase().replace(/\s/g, '-') : Date.now()); // Fallback ID

                const product = { id, name, price, image, quantity };
                addItemToCart(product);
                alert(`${product.name} added to cart!`);
                console.log(`Added ${product.name} (Dried Flower) to cart.`);
            });
        } else {
            console.warn('Dried flower add to cart button not found.');
        }
    }

    // JavaScript for bouquets.html (Bouquets Listing Page)
    if (currentPath.includes('bouquets.html')) {
        console.log('Running scripts for the bouquets listing page.');

        // Select all bouquet cards to attach event listeners
        document.querySelectorAll('.bouquet-card').forEach(card => {
            const minusBtn = card.querySelector('.quantity-btn.minus');
            const plusBtn = card.querySelector('.quantity-btn.plus');
            const quantityInput = card.querySelector('.quantity-input');
            const addToCartBtn = card.querySelector('.add-to-cart-btn'); // Corrected to match HTML

            if (minusBtn && plusBtn && quantityInput) {
                minusBtn.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInput.value);
                    if (currentValue > 1) {
                        quantityInput.value = currentValue - 1;
                        console.log(`Quantity for ${card.querySelector('.bouquet-name').textContent} decreased to ${quantityInput.value}`);
                    }
                });

                plusBtn.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInput.value);
                    quantityInput.value = currentValue + 1;
                    console.log(`Quantity for ${card.querySelector('.bouquet-name').textContent} increased to ${quantityInput.value}`);
                });

                // Ensure direct input changes are handled
                quantityInput.addEventListener('change', () => {
                    let value = parseInt(quantityInput.value);
                    if (isNaN(value) || value < 1) {
                        quantityInput.value = 1; // Default to 1 if invalid
                    }
                    console.log(`Quantity for ${card.querySelector('.bouquet-name').textContent} manually set to ${quantityInput.value}`);
                });

            } else {
                console.warn('Quantity controls not found for a bouquet card.');
            }

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    const name = card.querySelector('.bouquet-name')?.textContent;
                    const priceText = card.querySelector('.bouquet-price')?.textContent;
                    const price = priceText ? parseFloat(priceText.replace(/[^\d.]/g, '')) : 0; // Robust price parsing
                    const image = card.querySelector('.bouquet-image')?.src;
                    const quantity = parseInt(quantityInput?.value) || 1; // Default to 1 if input missing/invalid

                    // Create a unique ID for the item, e.g., based on name
                    const id = 'bouquet-' + (name ? name.toLowerCase().replace(/\s/g, '-') : Date.now()); // Fallback ID

                    const product = { id, name, price, image, quantity };
                    console.log('Adding to cart:', product); // Log the product being added
                    addItemToCart(product);
                    alert(`${quantity} x ${name} added to cart!`);
                });
            } else {
                console.warn('Add to cart button not found for a bouquet card.');
            }
        });
    }

    // JavaScript for contact.html (Contact Page)
    if (currentPath.includes('contact.html')) {
        console.log('Running scripts for the contact page.');

        const contactForm = document.getElementById('contact-form'); // Assuming you have a form with this ID
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                alert('Message sent successfully! We will get back to you soon.');
                console.log('Contact form submitted!');
                contactForm.reset(); // Clear the form after submission
            });
        } else {
            console.warn('Contact form not found.');
        }
    }

    // JavaScript for about.html (About Us Page)
    if (currentPath.includes('about.html')) {
        console.log('Running scripts for the about us page.');
    }

    // JavaScript for plants.html (Plants Page) - Add similar logic if it exists
    // Assuming a similar structure to bouquets.html for listing products
    if (currentPath.includes('plants.html')) {
        console.log('Running scripts for the plants listing page.');

        // If plants.html uses a similar .bouquet-card structure:
        document.querySelectorAll('.plant-card').forEach(card => { // Assuming .plant-card for plant items
            const minusBtn = card.querySelector('.quantity-btn.minus');
            const plusBtn = card.querySelector('.quantity-btn.plus');
            const quantityInput = card.querySelector('.quantity-input');
            const addToCartBtn = card.querySelector('.add-to-cart-btn'); // Assuming same class for consistency

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
                quantityInput.addEventListener('change', () => {
                    let value = parseInt(quantityInput.value);
                    if (isNaN(value) || value < 1) {
                        quantityInput.value = 1;
                    }
                });
            }

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    const name = card.querySelector('.plant-name')?.textContent || 'Unknown Plant'; // Assuming .plant-name
                    const priceText = card.querySelector('.plant-price')?.textContent; // Assuming .plant-price
                    const price = priceText ? parseFloat(priceText.replace(/[^\d.]/g, '')) : 0;
                    const image = card.querySelector('.plant-image')?.src; // Assuming .plant-image
                    const quantity = parseInt(quantityInput?.value) || 1;

                    const id = 'plant-' + name.toLowerCase().replace(/\s/g, '-');
                    const product = { id, name, price, image, quantity };
                    addItemToCart(product);
                    alert(`${quantity} x ${name} added to cart!`);
                    console.log(`Added ${name} (Plant) to cart.`);
                });
            }
        });
    }
});
