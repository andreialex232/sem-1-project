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
/* === JAVASCRIPT FOR CHARACTER SLIDER === */

// Function to handle slider movement on button click
function scrollSlider(direction) {
    const sliderWrapper = document.getElementById('sliderWrapper');
    if (!sliderWrapper) return;

    // Get the first card to determine the scroll distance
    const firstCard = sliderWrapper.querySelector('.image-card');
    if (!firstCard) return;

    let cardWidth = firstCard.offsetWidth;
    const gap = 30; // Matches the gap value in your CSS

    // On screens smaller than 768px, we only move one card's width (plus the gap is 0 in flex)
    // On screens larger than 768px, we scroll one card's width plus the gap.

    let scrollAmount;
    if (window.innerWidth <= 768) {
        // Mobile view (1 card visible, uses flexbox, gap is effectively included in card width)
        // Since we are using CSS Scroll Snap on mobile, this manual scroll might interfere,
        // but for button control, we calculate the width without the gap since the CSS removes it.
        scrollAmount = cardWidth; 
    } else {
        // Desktop/Tablet view (3 cards visible)
        scrollAmount = cardWidth + gap;
    }

    // Scroll the wrapper by the calculated amount
    sliderWrapper.scrollLeft += direction * scrollAmount;
}

// Function to handle responsive visibility of arrows
const checkButtonVisibility = () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // On mobile (<= 768px), we rely on CSS Scroll Snap (swiping), so buttons are hidden.
    if (window.innerWidth <= 768) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    } else {
        // On desktop/tablet (> 768px), buttons are visible and active.
        if (prevButton) prevButton.style.display = 'flex';
        if (nextButton) nextButton.style.display = 'flex';
    }
};

// Initialize listeners when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for button display
    checkButtonVisibility();
    
    // Check again whenever the window is resized
    window.addEventListener('resize', checkButtonVisibility);
});