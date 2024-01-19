import { signUp } from "./auth.js";
import { validateEmail } from "./helper.js";

const form = document.querySelector("form");
const errorMessage = document.querySelector(".error-message");
const email = document.querySelector("input[type=email]");
const password = document.querySelector("input[type=password]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const passwordValue = password.value;
  if (!validateEmail(email.value)) {
    showErrorMessage("Please enter a valid email address");
    return;
  }
  if (password.value.length < 6) {
    showErrorMessage("Password must be at least 6 characters long");
    return;
  }
  try {
    signUp(emailValue, passwordValue);
    location.assign("main.html");
  } catch (error) {
    showErrorMessage(error.message);
  }
});

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.opacity = 1;
}
