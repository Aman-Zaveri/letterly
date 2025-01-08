import { showToast } from "./toast.js";

export function addButton(selectors, jobDetails) {
  console.log("Adding button...");
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
  svgContainer.className = "svg-button-container";
  svgContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
  button.appendChild(svgContainer);
  buttonContainer.appendChild(button);

  const targetElement = document.querySelector(selectors.targetDiv);
  if (targetElement) {
    if (selectors.buttonId === "simplify-button") {
      targetElement.insertBefore(buttonContainer, targetElement.children[1]);
    } else {
      targetElement.insertBefore(buttonContainer, targetElement.firstChild);
    }
  } else {
    console.error("Target element not found. Button not added.");
  }

  button.addEventListener("click", () => {
    replaceWithSpinner(selectors.buttonId, buttonContainer); // Replace button with spinner
    handleClick(selectors.buttonId, jobDetails);
  });
}

function replaceWithSpinner(buttonId, buttonContainer) {
  const button = document.querySelector("#" + buttonId + " button");
  if (button) {
    button.style.display = "none"; // Hide the button
  }

  let spinner = document.querySelector(".spinner");
  if (!spinner) {
    spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.id = buttonId;
    spinner.innerHTML = `
      <svg viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>`;
    buttonContainer.appendChild(spinner); // Add spinner in place of the button
  }
}

function restoreButton(buttonId) {
  const button = document.querySelector("#" + buttonId + " button");
  const spinner = document.querySelector("#" + buttonId + ".spinner");

  if (spinner) {
    spinner.remove(); // Remove spinner
  }

  if (button) {
    button.style.display = "flex"; // Show the button again
  }
}

function handleClick(buttonId, jobDetails) {
  const button = document.querySelector("#" + buttonId + " button");
  if (!button) return; // Safety check to ensure the button exists

  // Disable the button to prevent multiple clicks
  button.disabled = true;

  // Show loading spinner while fetching
  replaceWithSpinner(buttonId, button.parentElement);

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
      showToast(jobDetails, data.message); // Display success toast
    })
    .catch((error) => {
      showToast(jobDetails, "Failed to connect to server", true); // Display error toast with message
    })
    .finally(() => {
      // Re-enable the button after the request is complete
      button.disabled = false;
      restoreButton(buttonId); // Bring back the button
    });
}
