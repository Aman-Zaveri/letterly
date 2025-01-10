/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!****************************!*\
  !*** ./functions/utils.js ***!
  \****************************/
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
})();

/******/ })()
;
//# sourceMappingURL=utils.bundle.js.map