import {
  getAllProductsByProductIds,
  state,
  saveStateInLocalStorage,
  getUserById,
  getProductById,
  setCurrentUser,
  deleteProductById,
  getCurrentUser,
} from "../model.js";
import renderFooter from "../views/Footer.js";
import renderNav from "../views/Nav.js";
let section = document.getElementById("table");
let saveBtn = document.getElementById("AddNewProduct");
let closeBtn = document.getElementById("cancelAdd");
let uploadImg = document.getElementById("fileInput");
let formProduct = document.getElementById("form-product");
let errorMessage = document.querySelector(".error-message");
let currentMode = "";
//const spinner = document.querySelector(".spinner-border");
const currentUserForAuth = getCurrentUser();
let sort = 'sort-up'


if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
  location.assign("/src/html/NewMain.html");
}
//spinner.remove();
uploadImg.addEventListener("change", (e) => {
  const file = uploadImg.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataURL = e.target.result;
        localStorage.setItem("savedImage", dataURL);
      };
      reader.readAsDataURL(file);
    }
});
saveStateInLocalStorage();
// let currentUser = localStorage.getItem("currentUser");
// const currentUserData = JSON.parse(currentUser);
const currentUserData = getCurrentUser();
console.log(currentUserData);

const bodys = document.querySelector("body");
renderNav(bodys);

renderFooter(bodys);

display(getAllProductsByProductIds(currentUserData.products));

function display(allProducts = getAllProductsByProductIds(currentUserData.products)) {
    section.innerHTML = "";
    let table = document.querySelector('table');
    if (!allProducts||allProducts.length==0) {
     let alert = document.createElement('h1');
     alert.setAttribute('class','alert alert-danger')
     alert.innerText = 'There is no Product to display.'
     table.appendChild(alert)
     return
   }
   let thead = `
   <thead>
     <tr>
     <th scope="col" sort="desc" name="id">Product Id <i class="fa-solid fa-${sort}"></i> </th>
     <th scope="col" sort = "desc" name = "" >Title</th>
       <th scope="col" sort = "desc" name = "" >Description</th>
       <th scope="col" sort = "desc" name = "" >Category</th>
       <th scope="col" sort = "desc" name = "stock" >Stock  <i class="fa-solid fa-${sort}"></i> </i> </th>
       <th scope="col" sort = "desc" name = "price" >Price  <i class="fa-solid fa-${sort}"></i> </i> </th>
     </tr>
   </thead>
 `  
  table.insertAdjacentHTML('afterbegin',thead)
   console.log(allProducts);
 let tbody = allProducts
 .map(
     (item) =>
       `
       <tbody>
       <tr>
         <td  data-label = "Product Id" id = ${item.id}>${item.id}</td>
         <td data-label = "Title">  ${item.title}</td> 
         <td data-label = "Description">  ${item.description.slice(0, 20)}</td> 
         <td data-label = "Category">  ${item.category}</td> 
         <td data-label = "Stock">  ${item.stock}</td> 
         <td data-label = "Price">  ${item.price}</td>
         <td data-label = "View">   <i class="fa-solid fa-eye"></i> </td>
         <td data-label = "Delete">   <i class=" fa-solid fa-trash"></i> </td>
         <td data-label = "Edit">   <i class=" fa-regular fa-pen-to-square"></i> </td>
       </tr>
     </tbody>
     `
     )
   .join("");
   table.insertAdjacentHTML('beforeend',tbody)


let sortUp = document.querySelector('.fa-sort-up')
let sortDown = document.querySelector('.fa-sort-down')
let theadForSort = document.querySelector("thead");
theadForSort.addEventListener("click", function (e) {
  console.log(e);
    let colName = e.target.parentNode.getAttribute("name")
    if(e.target.classList.contains('fa-sort-up')){
      allProducts.sort(function (x, y) {
        if (x[colName] > y[colName]) return -100;
        else if (x[colName] < y[colName]) return 100;
        else return 0;
      });
      sort = 'sort-down'
      display(allProducts);
    }else{
      allProducts.sort(function (x, y) {
        if (x[colName] > y[colName]) return 100;
        else if (x[colName] < y[colName]) return -100;
        else return 0
      });
        sort = 'sort-up'
        display(allProducts);
      }
  })

}

