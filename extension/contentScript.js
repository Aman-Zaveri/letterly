// Define a selectors object for each website
import { createIcons, icons } from "lucide";
createIcons({ icons });

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
    targetDiv: "div.job-details-jobs-unified-top-card__top-buttons", // Update to your actual target
    buttonClass:
      "social-share__dropdown-trigger artdeco-button artdeco-button--3 artdeco-button--tertiary artdeco-button--circle artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view", // Class for LinkedIn button
    buttonContainerClass:
      "artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view", // Class for LinkedIn button container
  },
  simplify: {
    urlPattern: "simplify.jobs/p",
    information: {
      position: "p.text-left.text-xl.font-bold.text-secondary-400",
      company: "p.text-left.text-lg.font-bold.text-secondary-400",
      description: "div.mt-4:nth-of-type(2)",
    },
    jobContainer: "#details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: ".header-buttons", // Update to your actual target
    buttonClass: "plus-button-simplify", // Class for Simplify button
    buttonContainerClass: "plus-button-linkedin-container",
  },
  indeed: {
    urlPattern: "indeed.com",
    information: {
      position: ".jobsearch-JobInfoHeader-title",
      company: ".jobsearch-InlineCompanyRating",
      description: ".jobsearch-JobMetadataHeader-item",
    },
    jobContainer: "details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: ".jobsearch-JobInfoHeader", // Update to your actual target
    buttonClass: "plus-button-indeed", // Class for Indeed button
    buttonContainerClass: "plus-button-linkedin-container",
  },
};

// Helper function to get the correct selectors based on the website
function getSelectorsForCurrentWebsite() {
  const currentURL = window.location.href;

  // Find the matching website based on the URL
  for (let site in websiteSelectors) {
    if (currentURL.includes(websiteSelectors[site].urlPattern)) {
      return websiteSelectors[site];
    }
  }

  // Return null if no matching website is found
  return null;
}

// Function to extract job information once all elements are loaded
function extractJobInformation(selectors) {
  let position = document.querySelector(selectors.position)?.innerText;
  position = position.replace(/\s*\(.*?\)\s*/g, "").trim();

  const company = document.querySelector(selectors.company)?.innerText;
  let description = document.querySelector(selectors.description)?.innerText;

  const currentURL = window.location.href;
  if (currentURL.includes("simplify.jobs")) {
    const keywordMatchIndex = description.indexOf("Keyword Match");
    if (keywordMatchIndex !== -1) {
      // Remove everything from "Keyword Match" onwards
      description = description.slice(0, keywordMatchIndex).trim();
    }
  }

  // Return an object containing the extracted information or null if any are undefined
  if (position && company && description) {
    return {
      position,
      company,
      description,
    };
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
  let retries = 0;

  const interval = setInterval(() => {
    const jobInfo = extractJobInformation(selectors.information);
    const targetElement = document.querySelector(selectors.targetDiv);

    console.log("Waiting for elements to load...");

    if (jobInfo && targetElement) {
      clearInterval(interval);
      callback(); // Call the callback to add the button and process job information
    } else if (retries >= maxRetries) {
      console.log("Failed to find elements after multiple attempts.");
      clearInterval(interval);
    }

    retries++;
  }, retryInterval); // Check every 'retryInterval' milliseconds
}

// Function to create and add a plus button
function addPlusButton(targetDiv, buttonClass, buttonContainerClass) {
  // Create a div to contain the button
  const buttonContainer = document.createElement("div");
  buttonContainer.className = buttonContainerClass; // Assign a class for the container based on the button class

  // Create the button
  const button = document.createElement("button");
  button.className = buttonClass; // Assign the specific class for styling
  button.appendChild('<i data-lucide="file-plus-2"></i>');

  // Append the button to the container
  buttonContainer.appendChild(button);

  // Add click event handler (if you have functionality to attach)
  button.addEventListener("click", () => {
    console.log("Plus button clicked!");
    // Add functionality here if needed
  });

  // Append the button to the target div
  const targetElement = document.querySelector(targetDiv);
  if (targetElement) {
    targetElement.insertBefore(buttonContainer, targetElement.firstChild);
  }
}

// Use the helper function to get the right selectors for the current website
function startJobExtraction() {
  const selectors = getSelectorsForCurrentWebsite();
  if (selectors) {
    // Wait for job information and target div to load
    waitForElements(selectors, () => {
      console.log("Selectors found for the current website:", selectors);
      addPlusButton(selectors.targetDiv, selectors.buttonClass); // Add the plus button
      console.log("Job Title:", selectors.information.position);
      console.log("Company Name:", selectors.information.company);
      console.log("Description:", selectors.information.description);
    });
  } else {
    console.log("No matching website or selectors found.");
  }
}

// Function to detect URL changes and rerun the script
function detectURLChange() {
  let currentURL = window.location.href;

  // Observe for URL changes (due to client-side routing)
  const observer = new MutationObserver(() => {
    if (currentURL !== window.location.href) {
      console.log("URL changed, running job information extraction...");
      currentURL = window.location.href;
      // Wait for a short period (e.g., 1000 milliseconds) before extracting job information
      setTimeout(() => {
        startJobExtraction(); // Re-run the script after the delay
      }, 1000); // Adjust the delay time as necessary
    }
  });

  // Observe changes to the body (URL or job content might change without full reload)
  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize the extraction process and URL change detection
startJobExtraction();
detectURLChange();
