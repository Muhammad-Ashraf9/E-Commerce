// import {products} from "../js/Products.js";
import { ProductsFiltered } from "../js/ProductsFiltered.js";
import { renderCards } from "../js/renderCards.js";
import renderNav from "../js/views/Nav.js";
import renderFooter from "../js/views/Footer.js";
// import { categories } from "./views/renderCategoryButtons.js";
import { getCheckedValue } from "../js/getCategory.js";
import { getSearchValue } from "../js/getSearchValue.js";


let numberOfCardsPerPage = 8;
let prodID = -1;

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

// Open the product details page
  body.addEventListener("click", function (e) {
    if (e.target.classList.contains("viewProductPage")) {
      var prodID = e.target.id;
      localStorage.setItem("id", prodID);
      // location.assign("../html/ProductDetails.html");
      window.open("../html/ProductDetails.html", "_blank")
    }
  });

// Filter the products by category
  let CategoryButtons = document.getElementById("CategoryButtons");
  CategoryButtons.addEventListener("click", function (event) {
    if(event.target.nodeName == "INPUT")
      console.log(event.target.value);
    let searchValue = getSearchValue();
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
    renderCards(1,4);
  });

// Onload page rendering of the cards
  let page = 1; // Current page
  let productsCount = ProductsFiltered("", "").length; // Number of products
  let numberOfCardsPerPage = 8; // Number of cards per page
  let pagesCount = Math.ceil(productsCount / numberOfCardsPerPage); // Number of pages
  var startCard = (page - 1) * numberOfCardsPerPage + 1; // Start card
  var endCard = page * numberOfCardsPerPage;
  if (endCard > productsCount) {
    endCard = productsCount;
  }
  console.log("startCard: " + startCard + " endCard: " + endCard);
  renderNav(body);
  renderFooter(body);
  renderCards(page, numberOfCardsPerPage);

  let searchValue = document.querySelector('input[type="search"]').value;
  document
    .querySelector('input[type="search"]')
    .addEventListener("input", function (event) {
      // let searchValue = event.target.value;
      // console.log(ProductsFiltered(searchValue, ""));
      // //
      // // Define the variables for the pagination
      // let page = 1; // Current page
      // var productsCount = ProductsFiltered(searchValue, "").length; // Number of products
      // var numberOfCardsPerPage = 5; // Number of cards per page
      // var pagesCount = Math.ceil(productsCount / numberOfCardsPerPage); // Number of pages
      // // var startCard = 1; // Start card
      // var startCard = (page - 1) * numberOfCardsPerPage + 1; // Start card
      // //  endCard = numberOfCardsPerPage; // End card
      // var endCard = page * numberOfCardsPerPage;
      // if (endCard > productsCount) {
      //   endCard = productsCount;
      // }
      // //

      renderCards(1, numberOfCardsPerPage);
      // renderCards;
    });

// Render after click on the pagination buttons
  const pagSec = document.getElementById("paginationSection");
  pagSec.addEventListener("click", function (event) {
    console.log("event.target.nodeName: " + event.target.nodeName);
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
        console.log("event.target.textContent: " + event.target.textContent);
        page = parseInt(event.target.textContent);
      }

      startCard = (page - 1) * numberOfCardsPerPage + 1;
      endCard = page * numberOfCardsPerPage;
      if (endCard > productsCount) {
        endCard = productsCount;
      }
    }
    let searchValue = document.querySelector('input[type="search"]').value;
    console.log(ProductsFiltered(searchValue, ""));
    renderCards(page, numberOfCardsPerPage);
  });

  // Clear the search bar
  const clearInput = () => {
    const input = document.querySelector('input[type="search"]');
    input.value = "";
  };
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);

  // renderCards(startCard, endCard, searchValue);
  // renderPaging();
});

  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", function () {
    const input = document.querySelector('input[type="search"]');
    input.value = "";
    renderCards(1, numberOfCardsPerPage);
  });