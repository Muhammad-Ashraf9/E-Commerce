// let state = JSON.parse(localStorage.getItem("state"));
import { saveStateInLocalStorage, state } from "./model.js";
// let myID = 2; // get it from the function
// let currentUser = state.currentUser;
// // if(currentUser){ orders of current user }
// let myorders = state.orders.filter((order) => order.customerId == currentUser.id);
// // else { orders of guest user (guestCart) }
// let myguestCart = state.guestCart;

export function addtoCart(e) {
  if (e.target.nodeName == "I" || e.target.nodeName == "BUTTON") {
    var prodID = e.target.id;
    let product = state["products"].find((prod) => prod["id"] == prodID);
    let element =
      e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(
        "quantity"
      )[0];
    if (state.currentUser) {
      let cart = state.currentUser.cart;
      let flag = false;
      let targetI = -1;
      for (let ii = 0; ii < cart.length; ii++) {
        if (cart[ii].id == prodID) {
          cart[ii].quantity++;
          flag = true;
          targetI = ii;
          break;
        }
      }
      if (flag == true && cart[targetI].quantity > product.stock) {
        cart[targetI].quantity--;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, there is no more of this item in the seller's stock",
        });
        return;
      }

      if (!flag) {
        cart.push({ id: parseInt(prodID), quantity: 1 });
      }
      element.value++;
      state.currentUser.cart = cart;
      state.users.forEach((user) => {
        if (user.id == state.currentUser.id) {
          user.cart = cart;
        }
      });
      //localStorage.setItem("state", JSON.stringify(state));
      saveStateInLocalStorage();
    } else {
      let cartGuest = state.guestCart;
      let flag = false;
      let targetI = -1;
      for (let ii = 0; ii < cartGuest.length; ii++) {
        if (cartGuest[ii].id == prodID) {
          cartGuest[ii].quantity++;
          flag = true;
          targetI = ii;
          break;
        }
      }
      if (flag == true && cartGuest[targetI].quantity > product.stock) {
        cartGuest[targetI].quantity--;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, there is no more of this item in the seller's stock",
        });
        return;
      }
      if (!flag) {
        cartGuest.push({ id: parseInt(prodID), quantity: 1 });
      }
      element.value++;
      state.guestCart = cartGuest;
      //localStorage.setItem("state", JSON.stringify(state));
      saveStateInLocalStorage();
    }
  }
}
