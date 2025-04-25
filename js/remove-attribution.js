// Script to remove "Made with Manus" attribution
document.addEventListener('DOMContentLoaded', function() {
    // Initial removal
    removeAttribution();
    
    // Set up a MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver(function(mutations) {
        removeAttribution();
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Function to remove attribution elements
    function removeAttribution() {
        // Target elements by various selectors that might match the attribution
        const selectors = [
            'a[href*="manus.space"]',
            'a[href*="Create my website"]',
            '[class*="manus"]',
            '[id*="manus"]',
            'a:contains("Made with Manus")',
            'div:contains("Made with Manus")',
            'span:contains("Made with Manus")'
        ];
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el.textContent.includes('Made with Manus') || 
                        el.href?.includes('manus.space') ||
                        el.className?.includes('manus')) {
                        el.style.display = 'none';
                        el.remove();
                    }
                });
            } catch (e) {
                // Ignore errors for invalid selectors
            }
        });
    }
    
    // Also run on window load to catch elements added during page load
    window.addEventListener('load', removeAttribution);
    
    // Run periodically to catch any elements that might be added later
    setInterval(removeAttribution, 1000);
});
