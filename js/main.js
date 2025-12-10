document.addEventListener('DOMContentLoaded', () => {
  // Elements we will interact with
  const body = document.body; // Store this so we have to write less code below. Same with the 3 below
  const menuToggle = document.getElementById('menu-toggle'); // Hamburger button
  const closeButton = document.getElementById('close-button'); // 'X' button
  const mobileOverlay = document.getElementById('mobile-overlay'); // Overlay area

  // The class that controls the open state.
  const OPEN_CLASS = 'menu-is-open'; // Name of the class that indicates menu is open

  // Function to close the menu
  const closeMenu = () => {
      body.classList.remove(OPEN_CLASS); // Remove the class to close the menu
  };

  // Function to open the menu
  const openMenu = () => {
      body.classList.add(OPEN_CLASS); // Add the class to open the menu
  };
  
  // 1. Toggle button (Hamburger click)
  if (menuToggle) { // Check if the element exists
      menuToggle.addEventListener('click', () => { // On click event for HTML element(tracks the user clicking)
          // Check the state and toggle
          if (body.classList.contains(OPEN_CLASS)) { // If the menu is open
              closeMenu(); // Close it
          } else { // If the menu is closed
              openMenu(); // Open it
          }
      });
  }

  // 2. 'X' button click
  if (closeButton) { // Check if the element exists - good practice to avoid errors and bugs
      closeButton.addEventListener('click', closeMenu); // On click event for the close button
  }

  // 3. Click outside (on the overlay)
  if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMenu);
  }
  
  // Optional: Close menu when a link is clicked
  document.querySelectorAll('#mobile-menu a').forEach(link => { // Select all(loop) links inside the mobile menu
      link.addEventListener('click', closeMenu); // On click event for each link inside the mobile menu
  });
}); 





// Slider Logic
    document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const sliderDotsContainer = document.getElementById('sliderDots');
    const cards = document.querySelectorAll('.image-card');

    if (!sliderWrapper || !prevButton || !nextButton || cards.length === 0) return;

    // Configuration
    const cardsPerView = 3;
    const totalCards = cards.length;
    // Calculate total possible slides. Since we show 3, for 6 cards, we have 4 slides (0, 1, 2, 3) 
    // to show: (1-3), (2-4), (3-5), (4-6).
    // Or, if we want to show 3 full slides: (1-3), (4-6). This gives 2 slides.
    // Let's assume we want to scroll one card at a time, but only enable scrolling up to the last visible card.
    const maxSlides = totalCards - cardsPerView; 
    let currentSlide = 0; // Tracks the index of the first visible card

    // --- Core Calculations ---
    const getCardMovementOffset = () => {
        // Must wait for card layout to be rendered to get accurate size
        const firstCard = cards[0];
        const cardWidth = firstCard.offsetWidth;
        // Get the gap value (30px from CSS)
        const wrapperStyle = window.getComputedStyle(sliderWrapper);
        const gap = parseFloat(wrapperStyle.gap) || 30; 

        // The distance to move one card is its width plus the gap to the next card.
        return cardWidth + gap;
    };



    // --- Sliding Logic ---
    const updateSliderPosition = () => {
        const offset = getCardMovementOffset();
        // Move the wrapper left by the current slide index multiplied by the card-plus-gap offset.
        // We use translateX for smoother performance, although manipulating 'left' works with 'transition: left 0.5s'
        sliderWrapper.style.left = `-${currentSlide * offset}px`;

        // Update dot visibility
        updateDots();
        // Update button state
        updateButtonState();
    };

    // --- Button Handlers ---
    const nextSlide = () => {
        if (currentSlide < maxSlides) {
            currentSlide++;
            updateSliderPosition();
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSliderPosition();
        }
    };

    const updateButtonState = () => {
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide >= maxSlides;
        
        // Optional: Change opacity/style for disabled buttons
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentSlide >= maxSlides ? '0.5' : '1';
    };

    // --- Dots Logic ---
    const generateDots = () => {
        // The number of dots should equal the number of possible slides (maxSlides + 1)
        const dotCount = maxSlides + 1;
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slideIndex = i; // Store the slide index in the data attribute
            
            // Add click listener to move to the corresponding slide
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSliderPosition();
            });

            sliderDotsContainer.appendChild(dot);
        }
    };

    const updateDots = () => {
        const dots = sliderDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    };

    // --- Initialization ---
    generateDots();
    updateSliderPosition(); // Set initial position and dot/button state

    // Attach event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Optional: Recalculate on window resize to ensure responsiveness
    window.addEventListener('resize', updateSliderPosition);
});