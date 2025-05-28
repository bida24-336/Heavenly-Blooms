document.addEventListener('DOMContentLoaded', () => {
    const navToggleButton = document.getElementById('nav-toggle-button');
    const mainNav = document.getElementById('main-nav');

    if (navToggleButton && mainNav) {
        navToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggleButton.classList.toggle('active');
        });
    }

    const currentPath = window.location.pathname;

    if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '/index.html') {
        console.log('Running scripts for the homepage.');

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

    if (currentPath.includes('driedflowers.html') || currentPath.includes('dried_flower.html')) {
        console.log('Running scripts for the dried flowers product page.');

        const mainProductImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');

        if (mainProductImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    mainProductImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
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

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('Message sent successfully!');
                console.log('Contact form submitted!');
                contactForm.reset();
            });
        }
    }

    // === START of Feedback Page JavaScript ===
    if (currentPath.includes('feedback.html')) {
        console.log('Running scripts for the feedback page.');
        const feedbackForm = document.getElementById('feedbackForm');
        const thankYouMessage = document.getElementById('thankYouMessage');

        if (feedbackForm) {
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                feedbackForm.classList.add('d-none'); // Hide the form
                thankYouMessage.classList.remove('d-none'); // Show the thank you message

                setTimeout(() => {
                    feedbackForm.reset(); // Reset form fields
                    feedbackForm.classList.remove('d-none'); // Show the form again
                    thankYouMessage.classList.add('d-none'); // Hide thank you message
                }, 5000); // Reset after 5 seconds
            });
        }

        // Star rating hover effect
        const stars = document.querySelectorAll('.rating-stars label');
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const value = this.htmlFor.replace('star', '');
                highlightStars(value);
            });

            star.addEventListener('mouseout', function() {
                const checked = document.querySelector('.rating-stars input:checked');
                if (checked) {
                    highlightStars(checked.value);
                } else {
                    resetStars();
                }
            });
        });

        function highlightStars(value) {
            const stars = document.querySelectorAll('.rating-stars label');
            stars.forEach(star => {
                const starValue = star.htmlFor.replace('star', '');
                if (starValue <= value) {
                    star.querySelector('i').classList.replace('far', 'fas');
                } else {
                    star.querySelector('i').classList.replace('fas', 'far');
                }
            });
        }

        function resetStars() {
            const stars = document.querySelectorAll('.rating-stars label');
            stars.forEach(star => {
                star.querySelector('i').classList.replace('fas', 'far');
            });
        }
    }
    // === END of Feedback Page JavaScript ===
});
