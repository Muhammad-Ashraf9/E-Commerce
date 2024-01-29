import { getAllOrdersByOrderIds } from "../model.js";
let body = document.querySelector('body')
let section = document.getElementById('interface')
// Retrieve the data from localStorage

// Log or use the allOrders array as needed

function display(){
  const userDataFromLocalStorage = localStorage.getItem('currentUser');
  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
  // Example usage:
  const data = getAllOrdersByOrderIds(currentUserData.orders);

  const extractObjects = (arr) => arr.filter(item => typeof item === 'object');

// Combine all objects into a single array
const allObjects = data.reduce((acc, innerArray) => {
  const objectsInInnerArray = extractObjects(innerArray);
  return acc.concat(objectsInInnerArray);
}, []);
console.log(allObjects);
   let table = document.querySelector('table');
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
          <td>${item.orderId}</td>
          <td>${item.orderDate}</td> 
          <td>${item.id}</td> 
          <td>${item.title}</td> 
          <td>${item.category}</td> 
          <td>${item.quantity}</td> 
          <td>${(item.quantity * item.price)}</td> 
          <td>${item.orderStatus}</td> 
        </tr>
      </tbody>
      `
      )
    .join("");
    table.insertAdjacentHTML('beforeend',tbody)
    
}


display()
