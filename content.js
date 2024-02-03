// Define your pattern here (e.g., "Reels and Short Videos")
const pattern = /Reels and Short Videos/i; // Case-insensitive pattern

// Function to hide elements
function hideElement(element) {
  element.style.display = "none";
  console.log("Hide element with text: " + element.textContent);
}

// Function to check if the text matches the pattern
function textMatchesPattern(text) {
  return pattern.test(text);
}

// Function to hide elements on initial page load
function hideElementsByDefault() {
  // Get all elements with the specified class name
  const hideReels = localStorage.getItem("hideReels") === "true";
  if (hideReels) {
    const elements = document.querySelectorAll(".x1yztbdb");
    // Iterate through the elements
    elements.forEach(function (element) {
      // Check if the element's text content matches the pattern
      if (textMatchesPattern(element.textContent)) {
        // Hide the element
        hideElement(element);
      }
    });
  }
}

// Function to hide reels based on user preference
function hideReelsBasedOnPreference() {
  // Retrieve user preference from localStorage
  const hideReels = localStorage.getItem("hideReels") === "true";
  if (hideReels) {
    // Get all elements with the specified class name
    const reels = document.querySelectorAll('[aria-label="Reel"]');
    // Iterate through the elements
    reels.forEach(function (reel) {
      // Hide the reel
      hideElement(reel);
    });
  }
}

// Function to hide ads and sponsored content
function hideAdsAndSponsoredContent() {
  const ads = document.querySelectorAll('[data-ad-preview="message"]');
  const sponsored = document.querySelectorAll('[data-pagelet^="FeedUnit"]');

  const blockAds = localStorage.getItem("blockAds") === "true";
  const hideSponsored = localStorage.getItem("hideSponsored") === "true";

  if (blockAds) {
    ads.forEach((ad) => hideElement(ad));
  }
  if (hideSponsored) {
    sponsored.forEach((sponsoredContent) => hideElement(sponsoredContent));
  }
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
  if (node && typeof node.querySelectorAll === "function") {
    var elements = node.querySelectorAll(".x1yztbdb");
    elements.forEach((item) => {
      if (textMatchesPattern(item.textContent)) {
        // Hide the element
        hideElement(item);
      }
    });
    hideAdsAndSponsoredContent();
  } else {
    console.error("Invalid node or node does not support querySelectorAll");
  }
}

// Start observing changes in the entire document
observer.observe(document, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", function () {
  hideElementsByDefault();
  hideReelsBasedOnPreference();
  hideAdsAndSponsoredContent();
});
