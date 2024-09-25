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

function addPlusButton() {
  // Create the main div
  const dropdownDiv = document.createElement("div");
  dropdownDiv.id = "ember41";
  dropdownDiv.className =
    "artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view";

  // Create the button
  const button = document.createElement("button");
  button.id = "ember42";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Share");
  button.className =
    "social-share__dropdown-trigger artdeco-button artdeco-button--3 artdeco-button--tertiary artdeco-button--circle artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view";
  button.type = "button";
  button.tabIndex = 0;

  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", "0 0 448 512");
  svg.className = "artdeco-button__icon";
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0ea5e9" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>';

  // Create the span for button text
  const span = document.createElement("span");
  span.className = "artdeco-button__text";
  span.textContent = "Share";

  // Append SVG and span to the button
  button.appendChild(svg);
  button.appendChild(span);

  // Create the dropdown content div
  const dropdownContent = document.createElement("div");
  dropdownContent.id = "ember43";
  dropdownContent.setAttribute("aria-hidden", "true");
  dropdownContent.className =
    "social-share__content text-align-left artdeco-dropdown__content artdeco-dropdown--is-dropdown-element artdeco-dropdown__content--has-arrow artdeco-dropdown__content--arrow-right artdeco-dropdown__content--justification-right artdeco-dropdown__content--placement-bottom ember-view";
  dropdownContent.tabIndex = -1;

  // Append button and content to the main dropdown div
  dropdownDiv.appendChild(button);
  dropdownDiv.appendChild(dropdownContent);

  // Function to find the target div and insert the button
  function insertButton() {
    const targetDiv = document.querySelector(
      "#main > div > div.scaffold-layout__list-detail-inner.scaffold-layout__list-detail-inner--grow > div.scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details > div > div.jobs-search__job-details--container > div > div:nth-child(1) > div > div:nth-child(1) > div > div.relative.job-details-jobs-unified-top-card__container--two-pane > div > div.display-flex.align-items-center > div.job-details-jobs-unified-top-card__top-buttons"
    );

    if (targetDiv && !document.querySelector("#cover-letter-button")) {
      // Insert the plus button at the start of the target div
      targetDiv.insertBefore(dropdownDiv, targetDiv.firstChild);

      dropdownDiv.addEventListener("click", () => {
        const { organization, position, description } = extractJobDetails();

        fetch("http://localhost:5000/generate_cover_letter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization: organization,
            position: position,
            description: description,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });

      return true; // Button inserted
    }
    return false; // Target div not found yet
  }

  // Check if the target div is available immediately
  if (!insertButton()) {
    // If not available, set up a MutationObserver to wait for the target div
    const observer = new MutationObserver(() => {
      if (insertButton()) {
        observer.disconnect(); // Stop observing once the button is inserted
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
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
