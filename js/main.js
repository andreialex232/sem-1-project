document.addEventListener("DOMContentLoaded", () => {
  // Elements we will interact with
  const body = document.body; // Store this so we have to write less code below. Same with the 3 below
  const menuToggle = document.getElementById("menu-toggle"); // Hamburger button
  const closeButton = document.getElementById("close-button"); // 'X' button
  const mobileOverlay = document.getElementById("mobile-overlay"); // Overlay area

  // The class that controls the open state.
  const OPEN_CLASS = "menu-is-open"; // Name of the class that indicates menu is open

  // Function to close the menu
  const closeMenu = () => {
    body.classList.remove(OPEN_CLASS); // Remove the class to close the menu
  };

  // Function to open the menu
  const openMenu = () => {
    body.classList.add(OPEN_CLASS); // Add the class to open the menu
  };

  // 1. Toggle button (Hamburger click)
  if (menuToggle) {
    // Check if the element exists
    menuToggle.addEventListener("click", () => {
      // On click event for HTML element(tracks the user clicking)
      // Check the state and toggle
      if (body.classList.contains(OPEN_CLASS)) {
        // If the menu is open
        closeMenu(); // Close it
      } else {
        // If the menu is closed
        openMenu(); // Open it
      }
    });
  }

  // 2. 'X' button click
  if (closeButton) {
    // Check if the element exists - good practice to avoid errors and bugs
    closeButton.addEventListener("click", closeMenu); // On click event for the close button
  }

  // 3. Click outside (on the overlay)
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMenu);
  }

  // Optional: Close menu when a link is clicked
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    // Select all(loop) links inside the mobile menu
    link.addEventListener("click", closeMenu); // On click event for each link inside the mobile menu
  });
});


// Slider Functionality 

document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const imageCards = Array.from(
    sliderWrapper ? sliderWrapper.querySelectorAll(".image-card") : []
  );

  if (!sliderWrapper || imageCards.length === 0) return;

  let currentSlideIndex = 0;

    // Transition from CSS
  sliderWrapper.style.transition = "transform 0.5s ease-in-out";

  // Function to get the STEP WIDTH (Card + Gap)
  const getSlideStepWidth = () => {
    const card = imageCards[0];
    if (!card) return 0;

    // We use the element width as a reference
    const cardWidth = card.offsetWidth;

    // Read the gap (may change due to media queries)
    const gap = parseFloat(getComputedStyle(sliderWrapper).gap) || 30;
    return cardWidth + gap;
  };

  const getVisibleCardsCount = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) return 1;
    if (viewportWidth <= 992) return 2;
    return 3;
  };

  const updateSliderPosition = () => {
    const slideStep = getSlideStepWidth();
    const translation = -currentSlideIndex * slideStep;
    sliderWrapper.style.transform = `translateX(${translation}px)`;

    updateButtonState();
  };

  const updateButtonState = () => {
    const visibleCount = getVisibleCardsCount();
    const totalCards = imageCards.length;
    const maxIndex = totalCards - visibleCount;

    // Disable buttons to prevent empty scrolling
    prevButton.disabled = currentSlideIndex <= 0;
    nextButton.disabled = currentSlideIndex >= maxIndex;
  };

  const slideNext = () => {
    const visibleCount = getVisibleCardsCount();
    const totalCards = imageCards.length;
    const maxIndex = totalCards - visibleCount;

    if (currentSlideIndex < maxIndex) {
      currentSlideIndex++;
      updateSliderPosition();
    }
  };

  const slidePrev = () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSliderPosition();
    }
  };

  // Attaching events
  nextButton.addEventListener("click", slideNext);
  prevButton.addEventListener("click", slidePrev);

  // Adjust when resizing
  window.addEventListener("resize", () => {
    const visibleCount = getVisibleCardsCount();
    const maxIndex = imageCards.length - visibleCount;
    currentSlideIndex = Math.min(currentSlideIndex, Math.max(0, maxIndex));
    updateSliderPosition();
  });

  // Initialization
  updateSliderPosition();
});
