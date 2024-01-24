import { signIn } from "./auth.js";
import { getCurrentUser } from "./model.js";
import renderNav from "./views/Nav.js";

const body = document.querySelector("body");
export default function handleSignIn(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;
    const errorMessage = document.querySelector(".error-message");

    try {
      signIn(email, password);
      const currentUser = getCurrentUser();
      if (currentUser.accountType !== "customer") {
        location.assign(`../html/${currentUser.accountType}.html`);
        return;
      }

      const closeModalBtn = document.querySelector(".btn-close");
      const nav = document.querySelector("nav");
      closeModalBtn.click();
      nav.remove();
      renderNav(body);
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.opacity = 1;
    }
  });
}
