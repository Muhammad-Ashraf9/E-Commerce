export function getQuantityFromguestCart(prodID) {
  console.log("this id: " + prodID);
  let state = JSON.parse(localStorage.getItem("state"));
  let guestCart = state.guestCart;
  // for loop in array of objects
  for (let item of guestCart) {
    if (item.id == prodID) {
      console.log(item.quantity);
      return item.quantity;
    }
  }
  return 0;
}
