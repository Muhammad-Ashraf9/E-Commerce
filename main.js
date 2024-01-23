import { getAllOrdersByOrderIds } from "./src/js/model.js";
let body = document.querySelector('body')
let section = document.getElementById('interface')
// Retrieve the data from localStorage
const userDataFromLocalStorage = localStorage.getItem('currentUser');

// Parse the JSON string to get the JavaScript object
const currentUserData = JSON.parse(userDataFromLocalStorage);


  // Example usage:
  const allOrders = getAllOrdersByOrderIds(currentUserData.orders);
  
  // Log or use the allOrders array as needed
  
window.onload = display(allOrders)

function display(orders){
  let customHeaders = ['Order ID', 'Product ID', 'Quantity', 'Price', 'Order Status', 'Order Date'];
  
  // Create a new array to store combined order details
  let orderDetails = [];
  
  // Process each order
  for (let order of orders) {
      // Process each item in the items array
    for (let item of order.items) {
        let combinedOrder = {
            'Order ID': order.id,
            'Product ID': item.productId,
            'Quantity': item.quantity,
            'Price': item.price,
            'Order Status': order.status,
            'Order Date': order.date,
    };
    orderDetails.push(combinedOrder);
    }
}

    // console.log(orderDetails);
  // Create a table element
  let table = document.createElement('table');
    table.setAttribute('id','interface')
  // Create header row with custom header names
  let headerRow = table.insertRow();
  let th = document.createElement('th')

  for (let customHeader of customHeaders) {
      let th = document.createElement('th');
      th.textContent = customHeader;
      headerRow.appendChild(th);
    }
    th.innerText = 'viewDetails'
    headerRow.appendChild(th);
    
    // Create rows and cells for data
    for (let orderDetail of orderDetails) {
        let row = table.insertRow();
        for (let key in orderDetail) {
            let cell = row.insertCell();
      cell.textContent = JSON.stringify(orderDetail[key]);
    }
    let cell = row.insertCell()
    cell.innerHTML = '<i class=" viewDetails fa-regular fa-eye"></i>';
    cell.setAttribute('class','viewDetails')
}

// Append the table to the body
section.appendChild(table);

}


// console.log(body);


body.addEventListener('click',(e)=>{
    if (e.target.classList.contains('viewDetails')) {
        location.assign('./viewDetails.html')
    }
})