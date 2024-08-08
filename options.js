// Get references to the toast notification elements
const toast = document.getElementById("toast");
const closeIcon = document.getElementById("close-icon");
const progress = document.getElementById("progress");

// Load user preferences and update the options UI
function loadOptions() {
    // Get user preferences from Chrome storage
    chrome.storage.sync.get(['userPreferences'], function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving user preferences:", chrome.runtime.lastError);
            document.getElementById('error-message').innerText = 'Error loading preferences.';
        } else {
            if (result.userPreferences) {
                console.log("Loaded user preferences in options page:", result.userPreferences);
                document.getElementById('language').value = result.userPreferences.language;
                document.getElementById('sort').value = result.userPreferences.sort;
            } else {
                console.log("No user preferences found in storage.");
                // Handle the case where user preferences are not found
                document.getElementById('language').value = 'en';
                document.getElementById('sort').value = 'best';
            }
        }
    });
}

// Save user preferences to storage
function saveOptions() {
    // Get the current values of the language and sort options
    const language = document.getElementById('language').value;
    const sort = document.getElementById('sort').value;

    // Validate user input
    if (!language || !sort) {
        console.error("Invalid user input");
        document.getElementById('error-message').innerText = 'Invalid input. Please select a language and sort order.';
        return;
    }

    const userPreferences = {
        language,
        sort
    };

    // Save the user preferences to Chrome storage
    chrome.storage.sync.set({ userPreferences: userPreferences }, function () {
        if (chrome.runtime.lastError) {
            console.error("Error saving user preferences:", chrome.runtime.lastError);
            document.getElementById('error-message').innerText = 'Error saving preferences.';
        } else {
            console.log("User preferences saved:", userPreferences);
            document.getElementById('error-message').innerText = '';

            // Show toast notification
            toast.classList.add("active");
            progress.classList.add("active");

            // Hide toast notification and progress bar after 5 seconds
            setTimeout(() => {
                toast.classList.remove("active");
                progress.classList.remove("active");
            }, 5000);
        }
    });
}

// Close toast notification when close icon is clicked
closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
    progress.classList.remove("active");
});

// Add event listeners to load options on page load and save options on button click
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);