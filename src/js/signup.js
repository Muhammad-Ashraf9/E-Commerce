import { signUp } from "./auth.js";

const signupBtn = document.querySelector("button[type=submit]");

signupBtn.addEventListener("click", (e) => {
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;
  e.preventDefault();
  signUp(email, password);
});
