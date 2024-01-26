export function addtoCart(e) {
  let prodID =
    e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("viewProductPage")[0].getAttribute("value");
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
}

