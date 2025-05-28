document.addEventListener('DOMContentLoaded', () => {
    
    
    const navToggleButton = document.getElementById('nav-toggle-button');
    const mainNav = document.getElementById('main-nav');

    if (navToggleButton && mainNav) {
        navToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggleButton.classList.toggle('active'); // Optional: style the button when active
        });
    }

    


    const currentPath = window.location.pathname;

    
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '/index.html') {
        console.log('Running scripts for the homepage.');

        
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

        

    }

    
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

    
    if (currentPath.includes('bouquets.html')) {
        console.log('Running scripts for the bouquets listing page.');

        const infoButtons = document.querySelectorAll('.info-btn');

        infoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const description = button.previousElementSibling; 
                if (description) {
                    description.classList.toggle('show'); 
                    if (description.classList.contains('show')) {
                        button.textContent = 'Hide Details';
                    } else {
                        button.textContent = 'Show Details';
                    }
                }
            });
        });
    }

    
    if (currentPath.includes('contact.html')) {
        console.log('Running scripts for the contact page.');

        // Example: Form submission handling
        const contactForm = document.getElementById('contact-form'); 
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                alert('Message sent successfully!');
                console.log('Contact form submitted!');
                t
                contactForm.reset(); // Clear the form after submission
            });
        }
    }
});

