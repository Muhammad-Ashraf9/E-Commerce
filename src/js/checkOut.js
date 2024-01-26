import { getProductById, state,getCurrentUser, getUserById,changeCartItemCount,DeleteFromCart,getCurrentCart,saveStateInLocalStorage} from "./model.js";
import {generateRandomId}from "./helper.js"
const user = getCurrentUser(); //getting the user
let ucart =  user.cart ; //checking if state
let flag=false; // intializing a flag to know when to create a knew order
let cart = ucart.map((item) => ({    //fetchin user cart's data  
  product: getProductById(item.id),
  num: item.quantity,
}));
// validating the form and handling the checkout btn

// for (const [key, value] of formData) {
//   userData.push() `${key}: ${value}\n`;
// }
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
   (function(){ document.getElementById("placing").addEventListener('click', event => {
      if (!form.checkValidity()) { //in casse of invalid input
        event.preventDefault()
        event.stopPropagation()
      }else{
        let enough=true; //aflag to check if there is enogh in the stock
        let index;
        let x;
        cart.forEach(item => {
          index=state.products.findIndex(product=>product.id===item.product.id); //getting index of each product 
          if( state.products[index].stock <item.num){   //checking if there is enough in seller's stock
            enough=false;   //if there is more than in the stock 
            x=item;
          }
        });
        if(enough){


          // Get form data using FormData
      

      // Log the form data object to the console (you can replace this with your own logic)

          newOrder();   //function to create all the new order tasks
          Swal.fire({
          title: "Congratulations!",
          text: "Your order has been submitted successfully",
          icon: "success"
        }).then(()=>{
          location.assign('../html/main.html')
        })
        }else{
          Swal.fire({
              title: "Sorry!",
              text: `Your order can't be submitted because their is no more of ${x.product.title}\n in the sellers stock`,
              icon: "error"
            });
        }  
      }
      form.classList.add('was-validated')
    })})()
  })
    console.log(cart);

  function newOrder() {
    if (flag) {
      return;
    }
    flag = true;
    let orderID=generateRandomId();   
    let customerID=getCurrentUser().id;
    let Items=[]; // making an array of products to be put in the order details
    cart.forEach(item => {
      item.product["quantity"]= item.num
      Items.push(item.product)

    });
    var formData = new FormData(document.getElementById('form'));
      // Create an object to store form data
      var formDataObject = {};

      // Populate the object with form data
      formData.forEach(function(value, key){
        formDataObject[key] = value;
      });
      console.log(formData.entries());
    let newOrder = {   //creating a new order object
      id: orderID,  
      items: Items,
      customerId: customerID,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
      customerDetails:formDataObject,
    };
    console.log(newOrder);
    state.orders.push(newOrder)     //pushing the order in the list of orders
    user.orders.push(orderID)       //pushing the order id in the current user's orders' list
    const uindex = state.users.findIndex(user=>user.id === state.currentUser.id)      //getting the customers index in the list of users
    state.users[uindex].orders.push[orderID]//pushing the order id in the customer's orders' list
    let flagx=0;      //a flag to use for later
    let sellers =[];     //array to contain the ids of the sellers in this order
    Items.forEach(item => {        //a loop to update the stock of each product  
      let index=state.products.findIndex(product=>product.id===item.id)   // getting the index of the product in product list
      let sellerIndex=state.users.findIndex(seller=>seller.id===item.sellerId)   // getting the index of the seller in users list
      let productIndex=state.users[sellerIndex].products.findIndex(product=>product.productId===item.id) //gettig the product index in the seller's product list
      state.products[index].stock-=cart[flagx].num ///updating the stock in product list
      if(!sellers.includes(item.sellerId)){  //checking if the seller is already notified with the order id
        sellers.push(item.sellerId)
        state.users[sellerIndex].orders.push(orderID) //notifing the seller with the order id
      }
      
      state.users[sellerIndex].products[productIndex].stock-=cart[flagx].num //updating the stock in the sellers list of products
      user.cart=[];

      flagx++;
    });
    saveStateInLocalStorage();

  };

