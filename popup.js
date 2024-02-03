document.addEventListener('DOMContentLoaded', function() {
    // Retrieve checkbox state from local storage and update UI
    var reelsToggle = document.getElementById('reelsToggle');
    var adsToggle = document.getElementById('adsToggle');
    var hideSponsoredToggle = document.getElementById('hideSponsoredToggle');

    if (reelsToggle) {
        reelsToggle.checked = localStorage.getItem('hideReels') === 'true';
        reelsToggle.addEventListener('change', function() {
            localStorage.setItem('hideReels', reelsToggle.checked);
        });
    } else {
        console.error("Element with ID 'reelsToggle' not found in the document.");
    }

    if (adsToggle) {
        adsToggle.checked = localStorage.getItem('blockAds') === 'true';
        adsToggle.addEventListener('change', function() {
            localStorage.setItem('blockAds', adsToggle.checked);
        });
    } else {
        console.error("Element with ID 'adsToggle' not found in the document.");
    }

    if (hideSponsoredToggle) {
        hideSponsoredToggle.checked = localStorage.getItem('hideSponsored') === 'true';
        hideSponsoredToggle.addEventListener('change', function() {
            localStorage.setItem('hideSponsored', hideSponsoredToggle.checked);
        });
    } else {
        console.error("Element with ID 'hideSponsoredToggle' not found in the document.");
    }  

    // jQuery code
    $('#refresh').click(function() {
        chrome.tabs.reload();
    });
});
