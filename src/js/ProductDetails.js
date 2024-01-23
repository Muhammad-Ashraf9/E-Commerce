import { products } from "../js/Products.js";
import { renderCards } from "../js/renderCards.js";
var prodID = localStorage.getItem("id");
let Product = products[prodID];
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


  // Render after click on the pagination buttons
  let page = 1;
  let numberOfCardsPerPage = 4
  renderCards(page, numberOfCardsPerPage);

  const pagSec = document.getElementById("paginationSection");
  pagSec.addEventListener("click", function (event) {
    console.log(event.target);
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

      // startCard = (page - 1) * numberOfCardsPerPage + 1;
      // endCard = page * numberOfCardsPerPage;
      // if (endCard > productsCount) {
      //   endCard = productsCount;
      // }
    }
    renderCards(page, numberOfCardsPerPage);
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
// <div class="container " >
//     <div class="row">
//         <div class="col-12 col-md-8">
//             <img src="" alt="" id="prodImg" class="img-fluid ">
//         </div>
//         <div class="col-12 col-md-4">
//             <h2 id="prodName" class="display-3" ></h2>
//             <h3 id="prodPrice" style="display: inline;"></h3>
//             <p id="prodDesc" class="lead" style="display: inline;"></p>
//             <div class="text-white text-center p-3 mb-3" id="prodCategory" style="background-color:#B88E2F;"></div>
//             <button class="btn btn-primary" id="addToCart">Add to Cart</button>
//         </div>
//     </div>
// </div>
// <div class="container mt-5">
//     <h3>Product Reviews</h3>
//     <div class="card">
//         <div class="card-body">
//             <h5 class="card-title">John Doe</h5>
//             <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod
//                 mauris eu
//                 ligula
//                 ultrices, id lacinia nunc tincidunt.</p>
//         </div>
//     </div>
//     <div class="card mt-3">
//         <div class="card-body">
//             <h5 class="card-title">Jane Smith</h5>
//             <p class="card-text">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
//                 curae; Sed
//                 euismod
//                 mauris eu ligula ultrices, id lacinia nunc tincidunt.</p>
//         </div>
//     </div>
// </div>