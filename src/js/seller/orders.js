import { getAllOrdersByOrderIds,getCurrentUser } from "../model.js";

import renderFooter from "../views/Footer.js";
import renderNav from "../views/Nav.js";
let body = document.querySelector('body')
let section = document.getElementById('interface')
// Retrieve the data from localStorage

// Log or use the allOrders array as needed
const currentUserForAuth = getCurrentUser();
// console.log('from outer auth ');
if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
    // console.log('from inner auth ');
    location.assign("/src/html/NewMain.html");
}
const bodys=document.querySelector("body");
renderNav(bodys);

renderFooter(bodys);

function display(){
  const userDataFromLocalStorage = localStorage.getItem('currentUser');
  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
  // Example usage:
  const data = getAllOrdersByOrderIds(currentUserData.orders);
  // console.log(data);


  const extractObjects = (arr) => arr.filter(item => typeof item === 'object');

// Combine all objects into a single array
const allObjects = data.reduce((acc, innerArray) => {
  const objectsInInnerArray = extractObjects(innerArray);
  return acc.concat(objectsInInnerArray);
}, []);

   let table = document.querySelector('table');
   if (data.length==0) {
    let alert = document.createElement('h1');
    alert.setAttribute('class','alert alert-danger')
    alert.innerText = 'There is no Product to display.'
    table.appendChild(alert)
    return
  }
  let thead = `
  <thead>
    <tr>
      <th scope="col">Order Id</th>
      <th scope="col">Order Date</th>
      <th scope="col">Product Id</th>
      <th scope="col">Title</th>
      <th scope="col">Category</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
`  
  table.insertAdjacentHTML('afterbegin',thead)
  let tbody = allObjects
  .map(
      (item) =>
        `
        <tbody>
        <tr>
          <td data-label = "Order Id">${item.orderId}</td>
          <td data-label = "Order Date">${item.orderDate}</td> 
          <td data-label = "Product Id">${item.id}</td> 
          <td data-label = "Title">${item.title}</td> 
          <td data-label = "Category">${item.category}</td> 
          <td data-label = "Quantity">${item.quantity}</td> 
          <td data-label = "Total Price">${(item.quantity * item.price)}</td> 
          <td data-label = "Order Status">${item.orderStatus}</td> 
        </tr>
      </tbody>
      `
      )
    .join("");
    table.insertAdjacentHTML('beforeend',tbody)
    
}


display()
