document.addEventListener("DOMContentLoaded", () => {
  const positionInput = document.getElementById("position");
  const companyInput = document.getElementById("company");
  const descriptionInput = document.getElementById("description");
  const generateButton = document.getElementById("generate");

  console.log("Popup script loaded");

  const clearButton = document.getElementById("clear");

  clearButton.addEventListener("click", () => {
    positionInput.value = "";
    companyInput.value = "";
    descriptionInput.value = "";
    updateStorage(); // Update storage to reflect the cleared inputs
  });

  // Listen for messages from content script
  chrome.storage.sync.get(["job_info"], (result) => {
    if (result.job_info) {
      const jobDetails = result.job_info;
      console.log("Retrieved job info from storage:", jobDetails);
      positionInput.value = jobDetails.position || "";
      companyInput.value = jobDetails.company || "";
      descriptionInput.value = jobDetails.description || "";
    }
  });

  // Update storage when inputs change
  const updateStorage = () => {
    const jobDetails = {
      position: positionInput.value,
      company: companyInput.value,
      description: descriptionInput.value,
    };
    chrome.storage.sync.set({ job_info: jobDetails }, () => {
      console.log("Job info updated in storage:", jobDetails);
    });
  };

  positionInput.addEventListener("input", updateStorage);
  companyInput.addEventListener("input", updateStorage);
  descriptionInput.addEventListener("input", updateStorage);

  const replaceButtonWithSpinner = () => {
    generateButton.disabled = true; // Disable the button
    generateButton.innerHTML = `<svg class="spinner" width="24px" height="24px" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>`;
  };

  // Function to restore the original button after loading
  const restoreButton = () => {
    generateButton.disabled = false; // Re-enable the button
    generateButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right">
          <path d="M18 8L22 12L18 16"/>
          <path d="M2 12H22"/>
        </svg>`;
  };

  // Handle "Generate" button click
  generateButton.addEventListener("click", () => {
    const jobDetails = {
      position: positionInput.value,
      company: companyInput.value,
      description: descriptionInput.value,
    };

    replaceButtonWithSpinner();

    // Make API call or whatever logic needed with the job details
    fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobDetails),
    })
      .then((response) => {
        // Check if the response status indicates an error
        if (!response.ok) {
          return response.json().then((data) => {
            // Throw an error to be caught in the catch block
            throw new Error(data.error || "An unknown error occurred");
          });
        }
        return response.json(); // Parse the JSON if the response is okay
      })
      .then((data) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "show_toast",
            details: jobDetails,
            message: data.message,
            error: false,
          });
        });
      })
      .catch((error) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "show_toast",
            details: jobDetails,
            message: error.message,
            error: true,
          });
        });
      })
      .finally(() => {
        // Re-enable the button after the request is complete
        restoreButton();
      });
  });
});
