const signupForm = document.getElementById("signup-form");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const signupMessage = document.getElementById("signup-message");

signupForm.addEventListener("submit", event => {
  event.preventDefault();
  signupMessage.textContent = "";

  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    signupMessage.textContent = "The passwords do not match. Please check them.";
    confirmPasswordInput.focus();
    return;
  }

  signupMessage.textContent = "Your form is valid! Real account creation will work after a secure backend is connected.";
  signupForm.reset();
});
