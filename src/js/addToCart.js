export function addtoCart(e) {
  console.log("before adding to cart");
  console.log(e);
  let prodID =
    e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("viewProductPage")[0].id;
    console.log(prodID);
  let element =
    e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("quantity")[0];
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

