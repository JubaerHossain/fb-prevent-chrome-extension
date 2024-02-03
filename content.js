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
    // Retrieve user preference from localStorage
    const hideReels = localStorage.getItem('hideReels') === 'true';

    // Get all elements with the specified class name
    const elements = document.querySelectorAll('.x1yztbdb');

    // Iterate through the elements
    elements.forEach(function (element) {
        // Check if the element's text content matches the pattern and hide if necessary
        if ((hideReels && textMatchesPattern(element.textContent)) || element.getAttribute('aria-label') === 'Reel') {
            hideElement(element);
        }
    });
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
        });
    } else {
        console.error('Invalid node or node does not support querySelectorAll');
    }
}

// Start observing changes in the entire document
observer.observe(document, { childList: true, subtree: true });

// Hide elements on initial page load
document.addEventListener('DOMContentLoaded', hideElements);
