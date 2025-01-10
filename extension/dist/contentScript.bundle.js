/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./functions/button.js":
/*!*****************************!*\
  !*** ./functions/button.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  svgContainer.className = "svg-container";
  if (selectors.buttonId === "waterloo-button") {
    svgContainer.innerHTML = "+";
  } else {
    svgContainer.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-plus\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>";
  }
  button.appendChild(svgContainer);
  buttonContainer.appendChild(button);
  var targetElement = document.querySelector(selectors.targetDiv);
  if (targetElement) {
    if (selectors.buttonId === "simplify-button") {
      targetElement.insertBefore(buttonContainer, targetElement.children[1]);
    } else if (selectors.buttonId === "waterloo-button") {
      targetElement.parentElement.style.display = "flex";
      targetElement.parentElement.style.alignItems = "center";
      targetElement.parentElement.style.gap = "15px";
      targetElement.parentElement.appendChild(buttonContainer);
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
  if (buttonId === "waterloo-button") {
    var loading = document.querySelector(".simple-spinner");
    if (!loading) {
      loading = document.createElement("div");
      loading.className = "simple-spinner";
      loading.id = buttonId;
      loading.style.width = "24px"; // Set fixed width
      loading.style.height = "24px"; // Set fixed height
      buttonContainer.appendChild(loading);
    }
  } else {
    var _loading = document.querySelector(".spinner");
    if (!_loading) {
      _loading = document.createElement("div");
      _loading.className = "spinner";
      _loading.id = buttonId;
      _loading.innerHTML = "\n        <svg viewBox=\"0 0 50 50\">\n          <circle class=\"path\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"5\"></circle>\n        </svg>";
      buttonContainer.appendChild(_loading); // Add spinner in place of the button
    }
  }
}
function restoreButton(buttonId) {
  var button = document.querySelector("#" + buttonId + " button");
  if (buttonId === "waterloo-button") {
    var loading = document.querySelector(".simple-spinner");
  } else {
    var loading = document.querySelector("#" + buttonId + ".spinner");
  }
  if (loading) {
    loading.remove(); // Remove loading animation
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
    (0,_toast_js__WEBPACK_IMPORTED_MODULE_0__.showToast)(jobDetails, error.message, true); // Display error toast with message
  })["finally"](function () {
    // Re-enable the button after the request is complete
    button.disabled = false;
    restoreButton(buttonId); // Bring back the button
  });
}

/***/ }),

/***/ "./functions/jobs.js":
/*!***************************!*\
  !*** ./functions/jobs.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractJobInfo: () => (/* binding */ extractJobInfo),
/* harmony export */   sendJobInfoToPopup: () => (/* binding */ sendJobInfoToPopup)
/* harmony export */ });
function extractJobInfo(selectors) {
  var _document$querySelect, _position, _document$querySelect2, _document$querySelect3;
  console.log("Extracting job information...");
  var position = (_document$querySelect = document.querySelector(selectors.position)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.innerText;
  position = (_position = position) === null || _position === void 0 ? void 0 : _position.replace(/\s*\(.*?\)\s*/g, "").trim();
  var company = (_document$querySelect2 = document.querySelector(selectors.company)) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.innerText;
  var description = (_document$querySelect3 = document.querySelector(selectors.description)) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.innerText;
  var currentURL = window.location.href;
  if (currentURL.includes("simplify.jobs/p/")) {
    var keywordMatchIndex = description.indexOf("Keyword Match");
    if (keywordMatchIndex !== -1) {
      description = description.slice(0, keywordMatchIndex).trim();
    }
  } else if (currentURL.includes("waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs")) {
    console.log("WaterlooWorks job info extraction");
    var positionDashIndex = position.indexOf("-");
    if (positionDashIndex !== -1) {
      position = position.slice(positionDashIndex + 1).trim();
      console.log("Position:", position);
    }
    var companyDashIndex = company.indexOf("-");
    if (companyDashIndex !== -1) {
      company = company.slice(0, companyDashIndex).trim();
      console.log("Company:", company);
    }
    var elements = document.querySelectorAll(selectors.description);
    description = Array.from(elements).map(function (element) {
      return element.innerText;
    });
  }
  if (position && company && description) {
    var jobInfo = {
      position: position,
      company: company,
      description: description
    };
    console.log("Job info extracted:", jobInfo);
    sendJobInfoToPopup(jobInfo); // Send the job info to the popup
    return jobInfo;
  } else {
    console.log("Position found:", !!position);
    console.log("Company found:", !!company);
    console.log("Description found:", !!description);
    console.error("Job info extraction failed");
  }
  return null;
}
function sendJobInfoToPopup(job_info) {
  console.log("Sending job info to popup:", job_info);
  chrome.runtime.sendMessage({
    type: "job_info",
    jobDetails: {
      position: job_info.position,
      company: job_info.company,
      description: job_info.description
    }
  }, function (response) {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError);
    } else {
      console.log("Message sent successfully:", response);
    }
  });

  // Store job info in local storage to retrieve later if popup is not open
  chrome.storage.sync.set({
    job_info: job_info
  }, function () {
    console.log(job_info);
    if (chrome.runtime.lastError) {
      console.log("Error storing job info:", chrome.runtime.lastError);
    } else {
      console.log("Job info stored successfully");
    }
  });
  console.log("Job info sent to popup");
}

