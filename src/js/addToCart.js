export function addtoCart(e) {
  let prodID =
    e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(
      "viewProductPage"
    )[0].id;
  let element =
    e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(
      "quantity"
    )[0];
  console.log(element);
  // localStorage.setItem("prodID: "+ prodID, 1);
  console.log(prodID);
  if (localStorage.getItem("prodID: " + prodID) == null) {
    localStorage.setItem("prodID: " + prodID, 1);
    element.value = 1;
  } else {
    let prevAmount = localStorage.getItem("prodID: " + prodID);
    prevAmount++;
    localStorage.setItem("prodID: " + prodID, prevAmount);
    element.value = prevAmount;
  }
  console.log("after adding to cart");
  console.log(localStorage.getItem("prodID: " + prodID));
}

// function getProductById(prodID) {
//     return localStorage.getItem(prodID);
// }
// function setPorductBy(params) {

// }
// Save the id inside an array in the local storage
// let prodID = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("viewProductPage")[0].id;
// if (localStorage.getItem("cart") != null) {
// let cart = [];
//     cart = JSON.parse(localStorage.getItem("cart"));
// } else {
//     cart = [];
// }
// cart.push(prodID);
// localStorage.setItem("cart", JSON.stringify(cart));
// console.log(cart);
// console.log(localStorage.getItem("cart"));
// console.log(localStorage.getItem("cart").length);
// console.log(localStorage.getItem("cart")[0]);
// console.log(localStorage.getItem("cart")[1]);

// let prodID = e.target.id;
// localStorage.setItem("prodIDCart", prodID);

// let prodIDCart = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("viewProductPage")[0].id;
// if(localStorage.getItem("prodIDCart")!=null){
//     localStorage.removeItem("prodIDCart");
// }
// localStorage.setItem("prodIDCart", prodIDCart);
// console.log(prodIDCart);
// console.log(localStorage.getItem("prodIDCart"));
