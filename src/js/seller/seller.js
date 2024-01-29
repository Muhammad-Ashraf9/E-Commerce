import { getAllProductsByProductIds,state, saveStateInLocalStorage,getUserById,getProductById, setCurrentUser,deleteProductById} from "../model.js";
let section = document.getElementById('table')
let saveBtn = document.getElementById('AddNewProduct')
let closeBtn = document.getElementById('cancelAdd')
let uploadImg = document.getElementById('fileInput')
let formProduct = document.getElementById('form-product')
let errorMessage = document.querySelector('.error-message')
let currentMode = "";

uploadImg.addEventListener('change', (e) =>{
    const file = uploadImg.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataURL = e.target.result;
            localStorage.setItem('savedImage', dataURL);
        };
        reader.readAsDataURL(file);
    }
})
saveStateInLocalStorage()
let currentUser = localStorage.getItem('currentUser')
const currentUserData = JSON.parse(currentUser);
console.log(currentUserData);


display()

function display(){
    section.innerHTML = ''
    let allProducts = getAllProductsByProductIds(currentUserData.products);
     console.log(allProducts);
    if (!allProducts) {
        let alert = document.createElement('h1');
        alert.setAttribute('class','alert alert-danger')
        alert.innerText = 'There is no Product to display.'
        section.appendChild(alert)
        return
    }
    let customHeaders = ['Product ID', 'Title', 'Description','Category', 'Stock','Price'];
    // Create a table element
    let table = document.createElement('table');
    //table.innerHTML = '';
    table.setAttribute('id','productsTable')
    // table.setAttribute('class','table')
  // Create header row with custom header names
  let headerRow = table.insertRow();
  for (let customHeader of customHeaders) {
      let th = document.createElement('th');
      th.setAttribute('scope',"col")
      th.textContent = customHeader;
      headerRow.appendChild(th);
    }
    for (let i = 0; i < allProducts.length; i++) {
        let row = table.insertRow();
        for (let key in allProducts[i]){
            if(key === 'id'){
                let cell = row.insertCell();
                cell.setAttribute('scope',"row")
                cell.textContent = allProducts[i][key];
                cell.setAttribute('id',allProducts[i][key])
            }
            else if(key === 'description'){
                let cell = row.insertCell();
                cell.setAttribute('scope',"row")
                cell.textContent = (allProducts[i][key]).slice(0,20);
            }else{
                let cell = row.insertCell();
                cell.setAttribute('scope',"row")
                cell.textContent = allProducts[i][key];
            }
        }
        let cell1 = row.insertCell()
        cell1.setAttribute('scope',"row")
        let cell2= row.insertCell()
        cell2.setAttribute('scope',"row")
        let cell3= row.insertCell()
        cell3.setAttribute('scope',"row")
        cell1.innerHTML = `<i class=" fa-regular fa-pen-to-square"></i>`;
        cell2.innerHTML = '<i class=" fa-solid fa-trash"></i>';
        cell3.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

// Append the table to the body
section.appendChild(table)
}


let body = document.querySelector('body');
let modal = document.getElementById('myModal');
let closeModal = document.getElementsByClassName('close')[0];
body.addEventListener('click', function(e) {
    if (e.target.id == 'addProduct') {
        currentMode = "Add";
        errorMessage.innerText = ''
        modal.style.display = 'block';
    }else if(e.target.classList.contains('fa-regular')){
        currentMode = "Edit";
        errorMessage.innerText = ''
        editProduct(e)
        console.log(currentMode);
    }else if(e.target.classList.contains('fa-eye')){
        let productId = e.target.parentNode.parentNode.firstChild.id
        localStorage.setItem("id",productId);
        location.assign('./ProductDetails_for_seller.html')
    }
});



// Close the modal when the close button is clicked
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    formProduct.reset();
    display()
});




closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    formProduct.reset();
    display()
});

//######################################################################################################
//########################### Add New Product To Seller Page ###########################################
//######################################################################################################


let sellerId = JSON.parse(currentUser)

saveBtn.addEventListener('click',(e)=>{
    console.log(sellerId.accountType);
    if (sellerId.accountType === 'seller' && currentMode == "Add") {
        AddNewProduct(e);
    }
    display()
})
function AddNewProduct(e){
    console.log(e);
    e.preventDefault();
    let img = localStorage.getItem('savedImage')
    const imageElement = new Image();
    imageElement.src = img;
    let imageDataURL = imageElement.src;
    let obj = getFormValues()
    try {
        inputValidation(obj)
        let createdProduct ={
            'id' : Date.now(),
            'title' : obj.NewProductName,
            'description' : obj.NewProductDescription,
            'imgURL0': imageDataURL,
            'imgURL1': '',
            'category' : obj.NewProductcatagory,
            'stock' : obj.NewProductQuantity,
            'price' : obj.NewProductprice,
            'prevPrice':-1,
            'sellerId' : sellerId.id,
            'rating' : -1,
            'numberofsales':0,
            'countSold':0,
            'reviews':[],
        }
        let sellerData = getUserById(sellerId.id)
        let productId = {'productId' : createdProduct.id}
        state.products.push(createdProduct)
        state.currentUser.products.push(productId)
        sellerData.products.push(productId)
        saveStateInLocalStorage()
        localStorage.removeItem('savedImage')
        currentMode = ''
        formProduct.reset()
        modal.style.display = 'none';
    } catch (error) {
        console.log(error);
        errorMessage.innerText = error.message;
        errorMessage.style.opacity = 1;
    }
}

