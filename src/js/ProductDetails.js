import { products } from "../js/Products.js";
import { renderCards } from "../js/renderCards.js";
var prodID = localStorage.getItem("id");
console.log(prodID);
let Product = products[prodID];
console.log(Product);
let prodImgDiv = document.getElementById("prodImg");
prodImgDiv.src = Product.imgURL;
// productDiv.alt = Product.name;
let prodNameDiv = document.getElementById("prodName");
prodNameDiv.innerText = Product.name;
let prodPriceDiv = document.getElementById("prodPrice");
prodPriceDiv.innerText += " "+Product.price+" $";
let prodDescDiv = document.getElementById("prodDesc");
prodDescDiv.innerText = Product.description;
let prodCategoryDiv = document.querySelector("#prodCategory h4");;
prodCategoryDiv.innerText += " " + Product.category;

renderCards(1,8);

const wishIcon = document.querySelector(".wish-icon i");
console.log(wishIcon);
wishIcon.addEventListener("click", function () {
  if (wishIcon.classList.contains("fa-heart-o")) {
      wishIcon.classList.remove("fa-heart-o");
      wishIcon.classList.add("fa-heart");
  } else {
      wishIcon.classList.remove("fa-heart");
      wishIcon.classList.add("fa-heart-o");
  }
});
