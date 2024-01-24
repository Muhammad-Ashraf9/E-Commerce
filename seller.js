import { getAllProductsByProductIds } from "./src/js/model.js";
let section = document.getElementById('interface')
let currentUser = localStorage.getItem('currentUser')
const currentUserData = JSON.parse(currentUser);
let allProducts =  getAllProductsByProductIds(currentUserData.products);


window.onload = display(allProducts)

function display(products){

  let customHeaders = ['Product ID', 'Title', 'Description', 'Price','Category', 'Stock','Image'];  
  // Create a table element
  let table = document.createElement('table');
    table.setAttribute('id','productsTable')
  // Create header row with custom header names
  let headerRow = table.insertRow();

  for (let customHeader of customHeaders) {
      let th = document.createElement('th');
      th.textContent = customHeader;
      headerRow.appendChild(th);
    }
    
    // Create rows and cells for data
    for (let item of products) {
        let row = table.insertRow();
        for (let key in item) {
            if(key === 'sellerId'){
                console.log('not important to display it');
            }else{
                if(key === 'image'){
                    let img = document.createElement('img')
                    img.src = item[key]
                    let cell = row.insertCell();
                    cell.appendChild(img);            
                }else{
                    let cell = row.insertCell();
                    cell.textContent = JSON.stringify(item[key]);            
                }
            }
        }
    let cell1 = row.insertCell()
    let cell2= row.insertCell()
    cell1.innerHTML = `<i class="editIcon fa-regular fa-pen-to-square"></i>`;
    cell1.setAttribute('class','editIcon')
    
    cell2.innerHTML = '<i class="deleteIcon fa-solid fa-trash"></i>';
    cell2.setAttribute('class','deleteIcon')
}
// Append the table to the body
section.appendChild(table);
}

 let body = document.querySelector('body');
let editIcon = document.getElementsByClassName(' editIcon')[0]
var modal = document.getElementById('myModal');
var closeModal = document.getElementsByClassName('close')[0];

console.log(editIcon);
body.addEventListener('click', function(e) {
    if (e.target.classList.contains('editIcon')) {
        modal.style.display = 'block';
    }
});
// Add New Product 
body.addEventListener('click', function(e) {
    if (e.target.id == 'addProduct') {
        modal.style.display = 'block';
    }
});


// Close the modal when the close button is clicked
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// function uploadImage() {
    //     const fileInput = document.getElementById('fileInput');
    //     const file = fileInput.files[0];
    
    //     if (file) {
        //         const formData = new FormData();
        //         formData.append('image', file);
        
        //         fetch('/upload', {
            //             method: 'POST',
            //             body: formData
            //         })
            //         .then(response => response.json())
            //         .then(data => {
                //             console.log('Image uploaded:', data);
                //         })
//         .catch(error => {
//             console.error('Error uploading image:', error);
//         });
//     } else {
    //         console.error('No file selected.');
//     }
// }




body.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteIcon')) {
        e.target.parentNode.parentNode.remove()
    }
})