// import { products } from "../js/Products.js";
import { state } from "./model.js";
import { renderCards } from "../js/renderCards.js";
import { ProductsFiltered } from "./ProductsFiltered.js";
let prodID = localStorage.getItem("id");
const Product = state.products[prodID];
const prodImgtwo = document.getElementById("two");
const prodImgone = document.getElementById("one");
prodImgtwo.src = Product.imgURL0;
prodImgone.src = Product.imgURL1;
const prodNameDiv = document.getElementById("prodName");
prodNameDiv.innerText = Product.title;
const prodPriceh3 = document.getElementById("prodPrice");
prodPriceh3.innerText += ` ${Product.price} $`;
const prodPriceh4 = document.getElementById("prodPriceBD");
if (Product.prevPrice !== Product.price) {
  prodPriceh4.innerText += ` ${Product.prevPrice} $`;
}
const prodDescDiv = document.getElementById("prodDesc");
prodDescDiv.innerText = Product.description;
const prodCategoryDiv = document.querySelector("#prodCategory h4");
prodCategoryDiv.innerText += ` ${Product.category}`;
let category = `${Product.category}`;
  // Render after click on the pagination buttons
  let numberOfCardsPerPage = 4
  let page = 1; // Current page
  let productsCount = ProductsFiltered("", category).length; // Number of products
  let pagesCount = Math.ceil(productsCount / numberOfCardsPerPage); // Number of pages

  renderCards(page, numberOfCardsPerPage, "", category);

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
    renderCards(page, numberOfCardsPerPage, "", category);
  });


const wishIcon = document.querySelector(".wish-icon i");
wishIcon.addEventListener("click", function () {
  if (wishIcon.classList.contains("fa-heart-o")) {
      wishIcon.classList.remove("fa-heart-o");
      wishIcon.classList.add("fa-heart");
  } else {
      wishIcon.classList.remove("fa-heart");
      wishIcon.classList.add("fa-heart-o");
  }
});
