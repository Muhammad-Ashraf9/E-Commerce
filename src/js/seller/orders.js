import { getAllOrdersByOrderIds } from "../model.js";
let body = document.querySelector('body')
let section = document.getElementById('interface')
// Retrieve the data from localStorage

// Log or use the allOrders array as needed

window.onload = display()

function display(){
  const userDataFromLocalStorage = localStorage.getItem('currentUser');
  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
    // Example usage:
    const orders = getAllOrdersByOrderIds(currentUserData.orders);
    console.log(orders);
    let customHeaders = ['Order ID','Order Date' ,'Product ID','Title','Quantity', 'Price', 'Order Status','Category' ,'Stock'];
    let skip = ['img','sellerId','description',]
// Now orderDetails will contain all the combined orders


  // Create a table element
  let table = document.createElement('table');
    table.setAttribute('id','interface')
    table.setAttribute('class','table')
  // Create header row with custom header names
  let headerRow = table.insertRow();
  for (let customHeader of customHeaders) {
      let th = document.createElement('th');
      th.setAttribute('scope',"col")
      th.textContent = customHeader;
      headerRow.appendChild(th);
    }

    orders.forEach(function (orderInfo) {
      let orderDate = orderInfo[1];
      let orderId = orderInfo[2];
      let row = table.insertRow();
      
      let cell1 = row.insertCell(0);
      cell1.setAttribute('scope',"row")
      cell1.innerHTML = orderId;
      
      let cell2 = row.insertCell(1);
      cell2.setAttribute('scope',"row")
      cell2.innerHTML = orderDate;
      
      for (let key in orderInfo[0]) {
        if (orderInfo[0].hasOwnProperty(key) && !skip.includes(key)) {
            let cell = row.insertCell();
            cell.setAttribute('scope',"row")
            cell.textContent = orderInfo[0][key] || ""; // Display the value or an empty string if undefined
        }
    }
  });
  section.appendChild(table);
}



body.addEventListener('click',(e)=>{
    if (e.target.classList.contains('viewDetails')) {
        location.assign('./viewDetails.html')
    }
})