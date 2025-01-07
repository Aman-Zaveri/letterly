/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!***************************!*\
  !*** ./functions/jobs.js ***!
  \***************************/
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
/******/ })()
;
//# sourceMappingURL=jobs.bundle.js.map