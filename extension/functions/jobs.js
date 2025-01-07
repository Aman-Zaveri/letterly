export function extractJobInfo(selectors) {
  console.log("Extracting job information...");
  let position = document.querySelector(selectors.position)?.innerText;
  position = position?.replace(/\s*\(.*?\)\s*/g, "").trim();

  const company = document.querySelector(selectors.company)?.innerText;
  let description = document.querySelector(selectors.description)?.innerText;

  const currentURL = window.location.href;
  if (currentURL.includes("simplify.jobs/p/")) {
    const keywordMatchIndex = description.indexOf("Keyword Match");
    if (keywordMatchIndex !== -1) {
      description = description.slice(0, keywordMatchIndex).trim();
    }
  }

  if (position && company && description) {
    const jobInfo = { position, company, description };
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

export function sendJobInfoToPopup(job_info) {
  console.log("Sending job info to popup:", job_info);
  chrome.runtime.sendMessage(
    {
      type: "job_info",
      jobDetails: {
        position: job_info.position,
        company: job_info.company,
        description: job_info.description,
      },
    },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Message sent successfully:", response);
      }
    }
  );

  // Store job info in local storage to retrieve later if popup is not open
  chrome.storage.sync.set({ job_info: job_info }, () => {
    console.log(job_info);
    if (chrome.runtime.lastError) {
      console.log("Error storing job info:", chrome.runtime.lastError);
    } else {
      console.log("Job info stored successfully");
    }
  });

  console.log("Job info sent to popup");
}