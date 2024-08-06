// Load user preferences and update the options UI
function loadOptions() {
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
            }
        }
    });
}

// Save user preferences to storage
function saveOptions() {
    var userPreferences = {
        language: document.getElementById('language').value,
        sort: document.getElementById('sort').value
    };

    chrome.storage.sync.set({ userPreferences: userPreferences }, function () {
        if (chrome.runtime.lastError) {
            console.error("Error saving user preferences:", chrome.runtime.lastError);
            document.getElementById('error-message').innerText = 'Error saving preferences.';
        } else {
            console.log("User preferences saved:", userPreferences);
            document.getElementById('error-message').innerText = '';
            alert('Preferences saved!');
        }
    });
}

// Add event listeners to load options on page load and save options on button click
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);