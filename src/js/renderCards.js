import { ProductsFiltered } from "../js/ProductsFiltered.js";
import { renderPaginationSection } from "../js/renderPaginationSection.js";
import { getSearchValue } from "./getSearchValue.js";
import { getCheckedValue } from "./getCategory.js";
import { addtoCart } from "./addToCart.js";
import { getQuantityFromCart } from "./getQuantityFromCart.js";
import { state } from "./model.js";
// Drawing the cards
export function renderCards(
  page,
  numberOfCardsPerPage,
  searchValue = getSearchValue(),
  category = getCheckedValue()
) {
  // let searchValue = ;
  // let category = ;
  let Products = ProductsFiltered(searchValue, category);
  // for (const iterator of Products) {
  //   console.log(iterator);
  // }

  const body = document.querySelector("body");

  let firstRow = document.getElementById("ProductsShow");
  firstRow.innerHTML = "";
  var startCard = (page - 1) * numberOfCardsPerPage + 1;
  var endCard = page * numberOfCardsPerPage;
  var productOuterDiv = "";
  if (endCard > Products.length) {
    endCard = Products.length;
  }
  for (let i = startCard; i <= endCard; i++) {
    const iID = Products[i - 1].id;
    if (
      state.currentUser === null ||
      state.currentUser.accountType === "customer"
    ) {
      var prodQ = getQuantityFromCart(iID);
    }

    productOuterDiv += `
        <div class="col-md-3">
          <div class="wsk-cp-product">
            <img id="two" class="wsk-cp-img" alt="${
              Products[i - 1].title
            }" src="${Products[i - 1].imgURL0}">
            <img id="one" class="wsk-cp-img" alt="${
              Products[i - 1].title
            }" src="${Products[i - 1].imgURL1}">
            <div class="wsk-cp-text">
              <div class="title-product">
                <h3 class="viewProductPage" id="${Products[i - 1].id}">
                  ${Products[i - 1].title}${i}
                </h3>
              </div>
              <div class="card-footer">
                <div class="wcf-left">
                  <span>${Products[i - 1].price} $ <del style="color: red">${
      Products[i - 1].prevPrice
    } $</del></span>
                </div>
      `;
    if (
      state.currentUser === null ||
      state.currentUser.accountType === "customer"
    ) {
      productOuterDiv += `
                    <div class="wcf-right">
                      <input type="text" class="quantity" value="${prodQ}" readonly style="width: 30px; background-color: transparent; border: none; user-select: none;">
                      <button id="${iID}" style="width: 30px; background-color: transparent; border: none;" class="buy-btn" title="Add to cart">
                        <i id="${iID}" class="fa-solid fa-cart-plus"></i>
                      </button>
                    </div>
          `;
    }
    productOuterDiv += `
                  </div>
                </div>
              </div>
            </div>
          `;

    firstRow.innerHTML += productOuterDiv;
  }

  // add an event listener to all the created buttons
  let addbuttons = document.getElementsByClassName("buy-btn");
  for (let i = 0; i < addbuttons.length; i++) {
    addbuttons[i].addEventListener("click", addtoCart);
  }

  // Open the product details page
  body.addEventListener("click", function (e) {
    if (e.target.classList.contains("viewProductPage")) {
      var prodID = e.target.id;
      localStorage.setItem("id", prodID);
      // location.assign("../html/ProductDetails.html");
      window.open("../html/ProductDetails.html", "_blank");
    }
  });

  let pagesCount = 0;
  if (Products.length == 0) {
    pagesCount = 0;
  } else {
    pagesCount = Math.ceil(Products.length / numberOfCardsPerPage);
  }
  renderPaginationSection(page, pagesCount);
}
