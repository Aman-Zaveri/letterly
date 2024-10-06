const websiteSelectors = {
  linkedin: {
    urlPattern: "linkedin.com/jobs",
    information: {
      position:
        "div.job-details-jobs-unified-top-card__job-title h1.t-24.t-bold.inline",
      company:
        "div.job-details-jobs-unified-top-card__company-name a.app-aware-link",
      description: "#job-details > div",
    },
    jobContainer: "details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: "div.job-details-jobs-unified-top-card__top-buttons",
    buttonId: "plus-button-linkedin",
    buttonClass:
      "social-share__dropdown-trigger artdeco-button artdeco-button--3 artdeco-button--tertiary artdeco-button--circle artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view",
    buttonContainerClass:
      "artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view",
  },
  simplify: {
    urlPattern: "simplify.jobs/p/",
    information: {
      position: "p.text-left.text-xl.font-bold.text-secondary-400",
      company: "p.text-left.text-lg.font-bold.text-secondary-400",
      description: "div.mt-4:nth-of-type(2)",
    },
    jobContainer: "div.flex.flex-col.gap-8.lg\\:flex-row",
    targetDiv: "div.mt-2.flex.justify-end.gap-x-4.text-sm.text-gray-500",
    buttonId: "plus-button-simplify",
    buttonClass: "",
    buttonContainerClass: "",
  },
  indeed: {
    urlPattern: "indeed.com",
    information: {
      position: ".jobsearch-JobInfoHeader-title",
      company: ".jobsearch-InlineCompanyRating",
      description: ".jobsearch-JobMetadataHeader-item",
    },
    jobContainer: "details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: ".jobsearch-JobInfoHeader",
    buttonId: "plus-button-indeed",
    buttonClass: "plus-button-indeed",
    buttonContainerClass: "plus-button-linkedin-container",
  },
};

// Helper function to get the correct selectors based on the website
function getSelectorsForCurrentWebsite() {
  const currentURL = window.location.href;

  for (let site in websiteSelectors) {
    if (currentURL.includes(websiteSelectors[site].urlPattern)) {
      return websiteSelectors[site];
    }
  }
  return null;
}

function sendJobInfoToPopup(job_info) {
  console.log("Sending job info to popup:", job_info);
  chrome.runtime.sendMessage(
    {
      type: "job_info",
      jobDetails: {
        position: job_info.position,
        company: job_info.company,
        description: job_info.description,
      },
    },
    (response) => {
      if (chrome.runtime.lastError) {
        console.log("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Message sent successfully:", response);
      }
    }
  );

  // Store job info in local storage to retrieve later if popup is not open
  chrome.storage.sync.set({ job_info: job_info }, () => {
    console.log(job_info);
    if (chrome.runtime.lastError) {
      console.log("Error storing job info:", chrome.runtime.lastError);
    } else {
      console.log("Job info stored successfully");
    }
  });

  console.log("Job info sent to popup");
}

// Call this after extracting job info
function extractJobInformation(selectors) {
  console.log("Extracting job information...");
  let position = document.querySelector(selectors.position)?.innerText;
  position = position?.replace(/\s*\(.*?\)\s*/g, "").trim();

  const company = document.querySelector(selectors.company)?.innerText;
  let description = document.querySelector(selectors.description)?.innerText;

  const currentURL = window.location.href;
  if (currentURL.includes("simplify.jobs/p/")) {
    const keywordMatchIndex = description.indexOf("Keyword Match");
    if (keywordMatchIndex !== -1) {
      description = description.slice(0, keywordMatchIndex).trim();
    }
  }

  if (position && company && description) {
    const jobInfo = { position, company, description };
    console.log("Job info extracted:", jobInfo);
    sendJobInfoToPopup(jobInfo); // Send the job info to the popup
    return jobInfo;
  }
  return null;
}

// Combined wait function for both job information and target div
function waitForElements(
  selectors,
  callback,
  retryInterval = 500,
  maxRetries = 10
) {
  console.log("Waiting for elements...");
  let retries = 0;
  const interval = setInterval(() => {
    const jobInfo = extractJobInformation(selectors.information);
    const targetElement = document.querySelector(selectors.targetDiv);

    if (jobInfo && targetElement) {
      clearInterval(interval);
      console.log("Job info extracted:", jobInfo);
      callback(jobInfo);
    } else if (retries >= maxRetries) {
      clearInterval(interval);
    }
    retries++;
  }, retryInterval);
}

