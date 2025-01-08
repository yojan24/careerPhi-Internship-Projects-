// Initialize data
const suggestions = [
  {
    title: "How to File a Claim",
    content: "Instructions on filing a claim and what information is required.",
  },
  {
    title: "Claim Status Explained",
    content:
      "Learn how to check the status of your claim and understand the process.",
  },
  {
    title: "Common Insurance Questions",
    content:
      "Answers to frequently asked questions regarding policies and claims.",
  },
  {
    title: "Filing an Appeal",
    content: "How to file an appeal for a denied claim and necessary steps.",
  },
  {
    title: "Understanding Your Policy",
    content:
      "A guide to understanding different types of insurance policies and coverage options.",
  },
  {
    title: "Tips for Choosing an Insurance Provider",
    content:
      "Factors to consider when selecting the right insurance company for your needs.",
  },
  {
    title: "What to Do After an Accident",
    content:
      "Steps to take immediately after an accident, including how to file a claim.",
  },
  {
    title: "Insurance Terminology Explained",
    content:
      "Definitions of common insurance terms to help you navigate your policy.",
  },
  {
    title: "Coverage Limits and Deductibles",
    content:
      "Understanding how coverage limits and deductibles work in insurance policies.",
  },
  {
    title: "Preparing for an Insurance Review",
    content:
      "How to prepare for an insurance review and what documents you may need.",
  },
];

// Load claims from local storage
const loadClaims = () => {
  const storedClaims = localStorage.getItem("claims");
  return storedClaims ? JSON.parse(storedClaims) : [];
};

// Save claims to local storage
const saveClaims = (claims) => {
  localStorage.setItem("claims", JSON.stringify(claims));
};

// Initialize claims in local storage if it's empty
const initializeClaims = () => {
  if (!localStorage.getItem("claims")) {
    saveClaims([]); // Start with an empty array
  }
};

// Call this function on page load
initializeClaims();

// Pages
const homePage = document.getElementById("trackClaims");
const form = document.getElementById("fileClaim");
const chatBot = document.getElementById("chatbot");

// Main class
const searchInput = document.getElementById("search-input");
const suggestionsBox = document.getElementById("suggestions");
const searchResult = document.getElementById("result");

// Form elements
const policyNoInput = document.getElementById("policyNumber");
const incidentDateInput = document.getElementById("incidentDate");
const incidentDescriptionInput = document.getElementById("incidentDescription");
const btnSubmit = document.getElementById("btn-submit");

// Navigation buttons
const btnForm = document.getElementById("file-cliam");
const btnTrackClaim = document.getElementById("track-claim");
const btnChatBot = document.getElementById("chatBot");
const table = document.getElementById("table");

// Event handler for navigation buttons
btnTrackClaim.addEventListener("click", (e) => {
  homePage.classList.remove("hidden");
  form.classList.add("hidden");
  chatBot.classList.add("hidden");
  setTimeout(() => table.classList.add("bg-red-100"), 1000);
  setTimeout(() => table.classList.remove("bg-red-100"), 2000);
});

btnChatBot.addEventListener("click", (e) => {
  e.preventDefault();
  homePage.classList.add("hidden");
  chatBot.classList.remove("hidden");
  form.classList.add("hidden");
});

btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  homePage.classList.add("hidden");
  form.classList.remove("hidden");
  chatBot.classList.add("hidden");
});

// Event handlers for search input
searchInput.addEventListener("focus", () =>
  filterSuggestions(searchInput.value)
);
searchInput.addEventListener("input", () =>
  filterSuggestions(searchInput.value)
);
searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    suggestionsBox.classList.add("hidden");
  }, 100);
});

function filterSuggestions(query) {
  suggestionsBox.innerHTML = "";
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredSuggestions.length) {
    filteredSuggestions.forEach((suggestion) => {
      const item = document.createElement("div");
      item.classList.add(
        "suggestion-item",
        "p-2",
        "cursor-pointer",
        "hover:bg-red-100"
      );
      item.innerHTML = `<strong>${suggestion.title}</strong>`;

      item.addEventListener("mousedown", () => {
        searchInput.value = suggestion.title;
        suggestionsBox.classList.add("hidden");
        displaySearchResult(suggestion);
      });

      suggestionsBox.appendChild(item);
    });
    suggestionsBox.classList.remove("hidden");
  } else {
    suggestionsBox.classList.add("hidden");
  }
}

function displaySearchResult(suggestion) {
  searchResult.classList.remove("hidden");
  searchResult.innerHTML = `
    <h3 class="font-bold text-lg">${suggestion.title}</h3>
    <p>${suggestion.content}</p>
  `;
}

// Display recent claims in the table
const displayRecentClaims = () => {
  const claims = loadClaims();
  claims.forEach((item) => {
    const status =
      Date.now() - item.statusTimestamp > 12 * 60 * 60 * 1000
        ? "Approved"
        : "In Review";
    const row = `
      <tr>
        <td class="border border-gray-300 p-2 text-center">${item.policyNum}</td>
        <td class="border border-gray-300 p-2 text-center">${status}</td>
        <td class="border border-gray-300 p-2 text-center">${item.date}</td>
      </tr>
    `;
    table.insertAdjacentHTML("beforeend", row);
  });
};

// Display claims on page load
displayRecentClaims();

// Handle claim form submission
btnSubmit.addEventListener("click", (e) => {
  if (
    !policyNoInput.value ||
    !incidentDateInput.value ||
    !incidentDescriptionInput.value
  ) {
    alert("All fields must be filled!");
    return;
  }

  const newClaim = {
    policyNum: policyNoInput.value,
    statusTimestamp: Date.now(), // Use meaningful status as needed
    date: incidentDateInput.value,
    description: incidentDescriptionInput.value,
  };

  const claims = loadClaims();
  claims.push(newClaim);
  saveClaims(claims);

  form.classList.add("hidden");
  homePage.classList.remove("hidden");
  displayRecentClaims(); // Refresh the display of claims
});
