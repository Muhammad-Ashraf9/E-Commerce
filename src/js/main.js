import { setAuthStateFromCookie, signOut } from "./auth.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
import { renderCards } from "./renderCards.js";
// import { state } from "./model.js";

const body = document.querySelector("body");

setAuthStateFromCookie();

let div  = document.getElementById("ProductShow");
console.log(div);
renderNav(body);
renderFooter(body);
renderCards(1,4,"","");
body.addEventListener("click", (e) => {
  if (e.target.textContent !== "Register") return;
  e.preventDefault();
  location.assign("../html/signup.html");
});