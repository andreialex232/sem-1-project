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
 const slider = document.getElementById('sliderWrapper');
        const scrollAmount = 390; // Latimea cardului (360px) + Gap (30px)

        /**
         * Glisează conținutul slider-ului orizontal.
         * @param {number} direction - 1 pentru NEXT (dreapta), -1 pentru PREV (stânga).
         */
        function scrollSlider(direction) {
            slider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }