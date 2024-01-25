import { ProductsFiltered } from "../js/ProductsFiltered.js";
import { renderCards } from "../js/renderCards.js";
import renderNav from "../js/views/Nav.js";
import renderFooter from "../js/views/Footer.js";
import { getCheckedValue } from "../js/getCategory.js";
import { getSearchValue } from "../js/getSearchValue.js";
import { addtoCart } from "./addtoCart.js";
var numberOfCardsPerPage = 8;
let prodID = -1;

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Open the product details page
  body.addEventListener("click", function (e) {
    if (e.target.classList.contains("viewProductPage")) {
      var prodID = e.target.id;
      localStorage.setItem("id", prodID);
      // location.assign("../html/ProductDetails.html");
      window.open("../html/ProductDetails.html", "_blank");
    }
  });

  // Filter the products by category
  let CategoryButtons = document.getElementById("CategoryButtons");
  CategoryButtons.addEventListener("click", function (event) {
    if (event.target.nodeName == "INPUT") var searchValue = getSearchValue();
    let category = getCheckedValue();
    let products = ProductsFiltered(searchValue, category);

    let page = 1;
    let productsCount = products.length;
    let pagesCount = Math.ceil(productsCount / numberOfCardsPerPage);
    var startCard = (page - 1) * numberOfCardsPerPage + 1;
    var endCard = page * numberOfCardsPerPage;
    if (endCard > productsCount) {
      endCard = productsCount;
    }
    renderCards(1, 4);
  });

  // Onload page rendering of the cards
  let page = 1; // Current page
  let productsCount = ProductsFiltered("", "").length; // Number of products
  let pagesCount = Math.ceil(productsCount / numberOfCardsPerPage); // Number of pages
  var startCard = (page - 1) * numberOfCardsPerPage + 1; // Start card
  var endCard = page * numberOfCardsPerPage;
  if (endCard > productsCount) {
    endCard = productsCount;
  }
  renderCards(page, numberOfCardsPerPage);

  let searchValue = document.querySelector('input[type="search"]').value;
  document
    .querySelector('input[type="search"]')
    .addEventListener("input", function (event) {
      renderCards(1, numberOfCardsPerPage);
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

      startCard = (page - 1) * numberOfCardsPerPage + 1;
      endCard = page * numberOfCardsPerPage;
      if (endCard > productsCount) {
        endCard = productsCount;
      }
    }
    let searchValue = document.querySelector('input[type="search"]').value;
    renderCards(page, numberOfCardsPerPage);
  });

  // Clear the search bar
  const clearInput = () => {
    const input = document.querySelector('input[type="search"]');
    input.value = "";
  };
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);


});

// addEventListener to the search bar
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
  const input = document.querySelector('input[type="search"]');
  input.value = "";
  renderCards(1, numberOfCardsPerPage);
});