/***/ }),

/***/ "./functions/selectors.js":
/*!********************************!*\
  !*** ./functions/selectors.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSelectors: () => (/* binding */ getSelectors),
/* harmony export */   websiteSelectors: () => (/* binding */ websiteSelectors)
/* harmony export */ });
var websiteSelectors = {
  linkedin: {
    urlPattern: "linkedin.com/jobs",
    information: {
      position: "div.job-details-jobs-unified-top-card__job-title h1.t-24.t-bold.inline",
      company: ".job-details-jobs-unified-top-card__company-name",
      description: "#job-details > div"
    },
    targetDiv: "div.job-details-jobs-unified-top-card__top-buttons",
    buttonId: "linkedin-button",
    buttonClass: "social-share__dropdown-trigger artdeco-button artdeco-button--3 artdeco-button--tertiary artdeco-button--circle artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view",
    buttonContainerClass: "artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view"
  },
  simplify: {
    urlPattern: "simplify.jobs/p/",
    information: {
      position: "h1.text-left.text-xl.font-bold.text-secondary-400",
      company: "p.text-left.text-lg.font-bold.text-secondary-400",
      description: "div.mt-4:nth-of-type(2)"
    },
    targetDiv: "div.mt-2.flex.justify-end.gap-x-4.text-sm.text-gray-500",
    buttonId: "simplify-button",
    buttonClass: "",
    buttonContainerClass: ""
  },
  waterlooWorks: {
    urlPattern: "waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs",
    information: {
      position: ".dashboard-header__profile-information h1",
      company: ".dashboard-header__profile-information h2",
      description: ".np-view-question--31, .np-view-question--32, .np-view-question--33"
    },
    targetDiv: ".clickGuard.applyButton",
    buttonId: "waterloo-button",
    buttonClass: "",
    buttonContainerClass: ""
  },
  indeed: {
    urlPattern: "indeed.com",
    information: {
      position: ".jobsearch-JobInfoHeader-title",
      company: ".jobsearch-InlineCompanyRating",
      description: ".jobsearch-JobMetadataHeader-item"
    },
    targetDiv: ".jobsearch-JobInfoHeader",
    buttonId: "indeed-button",
    buttonClass: "plus-button-indeed",
    buttonContainerClass: "plus-button-linkedin-container"
  }
};
function getSelectors() {
  var currentURL = window.location.href;
  for (var site in websiteSelectors) {
    if (currentURL.includes(websiteSelectors[site].urlPattern)) {
      return websiteSelectors[site];
    }
  }
  return null;
}

/***/ }),

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

/***/ }),

/***/ "./functions/utils.js":
/*!****************************!*\
  !*** ./functions/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   detectURLChange: () => (/* binding */ detectURLChange),
/* harmony export */   waitForElements: () => (/* binding */ waitForElements)
/* harmony export */ });
/* harmony import */ var _jobs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jobs.js */ "./functions/jobs.js");

function waitForElements(selectors, callback) {
  var retryInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var maxRetries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
  var retries = 0;
  var interval = setInterval(function () {
    var jobInfo = (0,_jobs_js__WEBPACK_IMPORTED_MODULE_0__.extractJobInfo)(selectors.information);
    var targetElement = document.querySelector(selectors.targetDiv);
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
function detectURLChange() {
  var currentURL = window.location.href;
  var observer = new MutationObserver(function () {
    if (currentURL !== window.location.href) {
      currentURL = window.location.href;
      setTimeout(function () {
        return startJobExtraction();
      }, 1000);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
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
/*!**************************!*\
  !*** ./contentScript.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_selectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/selectors.js */ "./functions/selectors.js");
/* harmony import */ var _functions_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/utils.js */ "./functions/utils.js");
/* harmony import */ var _functions_button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/button.js */ "./functions/button.js");



function startJobExtraction() {
  var selectors = (0,_functions_selectors_js__WEBPACK_IMPORTED_MODULE_0__.getSelectors)();
  if (selectors) {
    console.log("Selectors found. Starting job extraction...");
    (0,_functions_utils_js__WEBPACK_IMPORTED_MODULE_1__.waitForElements)(selectors, function (jobInfo) {
      return (0,_functions_button_js__WEBPACK_IMPORTED_MODULE_2__.addButton)(selectors, jobInfo);
    });
  } else {
    console.error("Selectors not found. Job extraction failed.");
  }
}
startJobExtraction();
(0,_functions_utils_js__WEBPACK_IMPORTED_MODULE_1__.detectURLChange)();
})();

/******/ })()
;
//# sourceMappingURL=contentScript.bundle.js.map