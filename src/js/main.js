import { getCoookie, isAuthenticated, signIn, signOut } from "./auth.js";
import { state } from "./model.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/footer.js";

const body = document.querySelector("body");
const signInBtn = document.querySelector(".modal-body button:nth-child(1)");
const registerBtn = document.querySelector(".modal-body button:nth-child(2)");

if (isAuthenticated()) {
  const id = getCoookie("id");
  const accountType = getCoookie("accountType");
  state.currentUser = state[accountType.toLowerCase()].find(
    (user) => user.id === +id
  );
}

renderNav(body);
renderFooter(body);
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;
  const accountType = document.querySelector(
    "input[name=accountType]:checked"
  ).value;

  try {
    signIn(email, password, accountType);
    if (accountType === "sellers") {
      location.assign("../html/seller.html");
      // history.pushState(null, "", `/seller/${state.currentUser.id}`);
      return;
    }
    location.reload();
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