// Function to create and add a plus button
function addPlusButton(selectors, job_details) {
  console.log("Adding plus button...");
  const existingButton = document.querySelector("#" + selectors.buttonId);
  if (existingButton) {
    existingButton.remove();
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.id = selectors.buttonId;
  buttonContainer.className = selectors.buttonContainerClass;

  const button = document.createElement("button");
  button.className = selectors.buttonClass;

  const svgContainer = document.createElement("div");
  svgContainer.className = "plus-button-svg-container";
  svgContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>`;
  button.appendChild(svgContainer);
  buttonContainer.appendChild(button);

  const targetElement = document.querySelector(selectors.targetDiv);
  if (targetElement) {
    targetElement.insertBefore(buttonContainer, targetElement.firstChild);
  }

  button.addEventListener("click", () => {
    replaceButtonWithSpinner(selectors.buttonId, buttonContainer); // Replace button with spinner
    handleButtonClick(selectors.buttonId, job_details);
  });
}

// Function to replace button with loading spinner
function replaceButtonWithSpinner(buttonId, buttonContainer) {
  const button = document.querySelector("#" + buttonId + " button");
  if (button) {
    button.style.display = "none"; // Hide the button
  }

  let spinner = document.querySelector(".loading-spinner");
  if (!spinner) {
    spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    spinner.id = buttonId;
    spinner.innerHTML = `
      <svg class="spinner" width="24px" height="24px" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>`;
    buttonContainer.appendChild(spinner); // Add spinner in place of the button
  }
}

// Function to restore button after spinner is removed
function restoreButtonAfterSpinner(spinnerId) {
  const button = document.querySelector("#" + spinnerId + " button");
  const spinner = document.querySelector(".loading-spinner");

  if (spinner) {
    spinner.remove(); // Remove spinner
  }

  if (button) {
    button.style.display = "flex"; // Show the button again
  }
}

// Button click handler
function handleButtonClick(buttonId, job_details) {
  const button = document.querySelector("#" + buttonId + " button");
  if (!button) return; // Safety check to ensure the button exists

  // Disable the button to prevent multiple clicks
  button.disabled = true;

  // Show loading spinner while fetching
  replaceButtonWithSpinner(buttonId, button.parentElement);

  fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job_details),
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
      showToast(job_details, data.message); // Display success toast
    })
    .catch((error) => {
      showToast(job_details, error.message, true); // Display error toast with message
    })
    .finally(() => {
      // Re-enable the button after the request is complete
      button.disabled = false;
      restoreButtonAfterSpinner(buttonId); // Bring back the button
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "show_toast") {
    const jobDetails = request.details;
    const message = request.message;
    const error = request.error;

    // Call the showToast function to display the toast notification
    showToast(jobDetails, message, error);

    sendResponse({ status: "Toast shown" });
  }
});

function showToast(job_details, message, isError = false) {
  // Create a container for the toast
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";

  // Add an error class if it's an error
  if (isError) {
    toastContainer.classList.add("toast-error");
  } else {
    toastContainer.classList.add("toast-success");
  }

  // Create the content of the toast
  const toastContent = `
    <div class="toast">
      <div class="toast-header">
        <div class="toast-position" title="${job_details.position}">
          ${job_details.position}
        </div>
        <div class="toast-company" title="${job_details.company}">
          ${job_details.company}
        </div>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

  // Set the inner HTML of the container
  toastContainer.innerHTML = toastContent;

  // Append the toast to the body
  document.body.appendChild(toastContainer);

  // Trigger smooth entry after a short delay
  setTimeout(() => {
    toastContainer.classList.add("toast-show");
  }, 100);

  // Auto remove the toast after 5 seconds
  setTimeout(() => {
    toastContainer.classList.remove("toast-show"); // Start exit animation

    // After the animation duration, remove the toast from the DOM
    setTimeout(() => {
      toastContainer.remove();
    }, 700); // Match this to the exit transition time in CSS (0.4s)
  }, 5000); // Display for 5 seconds
}

// Detect URL changes and rerun extraction
function detectURLChange() {
  let currentURL = window.location.href;
  const observer = new MutationObserver(() => {
    if (currentURL !== window.location.href) {
      currentURL = window.location.href;
      setTimeout(() => startJobExtraction(), 1000);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Start job extraction and URL detection
function startJobExtraction() {
  const selectors = getSelectorsForCurrentWebsite();
  if (selectors) {
    waitForElements(selectors, (jobInfo) => addPlusButton(selectors, jobInfo));
  }
}

startJobExtraction();
detectURLChange();
