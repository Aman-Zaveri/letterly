function extractJobDetails() {
  // Select the position (h1 inside the div with the class that includes the job title)
  let position =
    document.querySelector(
      "div.job-details-jobs-unified-top-card__job-title h1.t-24.t-bold.inline"
    )?.innerText || "";

  // Select the organization from the div and a tag
  let organization =
    document.querySelector(
      "div.job-details-jobs-unified-top-card__company-name a.app-aware-link"
    )?.innerText || "";

  // Clean up the position by removing text inside parentheses
  position = position.replace(/\s*\(.*?\)\s*/g, "").trim();

  return { organization, position };
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getJobDetails") {
    const jobDetails = extractJobDetails();
    sendResponse(jobDetails);
  }
});

// Monitor for changes in the DOM using MutationObserver
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" || mutation.type === "subtree") {
      const jobDetails = extractJobDetails();

      // Check if job details have been populated, and you can stop observing if necessary
      if (jobDetails.organization && jobDetails.position) {
        observer.disconnect(); // Stop observing if you have what you need
      }
    }
  });
});

// Start observing the entire document for changes in the DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
