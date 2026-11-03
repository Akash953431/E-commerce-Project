const loginForm = document.getElementById("login-form");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");
const loginMessage = document.getElementById("login-message");

passwordToggle.addEventListener("click", () => {
  const showingPassword = passwordInput.type === "password";
  passwordInput.type = showingPassword ? "text" : "password";
  passwordToggle.textContent = showingPassword ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-pressed", String(showingPassword));
});

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }

  loginMessage.textContent = "Your form is valid. Real account login will work after a backend is connected.";
});
