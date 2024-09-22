document.addEventListener("DOMContentLoaded", function () {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];

    if (currentTab.url.includes("linkedin.com")) {
      // Send message to content script to fetch job details
      chrome.tabs.sendMessage(
        currentTab.id,
        { type: "getJobDetails" },
        function (response) {
          if (response) {
            console.log("Organization:", response.organization);
            console.log("Position:", response.position);
            document.getElementById("organization").value =
              response.organization || "";
            document.getElementById("position").value = response.position || "";
          }
        }
      );
    }

    // Event listener for the Generate button
    document.getElementById("generate").addEventListener("click", function () {
      document.getElementById("generate").disabled = true;

      const organization = document.getElementById("organization").value;
      const position = document.getElementById("position").value;
      const description = document.getElementById("description").value;

      if (!organization || !position) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Missing fields";
        errorMessage.style.display = "block";
        return;
      } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "none";
      }

      console.log("Organization:", organization);
      console.log("Position:", position);
      console.log("Description:", description);

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
          document.getElementById("generate").disabled = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("generate").disabled = false;
        });
    });
  });
});