// function display() {
//   section.innerHTML = "";
//   let allProducts = getAllProductsByProductIds(currentUserData.products);
//   console.log(allProducts);
//   if (!allProducts) {
//     let alert = document.createElement("h1");
//     alert.setAttribute("class", "alert alert-danger");
//     alert.innerText = "There is no Product to display.";
//     section.appendChild(alert);
//     return;
//   }

//     "Product ID",
//     "Title",
//     "Description",
//     "Category",
//   let customHeaders = [
//     "Stock",
//     "Price",
//   ];
//   // Create a table element
//   let table = document.createElement("table");
//   //table.innerHTML = '';
//   table.setAttribute("id", "productsTable");
//   // table.setAttribute('class','table')
//   // Create header row with custom header names
//   let headerRow = table.insertRow();
//   for (let customHeader of customHeaders) {
//     let th = document.createElement("th");
//     th.setAttribute("scope", "col");
//     th.textContent = customHeader;
//     headerRow.appendChild(th);
//   }
//   for (let i = 0; i < allProducts.length; i++) {
//     let row = table.insertRow();
//     for (let key in allProducts[i]) {
//       if (key === "id") {
//         let cell = row.insertCell();
//         cell.setAttribute("scope", "row");
//         cell.textContent = allProducts[i][key];
//         cell.setAttribute("id", allProducts[i][key]);
//       } else if (key === "description") {
//         let cell = row.insertCell();
//         cell.setAttribute("scope", "row");
//         cell.textContent = allProducts[i][key].slice(0, 20);
//       } else {
//         let cell = row.insertCell();
//         cell.setAttribute("scope", "row");
//         cell.textContent = allProducts[i][key];
//       }
//     }
//     let cell1 = row.insertCell();
//     cell1.setAttribute("scope", "row");
//     let cell2 = row.insertCell();
//     cell2.setAttribute("scope", "row");
//     let cell3 = row.insertCell();
//     cell3.setAttribute("scope", "row");
//     cell1.innerHTML = `<i class=" fa-regular fa-pen-to-square"></i>`;
//     cell2.innerHTML = '<i class=" fa-solid fa-trash"></i>';
//     cell3.innerHTML = '<i class="fa-solid fa-eye"></i>';
//   }

//   // Append the table to the body
//   section.appendChild(table);
// }

let body = document.querySelector("body");
let modal = document.getElementById("myModal");
let closeModal = document.getElementsByClassName("close")[0];
body.addEventListener("click", function (e) {
  if (e.target.id == "addProduct") {
    currentMode = "Add";
    errorMessage.innerText = "";
    modal.style.display = "block";
  } else if (e.target.classList.contains("fa-regular")) {
    currentMode = "Edit";
    errorMessage.innerText = "";
    editProduct(e);
    console.log(currentMode);
  } else if (e.target.classList.contains("fa-eye")) {
    // let productId = e.target.parentNode.parentNode.firstChild.id;
    let productId = e.target.parentNode.parentNode.firstElementChild.id;
    localStorage.setItem("id", productId);
    location.assign("./ProductDetails_for_seller.html");
  }
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  formProduct.reset();
  display();
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  formProduct.reset();
  display();
});

//######################################################################################################
//########################### Add New Product To Seller Page ###########################################
//######################################################################################################

let sellerId = currentUserData

