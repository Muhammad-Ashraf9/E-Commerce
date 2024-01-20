import { setAuthStateFromCookie, signOut } from "./auth.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
import { state } from "./model.js";

const body = document.querySelector("body");

setAuthStateFromCookie();

renderNav(body);
renderFooter(body);

body.addEventListener("click", (e) => {
  if (e.target.textContent !== "Register") return;
  e.preventDefault();
  location.assign("../html/signup.html");
});