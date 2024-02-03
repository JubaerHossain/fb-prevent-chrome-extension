document.addEventListener('DOMContentLoaded', function() {
    // Retrieve checkbox state from local storage and update UI
    var reelsToggle = document.getElementById('reelsToggle');
    var adsToggle = document.getElementById('adsToggle');

    reelsToggle.checked = localStorage.getItem('hideReels') === 'true';
    adsToggle.checked = localStorage.getItem('blockAds') === 'true';

    // Save checkbox state to local storage when the checkbox is changed
    reelsToggle.addEventListener('change', function() {
        localStorage.setItem('hideReels', reelsToggle.checked);
    });

    adsToggle.addEventListener('change', function() {
        localStorage.setItem('blockAds', adsToggle.checked);
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
