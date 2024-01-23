import { getProductById, state,getCurrentUser, getUserById, getCurrentCart,changeCartItemCount,DeleteFromCart } from "./model.js";
const user = getCurrentUser();
let ucart = getCurrentCart()
let cart = ucart.map((item) => ({
  product: getProductById(item.id),
  num: item.quantity,
}));


window.addEventListener("load", function () {
  let cards = this.document.getElementById("items");
  generateCards();
  function generateCards() {
 cart =    getCurrentCart().map((item) => ({
  product: getProductById(item.id),
  num: item.quantity,
}));

    let flag = 0;
    cards.innerHTML = "";
    if (cart.length == 0) {
      cards.innerHTML = `<h1>your cart is empty !</h1>`;
      document.getElementById("CheckOut").style.visibility = "hidden";
    }
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.num;
      cards.innerHTML += `<div id="${flag}" class="card m-auto">
        <div class="row g-0">
          <div  class="col-lg-2">
            <img  src="${item.product.img}" class="img-fluid rounded" alt="${
        item.title
      }">
          </div>
          <div class="col-md-10">
            
            <div class="card-body d-flex gap-3 flex-nowrap">
              <!-- Information -->
              <div class="col-sm-7 flex-grow-1">
                <h5 class="card-title">${item.product.title}</h5>
                <p class="card-text">${item.product.description}</p>
                <p class="card-text"><small class="text-body-secondary">${
                  getUserById(item.product.id).name
                }</small></p>
              </div>
              <!-- End of information -->
              <!-- Controls -->
              <div class="col-4 pt-4 text-center">
                <button id="close" class="float-end btn btn-lg btn-close rounded-circle" data-id="${item.product.id}"> </button>
                <h3 class="price mt-2 mb-3">${item.product.price}</h3>
                <div class="btn-group numOfItems">
                  <button style="background: #eec28c; color:white" class="btn">+</button>
                  <span class="fs-2 mx-3">${item.num}</span>
                  <button style="background: #B88E2F; color:white" class="btn fs-4">-</button>
                </div>
              </div>
              <!-- End of controls -->
            </div>
            <!-- End of Control and information -->
            </div>
        </div>
      </div>`;
      flag++;
    });
    document.getElementById("SubTotal").innerText = total
  }

  cards.addEventListener("click", function (e) {
    if (e.target.innerText == "+") {
      let cardID =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.id;
      if (cart[cardID].num == cart[cardID].product.stock) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, there is no more of this item in the seller's stock",
          });
        return;
      }
      changeCartItemCount( cart[cardID].product.id, cart[cardID].num+1);
      cart[cardID].num += +1;
      generateCards();
    }
    if (e.target.innerText == "-") {
      let cardID =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.id;
      if (cart[cardID].num - 1 == 0) return;
      changeCartItemCount( cart[cardID].product.id, cart[cardID].num-1);
      cart[cardID].num += -1;
      generateCards();
    }
    if (e.target.dataset.id) {
      console.log('e.target.dataset.id', e.target.dataset.id)
      const itemId = +e.target.dataset.id
      DeleteFromCart(itemId);
      generateCards();
    }
  });
let CheckOut =  document.getElementById("proceed")
CheckOut.addEventListener("click",function(e){
  if (state.currentUser) {
    if(state.currentUser.accountType === 'customer')
      location.assign("../html/checkout_page.html")
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need to sign in in order to make an order",
    }).then(()=>{
      location.assign('../html/main.html')
    })
  }
  })
});
