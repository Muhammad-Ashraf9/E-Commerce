import { setAuthStateFromCookie, signIn, signOut } from "./auth.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
import { getCurrentUser } from "./model.js";

setAuthStateFromCookie();

const body = document.querySelector("body");
renderNav(body);

const signInBtn = document.querySelector(".modal-body button:nth-child(1)");
const registerBtn = document.querySelector(".modal-body button:nth-child(2)");

renderFooter(body);
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;

  try {
    signIn(email, password);
    const currentUser = getCurrentUser();
    if (currentUser.accountType === "sellers") {
      location.assign("../html/seller.html");
      // history.pushState(null, "", `/seller/${state.currentUser.id}`);
      return;
    }
    const modal = document.querySelector(".modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    renderFooter(body);
    // location.reload();
  } catch (error) {
    alert(error.message);
  }
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.assign("../html/signup.html");
});
body.addEventListener("click", (e) => {
  if (e.target.textContent === "Sign out") {
    signOut();
    location.reload();
  }
});
