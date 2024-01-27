import {getAllOrdersByOrderIds, state} from '../model.js'
let totalOrders = document.querySelector('#totalOrders h3')
let pendingOrders = document.querySelector('#pendingOrders h3')
let deliveredOrders = document.querySelector('#deliveredOrders h3')
let totaProfit = document.querySelector('#totaProfit h3')
document.addEventListener("DOMContentLoaded", function() {
const userDataFromLocalStorage = localStorage.getItem('currentUser');
  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
    // Example usage:
  const orders = getAllOrdersByOrderIds(currentUserData.orders);
  let tot = orders.length;
  if(orders)
        totalOrders.innerText = tot
    else
        totalOrders.innerText = 'There is no oreders available yet'

function countPendingItems(orders, sellerId) {
    let pendingCount = 0;
    
    orders.forEach(order => {
        const [orderDetails] = order; 
        if (orderDetails.sellerId === sellerId && orderDetails.status === "pending") {
            pendingCount += 1;
        }
    });
    
    if(pendingCount)
        pendingOrders.innerText = pendingCount
    else
        pendingOrders.innerText = 'There is no oreders available yet'
}
countPendingItems(orders, state.currentUser.id);

function countDeliverdItems(orders, sellerId) {
    let deliverdCount = 0;
    
    orders.forEach(order => {
        const [orderDetails] = order; 
        if (orderDetails.sellerId === sellerId && orderDetails.status === "deliverd") {
        deliverdCount += 1;
        }
    });
    
    if(deliverdCount)
        deliveredOrders.innerText = deliverdCount
    else
        deliveredOrders.innerText = 'There is no oreders delivered yet'
}
countDeliverdItems(orders, state.currentUser.id);


function profitPerMonth(orders, sellerId) {
    let profit = 0;
    
    orders.forEach(order => {
        const [orderDetails] = order; 
        if (orderDetails.sellerId === sellerId && orderDetails.status === "deliverd") {
            profit += (orderDetails.quantity * orderDetails.price);
        }
    });

    if(profit)
        totaProfit.innerText = profit
    else
        totaProfit.innerText = 'There is no oreders delivered yet'
}
profitPerMonth(orders, state.currentUser.id);
});

let model = document.getElementById('myModal')
let btn = document.querySelector('input[type="button"]')
btn.addEventListener('click',(e)=>{
    console.log(e.target.class);
    model.style.display = 'block';
})
let closeModal = document.getElementsByClassName('close')[0];
closeModal.addEventListener('click',(e)=>{
    console.log(e.target.class);
    model.style.display = 'none';
});

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });