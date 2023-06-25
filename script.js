//your JS code here. If required.
// Get form and form inputs
const preferencesForm = document.getElementById("preferences-form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Load user preferences from cookies and apply them to the page
function loadPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize);
    fontSizeInput.value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    fontColorInput.value = fontColor;
  }
}

// Save user preferences as cookies
function savePreferences() {
  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  setCookie("fontsize", fontSize, 30); // Expires in 30 days
  setCookie("fontcolor", fontColor, 30);

  document.documentElement.style.setProperty("--fontsize", fontSize);
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

// Set a cookie with the given name, value, and expiration days
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

// Get the value of the cookie with the given name
function getCookie(name) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Event listener for form submission
preferencesForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  savePreferences();
});

// Load user preferences when the page loads
loadPreferences();