window.addEventListener("load",function(){
  let cards = this.document.getElementById("items");
  generateCards();
  function generateCards() {
 cart =  getCurrentCart().map((item) => ({
  product: getProductById(item.id),
  num: item.quantity,
}));
   let flag=0;
   cards.innerHTML="";
   if(cart.length==0){
    content.innerHTML=`
    <div class="row p-3" style="background: #F9F1E7;">
      <div class="col-lg-6">
        <span style="background: #F9F1E7;" class="fs-1">your cart is empty !</span>  
      </div>      
      <div class="pt-3 col-lg-6">
        <button style="background:#B88E2F" class="btn "><a class="text-decoration-none text-light" href="main.html">Go to home page</a></button>
        <button style="background:#B88E2F" class="btn ms-2"><a class="text-decoration-none text-light" href="main.html">Go to Products page</a></button>
      </div>
    </ >
    `;
   }
   let total=0;
   let numOfItems=0;
   cart.forEach(item => {
       numOfItems+=item.num
       total+=item.product.price*item.num;
       cards.innerHTML += `<div id="${flag}" class="card m-auto">
        <div class="row g-0">
          <div  class="col-lg-2">
            <img  src="${item.product.img}" class="img-fluid rounded" alt="${item.product.title}">
          </div>
          <div class="col-md-10">
            
            <div class="card-body d-flex gap-3 flex-nowrap">
              <!-- Information -->
              <div class="col-sm-7 flex-grow-1">
                <h5 class="card-title">${item.product.title}</h5>
                <p class="card-text">${item.product.description}</p>
                <p class="card-text"><small class="text-body-secondary">${
                  getUserById(item.product.sellerId).name
                } only ${item.product.stock - item.num} left in the stock</small></p>
              </div>
              <!-- End of information -->
              <!-- Controls -->
              <div class="col-4 pt-4 text-center">
                <button id="close" class="float-end btn btn-lg btn-close rounded-circle" data-id="${item.product.id}"> </button>
                <h3 class="price mt-2 mb-3">${item.product.price}</h3>
                <div class="btn-group numOfItems">
                  <button style="background: #eec28c; color:white" id="${flag}" class="btn">+</button>
                  <span class="fs-2 mx-3">${item.num}</span>
                  <button style="background: #B88E2F; color:white" id="${flag}" class="btn fs-4">-</button>
                </div>
              </div>
              <!-- End of controls -->
            </div>
            <!-- End of Control and information -->
            </div>
        </div>
      </div>`;
     flag++;
     
      });
      //updating the checkout section
      document.getElementById("numOfItems").innerText=`items(${numOfItems})`
      document.getElementById("SubTotal").innerText=total.toFixed(2);
      document.getElementById("beforeTax").innerText=(25+total).toFixed(2)
      document.getElementById("Tax").innerText=(total*0.14).toFixed(2);
      document.getElementById("AfterTax").innerText="Egp "+(total+25+total*0.14).toFixed(2)
  }
  
  cards.addEventListener("click",function(e){
   if(e.target.innerText=="+"){
    let cardID =+e.target.id;
    if (cart[cardID].num >= cart[cardID].product.stock) {
      Swal.fire({
        title: "Sorry!",
        text: `Sorry but there is no more ${cart[cardID].product.title} in the sellers stock`,
        icon: "error"
      });
      return;
    }
    changeCartItemCount( cart[cardID].product.id, cart[cardID].num+1);
    cart[cardID].num += +1;
    flag=false;
    generateCards();
  }
  if(e.target.innerText=="-"){
       let cardID=+e.target.id;
       if(cart[cardID].num-1==0)return
       changeCartItemCount( cart[cardID].product.id, cart[cardID].num-1);
      cart[cardID].num += -1;
      flag=false;
       generateCards();
   
   }
   if (e.target.dataset.id) {
    const itemId = +e.target.dataset.id
    removeFromCart(itemId)
    flag=false;
    generateCards();
  }
  })
  function removeFromCart(itemId){
   
    DeleteFromCart(itemId);
  }
})
