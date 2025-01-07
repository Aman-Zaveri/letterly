export function showToast(jobDetails, message, isError = false) {
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
        <div class="toast-position" title="${jobDetails.position}">
          ${jobDetails.position}
        </div>
        <div class="toast-company" title="${jobDetails.company}">
          ${jobDetails.company}
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