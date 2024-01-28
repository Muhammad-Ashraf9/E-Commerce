import { signUp } from "./auth.js";
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
const name = document.querySelector("#userName");
const nameInvalidFeedback = document.querySelector(".invalid-feedback.name");
const sellerCheckBox = document.querySelector("#sellerCheckBox");
const showPasswordCheckBox = document.querySelector("#showPasswordCheckBox");

//start with focus on email input
email.focus();

email.addEventListener("blur", () =>
  validateEmail(email, emailInvalidFeedback)
);
name.addEventListener("blur", () => validateName(name, nameInvalidFeedback));

password.addEventListener("blur", () =>
  validatePassword(password, passwordInvalidFeedback)
);

showPasswordCheckBox.addEventListener("change", () => {
  password.type = showPasswordCheckBox.checked ? "text" : "password";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emailInvalidFeedback.textContent = `Please choose a valid Email.`; //to reset the error message after being changed by signUp function
  const userType = sellerCheckBox.checked ? "seller" : "customer";

  validateEmail(email, emailInvalidFeedback);
  validatePassword(password, passwordInvalidFeedback);
  validateName(name, nameInvalidFeedback);
  if (
    !isValidEmail(email.value) ||
    !isValidName(name.value) ||
    !isValidPassword(password.value)
  ) {
    return;
  }
  try {
    signUp(email.value, password.value, name.value, userType);
    location.assign(`../html/login.html`);
  } catch (error) {
    email.classList.add("is-invalid");
    emailInvalidFeedback.textContent = error.message;
    emailInvalidFeedback.style.display = "block";
  }
});
