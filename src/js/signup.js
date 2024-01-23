import { signUp } from "./auth.js";
import { isValidEmail, isValidName } from "./helper.js";

const form = document.querySelector("form");
const errorMessage = document.querySelector(".error-message");
const email = document.querySelector("input[type=email]");
const validationMessages = document.querySelectorAll(".validation-message");
const password = document.querySelector("input[type=password]");
const name = document.querySelector("#name");

//start with focus on email input
email.focus();

email.addEventListener("blur", validateEmail);
name.addEventListener("blur", validateName);
password.addEventListener("blur", validatePassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const passwordValue = password.value;
  const nameValue = name.value;

  validateForm();
  if (
    !isValidEmail(emailValue) ||
    !isValidName(nameValue) ||
    passwordValue.length < 6
  ) {
    return;
  }
  try {
    signUp(emailValue, passwordValue, nameValue);
    location.assign("main.html");
  } catch (error) {
    showErrorMessage(error.message);
  }
});

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.opacity = 1;
}
function validateEmail() {
  if (!isValidEmail(email.value)) {
    validationMessages[0].classList.add("validation-message--visible");
  } else {
    validationMessages[0].classList.remove("validation-message--visible");
  }
}
function validateName() {
  if (!isValidName(name.value)) {
    validationMessages[1].classList.add("validation-message--visible");
  } else {
    validationMessages[1].classList.remove("validation-message--visible");
  }
}
function validatePassword() {
  if (password.value.length < 6) {
    validationMessages[2].classList.add("validation-message--visible");
  } else {
    validationMessages[2].classList.remove("validation-message--visible");
  }
}
function validateForm() {
  validateEmail();
  validateName();
  validatePassword();
}
