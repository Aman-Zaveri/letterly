import { getSelectors } from "./functions/selectors.js";
import { waitForElements, detectURLChange } from "./functions/utils.js";
import { addButton } from "./functions/button.js";

function startJobExtraction() {
  const selectors = getSelectors();
  if (selectors) {
    console.log("Selectors found. Starting job extraction...");
    waitForElements(selectors, (jobInfo) => addButton(selectors, jobInfo));
  } else {
    console.error("Selectors not found. Job extraction failed.");
  }
}

startJobExtraction();
detectURLChange();
