import { signOut } from "../auth.js";
import { getCurrentUser } from "../model.js";

const signoutBtn = document.querySelector(".signout");
if (!getCurrentUser() || getCurrentUser().accountType !== "admin") {
  location.assign("../html/main.html");
}
signoutBtn.addEventListener("click", () => {
    signOut();
    location.assign("../html/main.html");
});

console.log(new Chart());
