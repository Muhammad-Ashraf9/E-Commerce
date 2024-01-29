import { renderCards } from "../js/renderCards.js";
import { setAuthStateFromCookie } from "./auth/auth.js";

setAuthStateFromCookie();

document.addEventListener("DOMContentLoaded", function () {
  let firstRow = document.getElementById("ProductShow");
  console.log(firstRow);
  renderCards(1, 4, "", "");
});

  // Render after click on the pagination buttons
const pagSec = document.getElementById("paginationSection");
pagSec.addEventListener("click", function (event) {
  if (event.target.nodeName == "A") {
    pagSec.innerHTML = "";
    if (event.target.textContent === "Previous") {
      if (page === 1) {
        page = 1;
      } else {
        page--;
      }
    } else if (event.target.textContent === "Next") {
      if (page === pagesCount) {
        page = pagesCount;
      } else {
        page++;
      }
    } else {
      page = parseInt(event.target.textContent);
    }
  }
  renderCards(page, 4, "", "");
});
