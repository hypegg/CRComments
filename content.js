// Variable to track if Disqus has already been initialized
let disqusInitialized = false;

// Function to insert the Disqus comment section into the page
function insertDisqusSection() {
    // Select the element containing media info
    const mediaInfoElement = document.querySelector('.erc-current-media-info');
    // Check if the Disqus container already exists
    const disqusContainerExists = document.querySelector('#disqus_thread');

    if (mediaInfoElement && !disqusContainerExists) {
        console.log("Media info element found:", mediaInfoElement);

        // Create a new div element for the Disqus comments
        const disqusContainer = document.createElement('div');
        disqusContainer.id = 'disqus_thread';

        // Create and add a loading spinner while Disqus loads
        const loadingSpinner = document.createElement('div');
        loadingSpinner.id = 'loadingSpinner';
        loadingSpinner.innerHTML = '<img src="' + chrome.runtime.getURL('images/spinner.png') + '" alt="Loading...">';
        disqusContainer.appendChild(loadingSpinner);

        // Insert the Disqus container after the media info element
        mediaInfoElement.parentNode.insertBefore(disqusContainer, mediaInfoElement.nextSibling);
        console.log("Disqus container inserted.");

        // Load the Disqus script
        loadDisqusScript();
        // Modify the page style to accommodate the Disqus section
        modifyStyle();
        // Mark Disqus as initialized
        disqusInitialized = true;
    } else {
        console.log("Media info element not found or Disqus container already exists.");
    }
}

// Function to insert the Disqus comment section into the anime title page
function insertDisqusSectionOnTitlePage() {
    // Select the element that starts with "erc-season-"
    const seasonElement = document.querySelector('div[class^="erc-season-"]');
    // Check if the Disqus container already exists
    const disqusContainerExists = document.querySelector('#disqus_thread');

    if (seasonElement && !disqusContainerExists) {
        console.log("Season navigation element found:", seasonElement);

        // Create a new div element for the Disqus comments
        const disqusContainer = document.createElement('div');
        disqusContainer.id = 'disqus_thread';

        // Create and add a loading spinner while Disqus loads
        const loadingSpinner = document.createElement('div');
        loadingSpinner.id = 'loadingSpinner';
        loadingSpinner.innerHTML = '<img src="' + chrome.runtime.getURL('images/spinner.png') + '" alt="Loading...">';
        disqusContainer.appendChild(loadingSpinner);

        // Insert the Disqus container after the season element
        seasonElement.parentNode.insertBefore(disqusContainer, seasonElement.nextSibling);
        console.log("Disqus container inserted on title page.");

        // Load the Disqus script
        loadDisqusScript();
        // Modify the page style to accommodate the Disqus section
        modifyStyle();
        // Mark Disqus as initialized
        disqusInitialized = true;
    } else {
        console.log("Season navigation element not found or Disqus container already exists.");
    }
}

// Function to load the Disqus script dynamically
function loadDisqusScript() {
    console.log("Attempting to load Disqus script...");

    // Add a delay before loading the Disqus script
    setTimeout(() => {
        const script = document.createElement('script');
        // Use chrome.runtime.getURL to get the path to disqusLoader.js
        script.src = chrome.runtime.getURL('disqusLoader.js');
        script.onload = () => {
            console.log("Disqus loader script loaded successfully.");
            // Hide the loading spinner once the script is loaded
            document.getElementById('loadingSpinner').style.display = 'none';
        };
        script.onerror = () => {
            console.error("Failed to load Disqus loader script.");
        };

        // Append the script to the head of the document
        document.head.appendChild(script);
        console.log("Disqus loader script appended to the head.");

        // Get user preferences from storage
        chrome.storage.sync.get(['userPreferences'], function (result) {
            if (chrome.runtime.lastError) {
                console.error("Error retrieving user preferences:", chrome.runtime.lastError);
            } else {
                const userPreferences = result.userPreferences;
                // Pass user preferences to the disqusLoader script
                const disqusLoaderScript = document.querySelector('script[src*="disqusLoader.js"]');
                disqusLoaderScript.dataset.userPreferences = JSON.stringify(userPreferences);
            }
        });
    }, 2000); // Add a 2-second delay
}

// Function to modify the style of the current media wrapper to fit the Disqus section
function modifyStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .current-media-wrapper {
            display: flex;
            flex-direction: column;
        }
    `;
    document.head.appendChild(style);
    console.log("Style modified for current-media-wrapper.");
}

// Function to debounce the execution of a function
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

// Function to observe changes in the DOM and reinsert the Disqus section if necessary
function observeDOMChanges() {
    // Create a new MutationObserver instance with a callback function to handle DOM changes
    const observer = new MutationObserver(debounce((mutations) => {
        for (const mutation of mutations) {
            // Check if any nodes were added or removed
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                const mediaInfoElement = document.querySelector('.erc-current-media-info');
                const seasonElement = document.querySelector('div[class^="erc-season-"]');

                // Insert Disqus section on media info change
                if (mediaInfoElement && !document.querySelector('#disqus_thread')) {
                    console.log("Relevant DOM mutation detected on media info. Reloading Disqus section.");
                    insertDisqusSection();
                }

                // Insert Disqus section on season element change
                if (seasonElement && !document.querySelector('#disqus_thread')) {
                    console.log("Relevant DOM mutation detected on season navigation. Reloading Disqus section.");
                    insertDisqusSectionOnTitlePage();
                }
            }
        }
    }, 1000)); // Debounce to limit the frequency of function calls

    // Start observing changes in the document body and its descendants
    observer.observe(document.body, {
        childList: true, // Observe direct child node changes
        subtree: true   // Observe all descendant node changes
    });

    console.log("Mutation observer set up on document body.");
}

// Function to load and display the welcome overlay
function loadWelcomeOverlay() {
    console.log("Loading welcome overlay script.");

    const welcomeOverlayScript = document.createElement('script');
    welcomeOverlayScript.src = chrome.runtime.getURL('welcomeOverlay.js');
    document.head.appendChild(welcomeOverlayScript);
}

// Initialization function to set up the Disqus comments and DOM observer
function initialize() {
    console.log("Initializing Disqus comments setup.");
    insertDisqusSection();
    insertDisqusSectionOnTitlePage();
    observeDOMChanges();
    console.log("Disqus comments setup completed.");

    // Check if the user has already seen the welcome overlay
    chrome.storage.sync.get(['hasSeenWelcomeOverlay'], function (result) {
        if (!result.hasSeenWelcomeOverlay) {
            loadWelcomeOverlay();
        }
    });

    // Function to set the hasSeenWelcomeOverlay value
    function setHasSeenWelcomeOverlay() {
        chrome.storage.sync.set({ hasSeenWelcomeOverlay: true }, () => {
            // Do something after the value is set
        });
    }

    // Listen for the custom event
    document.addEventListener('setHasSeenWelcomeOverlay', () => {
        // Set the value in chrome.storage
        chrome.storage.sync.set({ hasSeenWelcomeOverlay: true }, () => {
            // Do something after the value is set
        });
    });
}

// Add an event listener to initialize the script after the page fully loads
window.addEventListener('load', function () {
    console.log("Page fully loaded. Initializing Disqus comments.");
    setTimeout(initialize, 1000);
});

// Listen for messages from the welcome overlay
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'hideWelcomeOverlay') {
        setHasSeenWelcomeOverlay();
    }
});