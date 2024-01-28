import { renderCards } from "../js/renderCards.js";
import { setAuthStateFromCookie } from "./auth/auth.js";

setAuthStateFromCookie();

document.addEventListener("DOMContentLoaded", function () {
  let firstRow = document.getElementById("ProductShow");
  console.log(firstRow);
  renderCards(1, 4, "", "");
});
