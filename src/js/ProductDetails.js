// import { products } from "../js/Products.js";
// import { state } from "./model.js";
import { renderCards } from "../js/renderCards.js";
import { ProductsFiltered } from "./ProductsFiltered.js";
import {
  changeCartItemCount,
  getCurrentCart,
  getCurrentUser,
  getProductById,
} from "./model.js";

let prodID = localStorage.getItem("id");
// get data from local storage
let state = JSON.parse(localStorage.getItem("state"));
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

let parentDiv = document.querySelector(".numOfItems");
Array.from(parentDiv.children).forEach((child) => {
  child.id = `${prodID}`;
});
// add the quantity of this item in the span
let mycart = getCurrentCart();
// fint the item in the cart (by id)
let item = mycart.filter((item) => item.id == prodID);
if (item.length > 0) {
  document.querySelector(".numOfItems span").innerText = item[0].quantity;
} else {
  document.querySelector(".numOfItems span").innerText = 0;
}

// Render after click on the pagination buttons
let numberOfCardsPerPage = 4;
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

// const cartIcon = document.querySelector(".cart-icon i");
// cartIcon.addEventListener("click", function (event) {
//   let cart = getCurrentCart();
//   if (event.target.innerText === "+") {
//     changeCartItemCount(prodID, cart.filter((item) => item.id === prodID).length + 1);
//   }
// });
  let cartElement = getCurrentCart().map((item) => ({
    id: prodID
  }));
  console.log(cartElement);

window.addEventListener("load", function () {
  let state = JSON.parse(localStorage.getItem("state"));
  let me = state.currentUser;
  if (me) {
    let mycart = me.cart;
    let item = mycart.filter((item) => item.id == prodID);
    if (item.length > 0) {
      document.querySelector(".numOfItems span").innerText = item[0].quantity;
    } else {
      document.querySelector(".numOfItems span").innerText = 0;
    }
  } else {
    let mycart = state.guestCart;
    let item = mycart.filter((item) => item.id == prodID);
    if (item.length > 0) {
      document.querySelector(".numOfItems span").innerText = item[0].quantity;
    } else {
      document.querySelector(".numOfItems span").innerText = 0;
    }
  }
  // listen to the + and - buttons and
  // change the quantity in the cart accordingly and
  // change the counter in the cart icon
  

  let cards = this.document.getElementById("items");
  cards.addEventListener("click", function (e) {
    if (e.target.innerText == "+") {
      let cardID = +e.target.id;
      console.log(cardID);
      console.log(cart);
      if (cart[cardID].quantity == cart[cardID].id.stock) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, there is no more of this item in the seller's stock",
        });
        return;
      }
      changeCartItemCount(cart[cardID].id.id, cart[cardID].quantity + 1);
      cart[cardID].quantity += +1;
      // change the counter in the cart icon
      document.querySelector(".numOfItems span").innerText++;
    }
    if (e.target.innerText == "-") {
      let cardID = e.target.id;
      console.log(cardID);
      if (cart[cardID].quantity - 1 == 0) return;
      changeCartItemCount(cart[cardID].product.id, cart[cardID].quantity - 1);
      cart[cardID].quantity += -1;
      // change the counter in the cart icon
      document.querySelector(".numOfItems span").innerText--;
    }
  });
});
