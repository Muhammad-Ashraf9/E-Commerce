import { setAuthStateFromCookie } from "./auth/auth.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
import { renderCards } from "./renderCards.js";
import { ProductsFiltered } from "./ProductsFiltered.js";

const body = document.querySelector("body");
// console.log("body :>> ", body);
setAuthStateFromCookie();

renderNav(body);
renderFooter(body);

let page = 1;
  let numberOfCardsPerPage = 4; // Number of cards per page
  let productsCount = ProductsFiltered("", "").length; // Number of products
  let pagesCount = Math.ceil(productsCount / numberOfCardsPerPage); // Number of pages
  let firstRow = document.getElementById("ProductShow");
  renderCards(page, numberOfCardsPerPage, "", "");

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
  renderCards(page, numberOfCardsPerPage, "", "");
});
