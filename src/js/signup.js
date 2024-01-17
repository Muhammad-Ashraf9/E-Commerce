import { signUp } from "./auth.js";

const signupBtn = document.querySelector("button[type=submit]");

console.log("signupBtn :>> ", signupBtn);

signupBtn.addEventListener("click", (e) => {
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;
  const accountType = document.querySelector(
    "input[name=accountType]:checked"
  ).value;
  e.preventDefault();
  signUp(email,password,accountType);
});
