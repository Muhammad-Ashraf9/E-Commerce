import { signIn, signin } from "./auth.js";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../helper.js";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailInvalidFeedback = document.querySelector(".invalid-feedback.email");
const password = document.querySelector("#password");
const passwordInvalidFeedback = document.querySelector(
  ".invalid-feedback.password"
);

const showPasswordCheckBox = document.querySelector("#showPasswordCheckBox");

//start with focus on email input
email.focus();

email.addEventListener("blur", () =>
  validateEmail(email, emailInvalidFeedback)
);

password.addEventListener("blur", () =>
  validatePassword(password, passwordInvalidFeedback)
);

showPasswordCheckBox.addEventListener("change", () => {
  password.type = showPasswordCheckBox.checked ? "text" : "password";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emailInvalidFeedback.textContent = `Please choose a Email.`; //to reset the error message after being changed by signin function
  passwordInvalidFeedback.textContent = `Password must be at least 8 characters, at least a symbol, upper and lower case letters and a number..`; //to reset the error message after being changed by signin function

  //   can be done with one function make validate function return true or false
  validateEmail(email, emailInvalidFeedback);
  validatePassword(password, passwordInvalidFeedback);
  if (!isValidEmail(email.value) || !isValidPassword(password.value)) {
    return;
  }
  try {
    signIn(email.value, password.value);
  } catch (error) {
    if (error.message === "No user with this email") {
      email.classList.add("is-invalid");
      emailInvalidFeedback.textContent = error.message;
      emailInvalidFeedback.style.display = "block";
    } else {
      password.classList.add("is-invalid");
      passwordInvalidFeedback.textContent = error.message;
      passwordInvalidFeedback.style.display = "block";
    }
  }
});
