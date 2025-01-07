/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./popup.js ***!
  \******************/
document.addEventListener("DOMContentLoaded", function () {
  var positionInput = document.getElementById("position");
  var companyInput = document.getElementById("company");
  var descriptionInput = document.getElementById("description");
  var generateButton = document.getElementById("generate");
  console.log("Popup script loaded");
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function () {
    positionInput.value = "";
    companyInput.value = "";
    descriptionInput.value = "";
    updateStorage(); // Update storage to reflect the cleared inputs
  });

  // Listen for messages from content script
  chrome.storage.sync.get(["job_info"], function (result) {
    if (result.job_info) {
      var jobDetails = result.job_info;
      console.log("Retrieved job info from storage:", jobDetails);
      positionInput.value = jobDetails.position || "";
      companyInput.value = jobDetails.company || "";
      descriptionInput.value = jobDetails.description || "";
    }
  });

  // Update storage when inputs change
  var updateStorage = function updateStorage() {
    var jobDetails = {
      position: positionInput.value,
      company: companyInput.value,
      description: descriptionInput.value
    };
    chrome.storage.sync.set({
      job_info: jobDetails
    }, function () {
      console.log("Job info updated in storage:", jobDetails);
    });
  };
  positionInput.addEventListener("input", updateStorage);
  companyInput.addEventListener("input", updateStorage);
  descriptionInput.addEventListener("input", updateStorage);
  var replaceButtonWithSpinner = function replaceButtonWithSpinner() {
    generateButton.disabled = true; // Disable the button
    generateButton.innerHTML = "<svg class=\"spinner\" width=\"24px\" height=\"24px\" viewBox=\"0 0 50 50\">\n        <circle class=\"path\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"5\"></circle>\n      </svg>";
  };

  // Function to restore the original button after loading
  var restoreButton = function restoreButton() {
    generateButton.disabled = false; // Re-enable the button
    generateButton.innerHTML = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-move-right\">\n          <path d=\"M18 8L22 12L18 16\"/>\n          <path d=\"M2 12H22\"/>\n        </svg>";
  };

  // Handle "Generate" button click
  generateButton.addEventListener("click", function () {
    var jobDetails = {
      position: positionInput.value,
      company: companyInput.value,
      description: descriptionInput.value
    };
    replaceButtonWithSpinner();

    // Make API call or whatever logic needed with the job details
    fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobDetails)
    }).then(function (response) {
      // Check if the response status indicates an error
      if (!response.ok) {
        return response.json().then(function (data) {
          // Throw an error to be caught in the catch block
          throw new Error(data.error || "An unknown error occurred");
        });
      }
      return response.json(); // Parse the JSON if the response is okay
    }).then(function (data) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "show_toast",
          details: jobDetails,
          message: data.message,
          error: false
        });
      });
    })["catch"](function (error) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "show_toast",
          details: jobDetails,
          message: error.message,
          error: true
        });
      });
    })["finally"](function () {
      // Re-enable the button after the request is complete
      restoreButton();
    });
  });
});
/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map