saveBtn.addEventListener("click", (e) => {
  if (sellerId.accountType === "seller" && currentMode == "Add") {
    AddNewProduct(e);
  }
  display(getAllProductsByProductIds( state.currentUser.products))
});
function AddNewProduct(e) {
  // e.preventDefault();
  try {
    let img = localStorage.getItem("savedImage");
    const imageElement = new Image();
    imageElement.src = img;
    let imageDataURL = imageElement.src;
    let obj = getFormValues();
    console.log(imageDataURL);
    console.log(imageDataURL.length);
    inputValidation(obj,imageDataURL);
    let createdProduct = {
      id: Date.now(),
      title: obj.NewProductName,
      description: obj.NewProductDescription,
      imgURL0: imageDataURL,
      imgURL1: imageDataURL,
      category: obj.NewProductcatagory,
      stock: obj.NewProductQuantity,
      price: obj.NewProductprice,
      prevPrice: -1,
      sellerId: sellerId.id,
      rating: -1,
      numberofsales: 0,
      countSold: 0,
      reviews: [],
    };
    let sellerData = getUserById(sellerId.id);
    let productId = { productId: createdProduct.id };
    state.products.push(createdProduct);
    state.currentUser.products.push(productId);
    sellerData.products.push(productId);
    saveStateInLocalStorage();
    localStorage.removeItem("savedImage");
    currentMode = "";
    formProduct.reset();
    modal.style.display = "none";
    // location.reload();
  } catch (error) {
    errorMessage.innerText = error.message;
    errorMessage.style.opacity = 1;
  }
  // display();
}



//######################################################################################################
//######################################### UPDATE PRODUCT #############################################
//######################################################################################################
function editProduct(e) {
  currentMode = "Edit";
  if (
    e.target.classList.contains("fa-pen-to-square") &&
    currentMode === "Edit"
  ) {
    errorMessage.innerText = "";
    // let productId = e.target.parentNode.parentNode.firstChild.id;
    let productId = e.target.parentNode.parentNode.firstElementChild.id;
    let product = getProductById(productId);
    localStorage.setItem("savedImage", product.imgURL0);
    fillFormFields(product);
    modal.style.display = "block";
    // after display model will be wating until user hit save button
    //############################################################
    //############################################################
    saveBtn.addEventListener("click", (e) => {
      let img = localStorage.getItem("savedImage");
      const imageElement = new Image();
      imageElement.src = img;
      let imageDataURL = imageElement.src;
      let obj = getFormValues();
      console.log(imageDataURL);
      try {
        inputValidation(obj,imageDataURL);
        let updatedProduct = {
          id: product.id,
          title: obj.NewProductName,
          description: obj.NewProductDescription,
          imgURL0: imageDataURL,
          imgURL1: imageDataURL,
          category: obj.NewProductcatagory,
          stock: obj.NewProductQuantity,
          price: obj.NewProductprice,
          prevPrice: product.prevPrice,
          sellerId: product.sellerId,
          rating: product.rating,
          numberofsales: product.numberofsales,
          countSold: product.countSold,
          reviews: product.reviews,
        };
        deleteProductById(updatedProduct.id);
        state.products.push(updatedProduct);
        let sellerData = getUserById(updatedProduct.sellerId);
        let productId = { productId: updatedProduct.id };
        sellerData.products.push(productId);
        //state.currentUser.products.push(productId)
        saveStateInLocalStorage();
        localStorage.removeItem("savedImage");
        currentMode = "";
        formProduct.reset();
        modal.style.display = "none";
        Swal.fire({
          title: "Good job!",
          text: "Your updates has been saved",
          icon: "success",
        });
        // location.reload();
      } catch (error) {
        errorMessage.innerText = error.message;
        errorMessage.style.opacity = 1;
      }
      display();
    });
  }
}

// Get the form fields
function getFormValues() {
  let NewProductName = document.getElementById("NewProductName").value;
  let NewProductprice = document.getElementById("NewProductprice").value;
  let NewProductcatagory = document.getElementById("NewProductcatagory").value;
  let NewProductQuantity = document.getElementById("NewProductQuantity").value;
  let NewProductDescription = document.getElementById("NewProductDescription").value;
  let NewProduct = {
    NewProductName: NewProductName,
    NewProductprice: NewProductprice,
    NewProductcatagory: NewProductcatagory,
    NewProductQuantity: NewProductQuantity,
    NewProductDescription: NewProductDescription,
  };
  return NewProduct;
}

