// Check if userPreferences is already declared
if (typeof userPreferences === 'undefined') {
    // Initialize userPreferences object
    var userPreferences;
}

// Get user preferences from the script's dataset
if (typeof userPreferencesObj === 'undefined') {
    var userPreferencesObj = JSON.parse(document.querySelector('script[src*="disqusLoader.js"]').dataset.userPreferences);
    userPreferences = userPreferencesObj;
} else {
    userPreferences = userPreferencesObj;
}

// Set the Disqus shortname for your forum
var disqus_shortname = 'crcomments';

// Configure Disqus with the current page information
var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = window.location.pathname;
    this.page.title = document.title;

    // Custom configuration options
    this.language = userPreferences.language;
    this.theme = 'dark';  // Set theme to dark
    this.sort = userPreferences.sort;

    console.log("Disqus config set with URL:", this.page.url);
    console.log("Disqus language set to:", this.language);
    console.log("Disqus sort order set to:", this.sort);
};

// Function to handle errors during Disqus script loading
function handleDisqusError() {
    console.error("Failed to load Disqus embed script.");
    const disqusContainer = document.getElementById('disqus_thread');
    if (disqusContainer) {
        disqusContainer.innerHTML = '<p>Failed to load comments. Please try again later.</p>';
    }
}

// Function to dynamically load the Disqus embed script
function loadDisqus() {
    var d = document, s = d.createElement('script');
    s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());

    // Error handling
    s.onerror = handleDisqusError;

    // Append the script to the head or body of the document
    (d.head || d.body).appendChild(s);
    console.log("Disqus script appended to the body.");

    // Loading indicator enhancement
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.innerHTML += '<p>Loading comments...</p>';
    }
}

// Load Disqus
loadDisqus();