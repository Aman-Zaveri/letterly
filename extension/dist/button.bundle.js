/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./functions/toast.js":
/*!****************************!*\
  !*** ./functions/toast.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showToast: () => (/* binding */ showToast)
/* harmony export */ });
function showToast(jobDetails, message) {
  var isError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // Create a container for the toast
  var toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";

  // Add an error class if it's an error
  if (isError) {
    toastContainer.classList.add("toast-error");
  } else {
    toastContainer.classList.add("toast-success");
  }

  // Create the content of the toast
  var toastContent = "\n    <div class=\"toast\">\n      <div class=\"toast-header\">\n        <div class=\"toast-position\" title=\"".concat(jobDetails.position, "\">\n          ").concat(jobDetails.position, "\n        </div>\n        <div class=\"toast-company\" title=\"").concat(jobDetails.company, "\">\n          ").concat(jobDetails.company, "\n        </div>\n      </div>\n      <div class=\"toast-body\">\n        ").concat(message, "\n      </div>\n    </div>\n  ");

  // Set the inner HTML of the container
  toastContainer.innerHTML = toastContent;

  // Append the toast to the body
  document.body.appendChild(toastContainer);

  // Trigger smooth entry after a short delay
  setTimeout(function () {
    toastContainer.classList.add("toast-show");
  }, 100);

  // Auto remove the toast after 5 seconds
  setTimeout(function () {
    toastContainer.classList.remove("toast-show"); // Start exit animation

    // After the animation duration, remove the toast from the DOM
    setTimeout(function () {
      toastContainer.remove();
    }, 700); // Match this to the exit transition time in CSS (0.4s)
  }, 5000); // Display for 5 seconds
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./functions/button.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addButton: () => (/* binding */ addButton)
/* harmony export */ });
/* harmony import */ var _toast_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toast.js */ "./functions/toast.js");

function addButton(selectors, jobDetails) {
  console.log("Adding button...");
  var existingButton = document.querySelector("#" + selectors.buttonId);
  if (existingButton) {
    existingButton.remove();
  }
  var buttonContainer = document.createElement("div");
  buttonContainer.id = selectors.buttonId;
  buttonContainer.className = selectors.buttonContainerClass;
  var button = document.createElement("button");
  button.className = selectors.buttonClass;
  var svgContainer = document.createElement("div");
  svgContainer.className = "svg-button-container";
  svgContainer.innerHTML = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-plus\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>";
  button.appendChild(svgContainer);
  buttonContainer.appendChild(button);
  var targetElement = document.querySelector(selectors.targetDiv);
  if (targetElement) {
    if (selectors.buttonId === "simplify-button") {
      targetElement.insertBefore(buttonContainer, targetElement.children[1]);
    } else {
      targetElement.insertBefore(buttonContainer, targetElement.firstChild);
    }
  } else {
    console.error("Target element not found. Button not added.");
  }
  button.addEventListener("click", function () {
    replaceWithSpinner(selectors.buttonId, buttonContainer); // Replace button with spinner
    handleClick(selectors.buttonId, jobDetails);
  });
}
function replaceWithSpinner(buttonId, buttonContainer) {
  var button = document.querySelector("#" + buttonId + " button");
  if (button) {
    button.style.display = "none"; // Hide the button
  }
  var spinner = document.querySelector(".spinner");
  if (!spinner) {
    spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.id = buttonId;
    spinner.innerHTML = "\n      <svg viewBox=\"0 0 50 50\">\n        <circle class=\"path\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"5\"></circle>\n      </svg>";
    buttonContainer.appendChild(spinner); // Add spinner in place of the button
  }
}
function restoreButton(buttonId) {
  var button = document.querySelector("#" + buttonId + " button");
  var spinner = document.querySelector("#" + buttonId + ".spinner");
  if (spinner) {
    spinner.remove(); // Remove spinner
  }
  if (button) {
    button.style.display = "flex"; // Show the button again
  }
}
function handleClick(buttonId, jobDetails) {
  var button = document.querySelector("#" + buttonId + " button");
  if (!button) return; // Safety check to ensure the button exists

  // Disable the button to prevent multiple clicks
  button.disabled = true;

  // Show loading spinner while fetching
  replaceWithSpinner(buttonId, button.parentElement);
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
    (0,_toast_js__WEBPACK_IMPORTED_MODULE_0__.showToast)(jobDetails, data.message); // Display success toast
  })["catch"](function (error) {
    (0,_toast_js__WEBPACK_IMPORTED_MODULE_0__.showToast)(jobDetails, "Failed to connect to server", true); // Display error toast with message
  })["finally"](function () {
    // Re-enable the button after the request is complete
    button.disabled = false;
    restoreButton(buttonId); // Bring back the button
  });
}
})();

/******/ })()
;
//# sourceMappingURL=button.bundle.js.map