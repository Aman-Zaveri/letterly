function extractJobDetails() {
  let position =
    document.querySelector(
      "div.job-details-jobs-unified-top-card__job-title h1.t-24.t-bold.inline"
    )?.innerText || "";
  position = position.replace(/\s*\(.*?\)\s*/g, "").trim();

  let organization =
    document.querySelector(
      "div.job-details-jobs-unified-top-card__company-name a.app-aware-link"
    )?.innerText || "";

  let description =
    document.querySelector("#job-details > div")?.innerText || "";

  return { organization, position, description };
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

      // Check if job details have been populated
      if (jobDetails.organization && jobDetails.position) {
        observer.disconnect(); // Stop observing if necessary
      }
    }
  });
});

// Start observing the entire document for changes in the DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Add the plus button to the page
addPlusButton();