// Function to fill in the form fields
function fillFormFields(data) {
  NewProductName.value = data.title;
  NewProductprice.value = data.price;
  NewProductcatagory.value = data.category;
  NewProductQuantity.value = data.stock;
  NewProductDescription.value = data.description;
  // Add logic to handle image if needed
}


//######################################################################################################
//################################## BEGINING OF SORT OPERATION ########################################
//######################################################################################################
// let theadForSort = document.querySelector("thead");
// theadForSort.addEventListener("click", function (e) {
//   console.log(e);
//     dataArr.sort(function (x, y) {
//       if (x[colName].toLowerCase() > y[colName].toLowerCase()) return 100;
//       else if (x[colName].toLowerCase() < y[colName].toLowerCase()) return -100;
//       else return 0;
//     });
//     display() 
// });
//######################################################################################################
//################################## END OF SORT OPERATION #############################################
//######################################################################################################


//######################################################################################################
//########################### DELETE PRODUCT FROM SELLER PAGE ##########################################
//######################################################################################################
let removeItem = document.querySelectorAll(".fa-trash");
// console.log(removeItem);
removeItem.forEach(addEventListener("click", function (e) {
      if (e.target.classList.contains("fa-trash")) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons
                .fire({
                  title: "Deleted!",
                  text: "Your Product has been deleted.",
                  icon: "success",
                })
                .then(() => {
                  // Remove the product's row from the table
                  e.target.parentNode.parentNode.remove();
                  // Delete the product
                  deleteProduct(e);
                  // Update the table
                  // location.reload();
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your Product is safe :)",
                icon: "error",
              });
            }
          });
        display();
      }
    })
  );

function deleteProduct(e) {
  if (sellerId.accountType === "seller") {
    // Delete Product From Products Array
    // console.log(e.target.parentNode.parentNode.firstChild.id);
    // let productId = e.target.parentNode.parentNode.firstChild.id;
    console.log(e.target.parentNode.parentNode.firstElementChild.id);
    let productId = e.target.parentNode.parentNode.firstElementChild.id

    console.log(productId);
    deleteProductById(productId);
    saveStateInLocalStorage();
  }
  display();
}




//######################################################################################################
//################################## END OF CRUD OPERATION #############################################
//######################################################################################################
function inputValidation(obj,img) {
  if (!/^[A-Za-z][A-Za-z0-9\s\S]*$/.test(obj.NewProductName.trim())) {
    throw new Error("Invalid Product Name.");
  } // Validate price (numbers only)
  if (!/^\d+$/.test(obj.NewProductprice) || obj.NewProductprice <= 0) {
    console.log(NewProductprice);
    throw new Error("Invalid Product Price. Please enter a valid number.");
  }

  // Validate category (letters and spaces only)
  if (!/^[A-Za-z][A-Za-z0-9\s\S]*$/.test(obj.NewProductcatagory)) {
    // Check if NewProductcatagory contains invalid characters
    throw new Error(
      "Invalid Product Category. Only letters and spaces are allowed, and it should be more than 3 characters."
    );
  }

  // Validate quantity (numbers only)
  if (!/^\d+$/.test(obj.NewProductQuantity) || obj.NewProductQuantity <= 0) {
    // Check if NewProductQuantity is not a positive integer
    throw new Error(
      "Invalid Product Quantity. Please enter a valid positive number."
    );
  }
  if (img.length <= 35) {
    console.log('GG');
    throw new Error("Invalid Product Image.Product Image required.");
  }

  // Validate description (letters and spaces only)
  if (!/^[A-Za-z][A-Za-z0-9\s\S]*$/.test(obj.NewProductDescription)) {
    throw new Error("Invalid Description.");
  }

}
