import { setAuthStateFromCookie } from "./auth/auth.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
import { renderCards } from "./renderCards.js";

const body = document.querySelector("body");
console.log("body :>> ", body);
setAuthStateFromCookie();

let div = document.getElementById("ProductShow");
console.log(div);

renderNav(body);
renderFooter(body);
renderCards(1, 4, "", "");
