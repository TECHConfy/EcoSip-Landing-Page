/**
 * EcoSip Landing Page JavaScript
 * Handles form submission, cart functionality, theme switching, and mobile menu
 */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all interactive elements
    initializeMobileMenu();
    initializeContactForm();
    initializeCartSystem();
    initializeThemeToggle();

    /**
     * Sets up the mobile hamburger menu functionality
     */
    function initializeMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburger');
        const navigationMenu = document.getElementById('navBar');

        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navigationMenu.classList.toggle('active');
        });

        // Close menu when clicking navigation links
        navigationMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                hamburgerBtn.classList.remove('active');
                navigationMenu.classList.remove('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerBtn.contains(event.target) && !navigationMenu.contains(event.target)) {
                hamburgerBtn.classList.remove('active');
                navigationMenu.classList.remove('active');
            }
        });
    }

    /**
     * Sets up the contact form validation and submission
     */
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        const messageDisplay = document.getElementById('formMessage');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const userName = document.getElementById('name').value.trim();
            const userEmail = document.getElementById('email').value.trim();
            const userMessage = document.getElementById('message').value.trim();

            // Validate required fields
            if (!userName || !userEmail || !userMessage) {
                messageDisplay.textContent = "Please fill in all fields!";
                messageDisplay.style.color = "red";
                return;
            }

            // Validate email format
            if (!contactForm.checkValidity()) {
                messageDisplay.textContent = "Please enter a valid email address!";
                messageDisplay.style.color = "red";
                return;
            }

            // Success message
            messageDisplay.textContent = "Message sent successfully! We'll get back to you soon.";
            messageDisplay.style.color = "green";
            contactForm.reset();
        });
    }

   /**
    * Sets up the shopping cart functionality
    */
   function initializeCartSystem() {
       const addToCartButton = document.getElementById('addToCartBtn');
       const cartModal = document.getElementById('cartModal');
       const closeCartButton = document.getElementById('closeCart');
       const checkoutButton = document.getElementById('checkoutBtn');
       const confirmationModal = document.getElementById('confirmationModal');
       const closeConfirmButton = document.getElementById('closeConfirm');
       const cartItemsContainer = document.getElementById('cartItems');

       let shoppingCart = [];

       // Add item to cart
       addToCartButton.addEventListener('click', function() {
           shoppingCart.push({ name: "EcoSip Bottle", price: "$29.99" });
           refreshCartDisplay();
           cartModal.style.display = 'flex';
       });

       // Close cart modal
       closeCartButton.addEventListener('click', function() {
           cartModal.style.display = 'none';
       });

       /**
        * Updates the cart display with current items
        */
       function refreshCartDisplay() {
           cartItemsContainer.innerHTML = "";
           shoppingCart.forEach(function(item, itemIndex) {
               const itemElement = document.createElement('div');
               itemElement.classList.add('cart-item');
               itemElement.innerHTML = `
                   <p>${item.name} - ${item.price}</p>
                   <button class="remove-btn">Remove</button>
               `;

               itemElement.querySelector('.remove-btn').addEventListener('click', function() {
                   removeCartItem(itemIndex);
               });

               cartItemsContainer.appendChild(itemElement);
           });
       }

       /**
        * Removes an item from the cart
        * @param {number} itemIndex - Index of item to remove
        */
       function removeCartItem(itemIndex) {
           shoppingCart.splice(itemIndex, 1);
           refreshCartDisplay();
       }

       // Handle checkout
       checkoutButton.addEventListener('click', function() {
           cartModal.style.display = 'none';
           confirmationModal.style.display = 'flex';
       });

       // Close confirmation modal
       closeConfirmButton.addEventListener('click', function() {
           confirmationModal.style.display = 'none';
       });
   }


    /**
     * Sets up the dark/light theme toggle functionality
     */
    function initializeThemeToggle() {
        const themeToggleButton = document.getElementById('themeToggle');

        // Load saved theme preference or default to light
        const savedThemePreference = localStorage.getItem("theme") || "light";
        document.body.setAttribute("data-theme", savedThemePreference);

        updateThemeIcon(savedThemePreference);

        // Handle theme toggle clicks
        themeToggleButton.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.body.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });

        /**
         * Updates the theme toggle icon based on current theme
         * @param {string} theme - Current theme ('light' or 'dark')
         */
        function updateThemeIcon(theme) {
            const iconElement = themeToggleButton.querySelector("img");
            iconElement.src = theme === "dark" ? "moon.png" : "sun.png";
        }
    }

});