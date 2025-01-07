import { extractJobInfo } from "./jobs.js";

export function waitForElements(
  selectors,
  callback,
  retryInterval = 500,
  maxRetries = 10
) {
  let retries = 0;
  const interval = setInterval(() => {
    const jobInfo = extractJobInfo(selectors.information);
    const targetElement = document.querySelector(selectors.targetDiv);

    console.log("Try ", retries);
    if (jobInfo && targetElement) {
      clearInterval(interval);
      console.log("Job info extracted:", jobInfo);
      callback(jobInfo);
    } else if (retries >= maxRetries) {
      clearInterval(interval);
      console.error("Max retries reached. Job extraction failed");
    }

    retries++;
  }, retryInterval);
}

export function detectURLChange() {
  let currentURL = window.location.href;
  const observer = new MutationObserver(() => {
    if (currentURL !== window.location.href) {
      currentURL = window.location.href;
      setTimeout(() => startJobExtraction(), 1000);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
