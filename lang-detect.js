// ======================= LANGUAGE DETECTION & REDIRECT =======================
// This script detects the user's browser language and redirects to the appropriate
// language version of the site on first visit.

(function () {
    'use strict';

    // Helper function to safely check if localStorage is available
    function isLocalStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Helper function to safely get from localStorage
    function safeGetItem(key) {
        if (!isLocalStorageAvailable()) return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    // Helper function to safely set to localStorage
    function safeSetItem(key, value) {
        if (!isLocalStorageAvailable()) return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // Silently fail - preference won't be saved but site still works
        }
    }

    const STORAGE_KEY = 'lang-preference';
    const PORTUGUESE_CODES = ['pt', 'pt-BR', 'pt-PT'];

    // Check if user has already set a language preference
    const savedPreference = safeGetItem(STORAGE_KEY);
    if (savedPreference) {
        return; // Respect user's manual choice, don't redirect
    }

    // Get browser's preferred language
    const browserLang = navigator.language || navigator.userLanguage || '';

    // Check if user's browser is set to Portuguese
    const isPortuguese = PORTUGUESE_CODES.some(code =>
        browserLang.toLowerCase().startsWith(code.toLowerCase())
    );

    // Get current path to determine if we're on English or Portuguese version
    const currentPath = window.location.pathname;
    const isOnPortuguesePage = currentPath.startsWith('/pt/') || currentPath === '/pt';

    // Redirect logic:
    // - If browser is Portuguese AND we're on English page → redirect to Portuguese
    // - If browser is NOT Portuguese AND we're on Portuguese page → redirect to English
    if (isPortuguese && !isOnPortuguesePage) {
        // Build the Portuguese equivalent URL
        let ptPath = '/pt' + currentPath;

        // Handle root path special case
        if (currentPath === '/' || currentPath === '/index.html') {
            ptPath = '/pt/index.html';
        }

        // Save preference before redirect (they'll land on PT, meaning they want PT)
        safeSetItem(STORAGE_KEY, 'pt');

        // Use replace to not add to browser history (cleaner back button behavior)
        window.location.replace(ptPath);
    }
})();

// ======================= LANGUAGE SWITCHER PREFERENCE SAVING =======================
// This runs after DOM is loaded to attach click handlers to language switchers

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const STORAGE_KEY = 'lang-preference';

    // Helper function to safely set to localStorage
    function safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // Silently fail - preference won't be saved but navigation still works
        }
    }

    // Find all language switcher links
    const langSwitchers = document.querySelectorAll('.lang-switcher a');

    langSwitchers.forEach(function (switcher) {
        switcher.addEventListener('click', function () {
            const href = this.getAttribute('href');

            // Determine which language the user is switching TO
            if (href.includes('/pt/') || href === '/pt/' || href === '/pt') {
                safeSetItem(STORAGE_KEY, 'pt');
            } else {
                safeSetItem(STORAGE_KEY, 'en');
            }
        });
    });
});
