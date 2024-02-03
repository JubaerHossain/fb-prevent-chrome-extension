document.addEventListener('DOMContentLoaded', function() {
    // Retrieve checkbox state from local storage and update UI
    var reelsToggle = document.getElementById('reelsToggle');
    var adsToggle = document.getElementById('adsToggle');
    var hideSponsoredToggle = document.getElementById('hideSponsoredToggle');

    reelsToggle.checked = localStorage.getItem('hideReels') === 'true';
    adsToggle.checked = localStorage.getItem('blockAds') === 'true';
    hideSponsoredToggle.checked = localStorage.getItem('hideSponsored') === 'true';

    // Save checkbox state to local storage when the checkbox is changed
    reelsToggle.addEventListener('change', function() {
        localStorage.setItem('hideReels', reelsToggle.checked);
    });

    adsToggle.addEventListener('change', function() {
        localStorage.setItem('blockAds', adsToggle.checked);
    });

    hideSponsoredToggle.addEventListener('change', function() {
        localStorage.setItem('hideSponsored', hideSponsoredToggle.checked);
    });

    var reels = document.querySelectorAll('[aria-label="Reel"]'); // Assuming reels are identified by aria-label attribute
   if (reels.length > 0) {
       reels.forEach(function(reel) {
           reel.style.display = 'none';
       });
   }

   $('#refresh').click(function() {
       chrome.tabs.reload();
   });
});
