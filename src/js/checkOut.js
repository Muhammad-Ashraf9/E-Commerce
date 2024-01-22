(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

      }else{
        document.getElementById("content").innerHTML=`<h1  class="text-center">Your order has been submitted!</h1>
        <h3  class="text-center">You can track your order in your profile page</h3>
        <div class="text-center">
        <div class="text-center">
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
        <i class="fa-regular fa-star fs-1 text-danger"></i>
  </div>
        </div>`
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
let cart=[
  {
      title:"watch1",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:2000.,
      img:"../assets/test1.jpeg",
      num:1
      ,stock:15,
  },
  {
      title:"watch2",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:22.25,
      img:"../assets/test2.jpeg"
      ,num:1
      ,stock:14
  },
  {
      title:"watch3",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:150.50,
      img:"../assets/test1.jpeg"
      ,num:1
      ,stock:13
  },
  {
      title:"watch4",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:11.95,
      img:"../assets/test2.jpeg"
      ,num:1
      ,stock:12
  },
  {
      title:"watch5",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:75.25,
      img:"../assets/test1.jpeg"
      ,num:1
      ,stock:11
  },{
      title:"watch6",
      description:"this is a great watch that has many features like like your great eyes",
      shopeName:"Nike Store",
      price:200.25,
      img:"../assets/test2.jpeg"
      ,num:5
      ,stock:10
  }
]
window.addEventListener("load",function(){
  let numOfItems=0;
  let cards= this.document.getElementById("items");
  generateCards();
  function generateCards(){
   let flag=0;
   cards.innerHTML="";
   if(cart.length==0){
    content.innerHTML=`<h1>your cart is empty !</h1>`;
      //  document.getElementById("content").style.visibility="hidden";
      //  document.getElementById("numOfItems").innerText=`items(0)`
      //  document.getElementById("SubTotal").innerText=total.toFixed(2);
      //  document.getElementById("beforeTax").innerText=parseFloat(document.getElementById("Shipping").innerText)
   }
   total=0;
   numOfItems=0;
   cart.forEach(item => {
       numOfItems+=item.num
       total+=item.price*item.num;
       cards.innerHTML+=`<div id="${flag}" class="card m-auto">
       <div class="row g-0">
         <div  class="col-lg-2">
           <img  src="${item.img}" class="img-fluid rounded" alt="${item.title}">
         </div>
         <div class="col-lg-10">
           
           <div class="card-body d-flex gap-3 flex-nowrap">
             <!-- Information -->
             <div class="col-sm-7 flex-grow-1">
               <h5 class="card-title">${item.title}</h5>
               <p class="card-text">${item.description}</p>
               <p class="card-text"><small class="text-body-secondary">${item.shopeName}</small></p>
             </div>
             <!-- End of information -->
             <!-- Controls -->
             <div class="col-4 pt-4 text-center">
             <button id="close" class="float-end btn btn-lg btn-close rounded-circle"> </button>
             <h3 class="price mt-2 mb-3">${item.price.toFixed(2)}</h3>
             <div class="btn-group numOfItems">
               <button style="background: #eec28c; color:white" class="btn">+</button>
               <span class="fs-2 mx-3">${item.num}</span>
               <button style="background: #B88E2F; color:white" class="btn fs-4">-</button>
             </div>
           </div>
             <!-- End of controls -->
           </div>
           <!-- End of Control and information -->
           </div>
       </div>
     </div>`
     flag++;
     
      });
      document.getElementById("numOfItems").innerText=`items(${numOfItems})`
      document.getElementById("SubTotal").innerText=total.toFixed(2);
      document.getElementById("beforeTax").innerText=(25+total).toFixed(2)
      document.getElementById("Tax").innerText=(total*0.14).toFixed(2);
      document.getElementById("AfterTax").innerText="Egp "+(total+25+total*0.14).toFixed(2)
  }
  
  cards.addEventListener("click",function(e){
   if(e.target.innerText=="+"){
      let cardID=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
      if(cart[cardID].num==cart[cardID].stock){
        alert(`Sorry but there is no more ${cart[cardID].title} in the sellers stock`)
        return;
      }
      cart[cardID].num+=+1;
       generateCards();
  }
  if(e.target.innerText=="-"){
       let cardID=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
       if(cart[cardID].num-1==0)return
       cart[cardID].num-=1;
       generateCards();
   
   }
   if(e.target.id=="close"){
       let cardID=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
       deleteCard(cardID)
   }

   function deleteCard(cardId){ 
       cart.splice(cardId,1);
       console.log(e)
       generateCards();      
   } 
  })



})
