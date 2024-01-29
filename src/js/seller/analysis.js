import {getAllOrdersByOrderIds,getCurrentUser, state} from '../model.js'

import renderFooter from '../views/Footer.js'
import renderNav from '../views/Nav.js'
let totalOrders = document.querySelector('#totalOrders h3')
let pendingOrders = document.querySelector('#pendingOrders h3')
let deliveredOrders = document.querySelector('#deliveredOrders h3')
let totaProfit = document.querySelector('#totaProfit h3')
let totalProducts = document.querySelector('#totalProducts h3')
const userDataFromLocalStorage = localStorage.getItem('currentUser');

const bodys=document.querySelector("body");
renderNav(bodys);

renderFooter(bodys);
const currentUserForAuth = getCurrentUser();
console.log('from outer auth ');
if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
    console.log('from inner auth ');
    location.assign("/src/html/NewMain.html");
}


  // Parse the JSON string to get the JavaScript object
  const currentUserData = JSON.parse(userDataFromLocalStorage);
    // Example usage:
  const orders = getAllOrdersByOrderIds(currentUserData.orders);
  console.log(orders);
  let tot = orders.length;
  if(orders)
        totalOrders.innerText = tot
    else
        totalOrders.innerText = 'There is no oreders available yet'

function allProducts(){
  let tot = state.currentUser.products.length
  if(tot)
        totalProducts.innerText = tot
    else
        totalProducts.innerText = 'There is no oreders available yet'
}
allProducts()

function countPendingItems(orders, sellerId) {
    let pendingCount = 0;
    
    orders.forEach(order => {
        const [orderDetails] = order; 
        if (orderDetails.sellerId === sellerId && orderDetails.orderStatus === "pending") {
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
        if (orderDetails.sellerId === sellerId && orderDetails.orderStatus === "deleverd") {
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
        if (orderDetails.sellerId === sellerId && orderDetails.orderStatus === "deleverd") {
          profit += (orderDetails.quantity * orderDetails.price);
        }
    });
    console.log(profit);
    if(profit)
        totaProfit.innerText = profit
    else
        totaProfit.innerText = 'There is no oreders delivered yet'
}
profitPerMonth(orders, state.currentUser.id);

const seller3Products = state.products.filter(product => product.sellerId === state.currentUser.id);

// Extract title, number of sales, and stock for seller3Products
const titles = seller3Products.map(product => product.title);
const numberOfSales = seller3Products.map(product => product.numberofsales);
const stock = seller3Products.map(product => product.stock);

console.log(titles);
console.log(numberOfSales);
console.log(stock);



let model = document.getElementById('myModal')
let model2 = document.getElementById('myModal2')
let btnStock = document.getElementById('stock')
let btnSales = document.getElementById('sales')
const salesChart = document.getElementById('myChart1');
const stockChart = document.getElementById('myChart2');
btnSales.addEventListener('click',(e)=>{
    model.style.display = 'block';
    new Chart(salesChart, {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: '# of sales',
          data: numberOfSales,
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
  })
btnStock.addEventListener('click',(e)=>{
  model2.style.display = 'block';    
  new Chart(stockChart, {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: '# of stock',
        data: stock,
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
})

let closeModal = document.getElementsByClassName('close')[0];
let closeModal2 = document.getElementsByClassName('close2')[0];
closeModal.addEventListener('click',(e)=>{
    model.style.display = 'none';
});
closeModal2.addEventListener('click',(e)=>{
    model2.style.display = 'none';
});

