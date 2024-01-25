import { ProductsFiltered } from "../js/ProductsFiltered.js";
import { renderPaginationSection } from "../js/renderPaginationSection.js";
import { getSearchValue } from "./getSearchValue.js";
import { getCheckedValue } from "./getCategory.js";
import { addtoCart } from "./addtoCart.js";
// Drawing the cards
export function renderCards(page, numberOfCardsPerPage) {
  let searchValue = getSearchValue();
  let category = getCheckedValue();
  let Products = ProductsFiltered(searchValue, category);

  const firstRow = document.getElementById("ProductShow");
  firstRow.innerHTML = "";
  var startCard = (page - 1) * numberOfCardsPerPage + 1;
  var endCard = page * numberOfCardsPerPage;
  if (endCard > Products.length) {
    endCard = Products.length;
  }
  for (let i = startCard; i <= endCard; i++) {
    const productOuterDiv = `
      <div class="col-md-3">
        <div class="wsk-cp-product">
          <img class="wsk-cp-img" alt="${Products[i - 1].title}" src="${
      Products[i - 1].imgURL0
    }">
          <div class="wsk-cp-text">
            <div class="title-product">
              <h3 class=" viewProductPage" id="${
                Products[i - 1].id
              }">
                <a href="">${Products[i - 1].title}${i}</a>
                
              </h3>
            </div>
            <div class="card-footer">
              <div class="wcf-left">
                <span>${Products[i - 1].price} $ <del>${
      Products[i - 1].priceBeforeDiscount
    } $</del></span>
              </div>
              <div class="wcf-right">
                <input class="quantity" type="text" value="0" readonly style="width: 30px; background-color: transparent; border: none;">
                <button style="width: 30px; background-color: transparent; border: none;" class="buy-btn" title="Add to cart">
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    firstRow.innerHTML += productOuterDiv;
  }
  // add an event listener to all the created buttons 
  let addbuttons = document.getElementsByClassName("buy-btn");
  for (let i = 0; i< addbuttons.length; i++)
  {
    addbuttons[i].addEventListener("click", addtoCart)
  }

  let pagesCount = 0;
  if (Products.length == 0) {
    pagesCount = 0;
  } else {
    pagesCount = Math.ceil(Products.length / numberOfCardsPerPage);
  }
  renderPaginationSection(page, pagesCount);
}
