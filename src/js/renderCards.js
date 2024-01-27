import { ProductsFiltered } from "../js/ProductsFiltered.js";
import { renderPaginationSection } from "../js/renderPaginationSection.js";
import { getSearchValue } from "./getSearchValue.js";
import { getCheckedValue } from "./getCategory.js";

    // Drawing the cards
export function renderCards(page, numberOfCardsPerPage) {
  console.log("hi");
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
  console.log(numberOfCardsPerPage);
  console.log("startCard: " + startCard + " endCard: " + endCard);

  for (let i = startCard; i <= endCard; i++) {
    // Products.forEach((element) => {
    //for (let i = 1; i <= numberOfCardsPerPage; i++) {
    const productOuterDiv = document.createElement("div");
    // add class "col-md-3"
    productOuterDiv.classList.add("col-md-3");
    // append the div for the product
    const productDiv = document.createElement("div");
    // add class "wsk-cp-product" to the div
    productDiv.classList.add("wsk-cp-product");
    // append the div for the image
    const imageDiv = document.createElement("img");
    // add class "img-responsive"
    imageDiv.classList.add("wsk-cp-img");
    // and alt value to the image
    // printvalues();
    // console.log("products[i-1].name" + products[i-1].name + i);
    imageDiv.setAttribute("alt", Products[i - 1].name);
    imageDiv.setAttribute("src", Products[i - 1].imgURL);
    // append the div for the text
    const textDiv = document.createElement("div");
    // add class "wsk-cp-text"
    textDiv.classList.add("wsk-cp-text");
    // append the div for the category
    const categoryDiv = document.createElement("div");
    // add class "category"
    categoryDiv.classList.add("category");
    // append the span for the category
    const categorySpan = document.createElement("span");
    categorySpan.innerText = Products[i - 1].category;
    // append the div for the product name
    const productNameDiv = document.createElement("div");
    // add class "title-product"
    productNameDiv.classList.add("title-product");
    // append the h3 for the product name
    const productNameH3 = document.createElement("h3");
    productNameH3.innerText = Products[i - 1].name + i;
    productNameH3.setAttribute("class", "viewProductPage");
    productNameH3.setAttribute("id", Products[i - 1].id);
    // append the div for the description
    const descriptionDiv = document.createElement("div");
    // add class "description-prod"
    descriptionDiv.classList.add("description-prod");
    // append the p for the description
    const descriptionP = document.createElement("p");
    descriptionP.innerText = Products[i - 1].description;
    // append the div for the footer
    const footerDiv = document.createElement("div");
    // add class "card-footer"
    footerDiv.classList.add("card-footer");
    // append the div for the price
    const priceDiv = document.createElement("div");
    // add class "wcf-left"
    priceDiv.classList.add("wcf-left");
    // append the span for the price
    const priceSpan = document.createElement("span");
    priceSpan.innerText = Products[i - 1].price;
    // append the div for the add to cart button
    const addToCartDiv = document.createElement("div");
    // add class "wcf-right"
    addToCartDiv.classList.add("wcf-right");
    // append the button for the add to cart
    const addToCartButton = document.createElement("button");
    // add class "buy-btn"
    addToCartButton.classList.add("buy-btn");
    // append the i for the add to cart
    const addToCartI = document.createElement("i");
    addToCartI.classList.add("fa-solid", "fa-cart-plus");
    // addToCartI.classList.add("fa-cart-shopping");
    // <i class="fa-light fa-cart-shopping"></i>
    // append the divs to the page
    firstRow.appendChild(productOuterDiv);
    productOuterDiv.appendChild(productDiv);
    productDiv.appendChild(imageDiv);
    productDiv.appendChild(textDiv);
    textDiv.appendChild(categoryDiv);
    categoryDiv.appendChild(categorySpan);
    textDiv.appendChild(productNameDiv);
    productNameDiv.appendChild(productNameH3);
    textDiv.appendChild(descriptionDiv);
    descriptionDiv.appendChild(descriptionP);
    textDiv.appendChild(footerDiv);
    footerDiv.appendChild(priceDiv);
    priceDiv.appendChild(priceSpan);
    footerDiv.appendChild(addToCartDiv);
    addToCartDiv.appendChild(addToCartButton);
    addToCartButton.appendChild(addToCartI);
  }
  // )
  let pagesCount = 0;
  if (Products.length == 0) {
    pagesCount = 0;
  } else {
    pagesCount = Math.ceil(Products.length / numberOfCardsPerPage);
  }
  console.log("pageCount  = " + pagesCount);
  renderPaginationSection(page, pagesCount);
}