//######################################################################################################
//########################### DELETE PRODUCT FROM SELLER PAGE ##########################################
//######################################################################################################
let removeItem = document.querySelectorAll('.fa-trash')
console.log(removeItem);
removeItem.forEach(addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-trash')) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your Product has been deleted.",
                    icon: "success",
                }).then(() => {
                    // Remove the product's row from the table
                    e.target.parentNode.parentNode.remove();
                    // Delete the product
                    deleteProduct(e);
                    // Update the table
                    display();
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your Product is safe :)",
                    icon: "error"
                });
            }
        });
        display();
    }
})
)
function deleteProduct(e){
    if (sellerId.accountType === 'seller') {
        // Delete Product From Products Array
        let productId = e.target.parentNode.parentNode.firstChild.id
        deleteProductById(productId)
        saveStateInLocalStorage()
    }
    //######################################################################################################
    display()
}

//################################## UPDATE PRODUCT #############################################
//######################################################################################################
function editProduct(e){
    currentMode = "Edit";
    if (e.target.classList.contains('fa-pen-to-square')  && currentMode === "Edit"  ) {
        errorMessage.innerText = ''
        let productId = e.target.parentNode.parentNode.firstChild.id
        let product = getProductById(productId)
        localStorage.setItem('tempSavedImage', product.imgURL0);
        fillFormFields(product);
        modal.style.display = 'block';
        // after display model will be wating until user hit save button
        //############################################################
        //############################################################
        saveBtn.addEventListener('click',(e)=>{
            let img = localStorage.getItem('tempSavedImage')
            const imageElement = new Image();
            imageElement.src = img;
            let imageDataURL = imageElement.src;
            let obj = getFormValues()
            try {
                    inputValidation(obj)
                    let updatedProduct ={
                        'id' : product.id,
                        'title' : obj.NewProductName,
                        'description' : obj.NewProductDescription,
                        'imgURL0': imageDataURL,
                        'imgURL1': product.imgURL1,
                        'category' : obj.NewProductcatagory,
                        'stock' : obj.NewProductQuantity,
                        'price' : obj.NewProductprice,
                        'prevPrice':product.prevPrice,
                        'sellerId' : product.sellerId,
                        'rating' : product.rating,
                        'numberofsales':product.numberofsales,
                        'countSold':product.countSold,
                        'reviews':product.reviews,
                    }
                    deleteProductById(updatedProduct.id)
                    state.products.push(updatedProduct)
                    let sellerData = getUserById(updatedProduct.sellerId)
                    let productId = {'productId' : updatedProduct.id}
                    sellerData.products.push(productId)
                    //state.currentUser.products.push(productId)
                    saveStateInLocalStorage()
                    localStorage.removeItem('tempSavedImage')
                    currentMode = ''
                    formProduct.reset()
                    modal.style.display = 'none';
                    Swal.fire({
                        title: "Good job!",
                        text: "Your updates has been saved",
                        icon: "success"
                      });
                    } catch (error) {
                    console.log(error);
                    errorMessage.innerText = error.message;
                    errorMessage.style.opacity = 1;
                }
            display()
        })
    }
}

    // Get the form fields
function getFormValues() {
    let NewProductName = document.getElementById('NewProductName').value
    let NewProductprice = document.getElementById('NewProductprice').value
    let NewProductcatagory = document.getElementById('NewProductcatagory').value
    let NewProductQuantity = document.getElementById('NewProductQuantity').value
    let NewProductDescription = document.getElementById('NewProductDescription').value
    let NewProduct = {
        NewProductName:NewProductName,
        NewProductprice:NewProductprice,
        NewProductcatagory:NewProductcatagory,
        NewProductQuantity:NewProductQuantity,
        NewProductDescription:NewProductDescription,
    }
    return NewProduct
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
//################################## END OF CRUD OPERATION #############################################
//######################################################################################################
function inputValidation(obj){
    if (!/^[\s\S]+$/.test(obj.NewProductName.trim())) {
        throw new Error("Invalid Product Name.");
    }
        // Validate price (numbers only)
    if (!/^\d+$/.test((obj.NewProductprice)) || obj.NewProductprice <= 0 ) {
        console.log(NewProductprice);
        throw new Error("Invalid Product Price. Please enter a valid number.");
    }

    // Validate category (letters and spaces only)
    if (!/^[\s\S]+$/.test(obj.NewProductcatagory)) {
        // Check if NewProductcatagory contains invalid characters
        throw new Error("Invalid Product Category. Only letters and spaces are allowed, and it should be more than 3 characters.");
    }


    // Validate quantity (numbers only)
    if (!/^\d+$/.test(obj.NewProductQuantity) || obj.NewProductQuantity <= 0) {
        // Check if NewProductQuantity is not a positive integer
        throw new Error("Invalid Product Quantity. Please enter a valid positive number.");
    }

    // Validate description (letters and spaces only)
    if (!/^[\s\S]+$/.test(obj.NewProductDescription)) {
        throw new Error("Invalid Description.");

    }
}
