import { getQuantityFromguestCart } from "./getQuantityFromguestCart.js";
let state = JSON.parse(localStorage.getItem("state"));

// let myID = 2; // get it from the function
// let currentUser = state.currentUser;
// // if(currentUser){ orders of current user }
// let myorders = state.orders.filter((order) => order.customerId == currentUser.id);
// // else { orders of guest user (guestCart) }
// let myguestCart = state.guestCart;

export function addtoCart(e) {
  if (e.target.nodeName == "I" || e.target.nodeName == "BUTTON") {
    var prodID = e.target.id;
    let element =
      e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(
        "quantity"
      )[0];
    console.log(element);
    console.log(prodID);
    let cartGuest = state.guestCart;
    console.log(cartGuest);
    let flag = false;
    for (let ii = 0; ii < cartGuest.length; ii++) {
      if (cartGuest[ii].id == prodID) {
        cartGuest[ii].quantity++;
        flag = true;
      }
    }
    if (!flag) {
      cartGuest.push({ id: parseInt(prodID), quantity: 1 });
    }
    element.value++;
    state.guestCart = cartGuest;
    localStorage.setItem("state", JSON.stringify(state));
  }
}
