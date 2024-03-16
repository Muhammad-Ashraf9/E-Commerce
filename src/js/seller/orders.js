import { getAllOrdersByOrderIds,getCurrentUser } from "../model.js";

import renderFooter from "../views/Footer.js";
import renderNav from "../views/Nav.js";
let body = document.querySelector('body')
let section = document.getElementById('interface')
let pendingOrders = document.getElementById('pendingOrders')
// Retrieve the data from localStorage

// Log or use the allOrders array as needed
const currentUserForAuth = getCurrentUser();
console.log('from outer auth ');
if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
    // console.log('from inner auth ');
    location.assign("/src/html/NewMain.html");
}
const bodys=document.querySelector("body");
renderNav(bodys);

renderFooter(bodys);

function display() {
  const userDataFromLocalStorage = localStorage.getItem('currentUser');
  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
  // Example usage:
  const data = getAllOrdersByOrderIds(currentUserData.orders);

  const extractObjects = (arr) => arr.filter(item => typeof item === 'object');
  let pendingOrdersArr = []; // Initialize the array to store pending orders

  // Combine all objects into a single array
  const allObjects = data.reduce((acc, innerArray) => {
    const objectsInInnerArray = extractObjects(innerArray);
    return acc.concat(objectsInInnerArray);
  }, []);

  let table = document.querySelector('table');
  table.innerHTML = ''; // Clear the table
  if (data.length == 0) {
    let alert = document.createElement('h1');
    alert.setAttribute('class', 'alert alert-danger')
    alert.innerText = 'There is no Product to display.'
    table.appendChild(alert)
    return;
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
  `;
  table.insertAdjacentHTML('afterbegin', thead);

  pendingOrdersArr = allObjects.filter(order => order.sellerId === currentUserData.id && order.orderStatus === "pending");
  section.addEventListener('change', (e) => {
    if (e.target.id === 'pendingOrders' && e.target.checked) { // Check if the checkbox is checked
      // pendingOrdersArr = allObjects.filter(order => order.sellerId === currentUserData.id && order.orderStatus === "pending");
      table.innerHTML = ''; // Clear the table
      display(); // Redraw the table with pending orders
    }else if(!e.target.checked){
      table.innerHTML = ''; // Clear the table
      display(); 
    }
  });
  
  let tbody;
  if (pendingOrders.checked) {
    tbody = pendingOrdersArr
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
  } else if(!pendingOrders.checked) {
    tbody = allObjects
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
  }

  table.insertAdjacentHTML('beforeend', tbody);



}



// function display(){
//   const userDataFromLocalStorage = localStorage.getItem('currentUser');
//   // Parse the JSON string to get the JavaScript object
//   const currentUserData = JSON.parse(userDataFromLocalStorage);
//   // Example usage:
//   const data = getAllOrdersByOrderIds(currentUserData.orders);
//   // console.log(data);


//   const extractObjects = (arr) => arr.filter(item => typeof item === 'object');

// // Combine all objects into a single array
// const allObjects = data.reduce((acc, innerArray) => {
//   const objectsInInnerArray = extractObjects(innerArray);
//   return acc.concat(objectsInInnerArray);
// }, []);
// console.log(allObjects);
//    let table = document.querySelector('table');
//    if (data.length==0) {
//     let alert = document.createElement('h1');
//     alert.setAttribute('class','alert alert-danger')
//     alert.innerText = 'There is no Product to display.'
//     table.appendChild(alert)
//     return
//   }
//   let thead = `
//   <thead>
//     <tr>
//       <th scope="col">Order Id</th>
//       <th scope="col">Order Date</th>
//       <th scope="col">Product Id</th>
//       <th scope="col">Title</th>
//       <th scope="col">Category</th>
//       <th scope="col">Quantity</th>
//       <th scope="col">Total Price</th>
//       <th scope="col">Status</th>
//     </tr>
//   </thead>
// `  
//   table.insertAdjacentHTML('afterbegin',thead)
//   let tbody = allObjects
//   .map(
//       (item) =>
//         `
//         <tbody>
//         <tr>
//           <td data-label = "Order Id">${item.orderId}</td>
//           <td data-label = "Order Date">${item.orderDate}</td> 
//           <td data-label = "Product Id">${item.id}</td> 
//           <td data-label = "Title">${item.title}</td> 
//           <td data-label = "Category">${item.category}</td> 
//           <td data-label = "Quantity">${item.quantity}</td> 
//           <td data-label = "Total Price">${(item.quantity * item.price)}</td> 
//           <td data-label = "Order Status">${item.orderStatus}</td> 
//           </tbody>
//           </tr>
//       `
//       )
//     .join("");
//     table.insertAdjacentHTML('beforeend',tbody)

    
//     let pendingOrdersArr = []; // Initialize the array to store pending orders
    
//     section.addEventListener('change', (e) => {
//     if (e.target.id === 'pendingOrders' && e.target.checked) { // Check if the checkbox is checked
//       pendingOrdersArr = allObjects.filter(order => order.sellerId === currentUserData.id && order.orderStatus === "pending");
//       console.log(pendingOrdersArr);
//     }
//   });
// }
  

display()