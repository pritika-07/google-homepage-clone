
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-button");
const luckyButton = document.getElementById("lucky-button");
const appsButton = document.getElementById("apps-button");
const appsMenu = document.getElementById("apps-menu");
const voiceButton = document.getElementById("voice-button");
const settingsButton = document.getElementById("settings-button");
const toast = document.getElementById("toast");
const notice = document.getElementById("notice");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function getSearchQuery() {
  return searchInput.value.trim();
}

function performSearch(feelingLucky = false) {
  const query = getSearchQuery();

  if (!query) {
    notice.textContent = "Type something to search for.";
    searchInput.focus();
    return;
  }

  notice.textContent = "";

  const baseUrl = "https://www.google.com/search";
  const params = new URLSearchParams({ q: query });

  if (feelingLucky) {
    params.set("btnI", "1");
  }

  window.location.href = `${baseUrl}?${params.toString()}`;
}

// Search on form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  performSearch();
});

// I'm Feeling Lucky
luckyButton.addEventListener("click", () => {
  performSearch(true);
});

// Show or hide the clear button
function updateClearButton() {
  clearButton.hidden = searchInput.value.length === 0;
  notice.textContent = "";
}

searchInput.addEventListener("input", updateClearButton);

// Clear search text
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  updateClearButton();
  searchInput.focus();
});

// Toggle Google apps menu
appsButton.addEventListener("click", (event) => {
  event.stopPropagation();

  const isOpen = !appsMenu.hidden;
  appsMenu.hidden = isOpen;
  appsButton.setAttribute("aria-expanded", String(!isOpen));
});

// Close apps menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    !appsMenu.hidden &&
    !appsMenu.contains(event.target) &&
    !appsButton.contains(event.target)
  ) {
    appsMenu.hidden = true;
    appsButton.setAttribute("aria-expanded", "false");
  }
});

// Close menu using Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    appsMenu.hidden = true;
    appsButton.setAttribute("aria-expanded", "false");
  }
});

// Voice search is a demo, not actual speech recognition
voiceButton.addEventListener("click", () => {
  showToast("Voice search is not enabled in this demo.");
});

// Settings button is also a demo
settingsButton.addEventListener("click", () => {
  showToast("Settings panel is not included in this clone.");
});

// Focus the search box when the page loads
window.addEventListener("load", () => {
  searchInput.focus({ preventScroll: true });
});
