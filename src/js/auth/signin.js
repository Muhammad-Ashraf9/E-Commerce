import { signIn } from "./auth.js";
import { getCurrentUser } from "../model.js";
import {
  isValidEmail,
  isValidPassword,
  validateEmail,
  validatePassword,
} from "../helper.js";

export default function handleSignIn() {
  const form = document.querySelector("form");
  const email = document.querySelector("#email");
  const emailInvalidFeedback = document.querySelector(
    ".invalid-feedback.email"
  );
  const password = document.querySelector("#password");
  const passwordInvalidFeedback = document.querySelector(
    ".invalid-feedback.password"
  );
  const showPasswordCheckBox = document.querySelector("#showPasswordCheckBox");
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

    emailInvalidFeedback.textContent = `Please choose a valid Email.`; //to reset the error message after being changed by signin function
    passwordInvalidFeedback.textContent = `Password must be at least 8 characters, at least a symbol, upper and lower case letters and a number..`; //to reset the error message after being changed by signin function

    //   can be done with one function make validate function return true or false
    validateEmail(email, emailInvalidFeedback);
    validatePassword(password, passwordInvalidFeedback);

    if (!isValidEmail(email.value) || !isValidPassword(password.value)) {
      return;
    }
    try {
      signIn(email.value, password.value);
      const currentUser = getCurrentUser();
      if (currentUser.accountType === "customer") {
        location.assign(`/src/html/NewMain.html`);
      } else {
        location.assign(`/src/html/${currentUser.accountType}.html`);
      }
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
}
