// Define your pattern here (e.g., "Reels and Short Videos")
const pattern = /Reels and Short Videos/i; // Case-insensitive pattern

// Function to hide elements
function hideElement(element) {
    element.style.display = 'none';
}

// Function to check if the text matches the pattern
function textMatchesPattern(text) {
    return pattern.test(text);
}

// Function to hide reels based on user preference
function hideElements() {
    // Retrieve user preferences from localStorage
    const hideReels = localStorage.getItem('hideReels') === 'true';
    const blockAds = localStorage.getItem('blockAds') === 'true';
    const hideSponsored = localStorage.getItem('hideSponsored') === 'true'; // New preference for sponsored posts


    // Get all elements with the specified class name
    const elements = document.querySelectorAll('.x1yztbdb');

    // Iterate through the elements
    elements.forEach(function (element) {
      console.log(element);
        // Check if the element's text content matches the pattern and hide if necessary
        if ((hideReels && textMatchesPattern(element.textContent)) || element.getAttribute('aria-label') === 'Reel') {
            hideElement(element);
        }
        
        // Check if the element represents an ad and hide if necessary
        if (blockAds && isAdElement(element)) {
            hideElement(element);
        }

        if (hideSponsored && isSponsoredPost(element)) {
          hideElement(element);
      }
    });
}

// Function to check if an element represents an ad
function isAdElement(element) {
    // Customize this function based on how you identify ads on Facebook
    // For example, you can check for specific classes, attributes, or text content
    return element.classList.contains('fbAdClass');
}

function isSponsoredPost(element) {
  // Customize this function based on how you identify sponsored posts on Facebook
  // For example, you can check for specific classes, attributes, or text content
  return element.classList.contains('sponsoredPostClass');
}

// Create a Mutation Observer to watch for changes in the DOM
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        // Check if nodes were added to the DOM
        if (mutation.addedNodes.length > 0) {
            // Iterate through the added nodes
            mutation.addedNodes.forEach(function (node) {
                shouldHideElement(node);
            });
        }
    });
});

// Function to check if the added node or its descendants match the criteria
function shouldHideElement(node) {
    if (node && typeof node.querySelectorAll === 'function') {
        const elements = node.querySelectorAll('.x1yztbdb');
        elements.forEach((item) => {
            if ((localStorage.getItem('hideReels') === 'true' && textMatchesPattern(item.textContent)) || item.getAttribute('aria-label') === 'Reel') {
                hideElement(item);
            }
            if (localStorage.getItem('blockAds') === 'true' && isAdElement(item)) {
                hideElement(item);
            }
            if (localStorage.getItem('hideSponsored') === 'true' && isSponsoredPost(item)) {
                hideElement(item);
            }
        });
    } else {
        console.error('Invalid node or node does not support querySelectorAll');
    }
}

// Start observing changes in the entire document
observer.observe(document, { childList: true, subtree: true });

// Hide elements on initial page load
document.addEventListener('DOMContentLoaded', hideElements);
