import { signUp } from "../auth.js";
import { isValidEmail, isValidName, isValidPassword } from "../helper.js";
import {
  deleteSellerById,
  editUserById,
  getByPageNumber,
  getSellers,
  getUserById,
  searchSellerByName,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";
export function generateSellersTabelHead() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Email</th>
      <th scope="col">No. Products</th>
      <th scope="col">No. Orders</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
`;
}

export function generateSellersTabelBody(arrayOfSellers) {
  return arrayOfSellers
    .map(
      (seller) =>
        `
        <tbody>
        <tr>
        <td>${seller.id}</td>
        <td>${seller.name}</td>
        <td>${seller.email}</td>
        <td>${seller.products.length}</td>
        <td>${seller.orders.length}</td>
        <td>
        <button class="btn btn-sm btn-danger" data-bs-toggle="modal" 
       data-bs-target="#modal"   data-del-id="${seller.id}">Delete</button>
        <button class="btn btn-sm btn-primary"        data-bs-toggle="modal" 
       data-bs-target="#modal"  data-edit-id="${seller.id}">Edit</button>
        </td>
      </tr>
      </tbody>
      `
    )
    .join("");
}

export function renderSellersPage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");

  //set on change event to search input to sellers
  search.onchange = (e) => {
    renderSellersPage(
      container,
      searchSellerByName(e.target.value),
      pageNumber,
      itemsPerPage
    );
  };
  container.innerHTML = "";
  container.insertAdjacentHTML(
    "afterbegin",
    `<button id="add-seller" class="btn btn-bg btn-success m-4" data-bs-toggle="modal" data-bs-target="#modal" >Add Seller</button>`
  );
  container.insertAdjacentHTML(
    "beforeend",
    generateTabel(
      generateSellersTabelHead(),
      generateSellersTabelBody(getByPageNumber(array, pageNumber, itemsPerPage))
    )
  );
  container.insertAdjacentHTML(
    "beforeend",
    getPaginationHTML(array, pageNumber, itemsPerPage)
  );
  handlePagination(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    renderSellersPage
  );
  document.querySelector("#add-seller").addEventListener("click", (e) => {
    modal.innerHTML = getAddSellerModalFormHTML();
    document.querySelector(".modal-footer").addEventListener("click", (e) => {
      if (!e.target.classList?.contains("btn-success")) return;
      const email = document.querySelector("#email");
      const emailInvalidFeedback = document.querySelector(
        ".invalid-feedback.email"
      );
      const password = document.querySelector("#password");
      const passwordInvalidFeedback = document.querySelector(
        ".invalid-feedback.password"
      );
      const name = document.querySelector("#userName");
      const nameInvalidFeedback = document.querySelector(
        ".invalid-feedback.name"
      );

      emailInvalidFeedback.textContent = `Please choose a Email.`; //to reset the error message after being changed by signUp function
      validateEmail(email, emailInvalidFeedback);
      validatePassword(password, passwordInvalidFeedback);
      validateName(name, nameInvalidFeedback);
      if (
        !isValidEmail(email.value) ||
        !isValidName(name.value) ||
        !isValidPassword(password.value)
      ) {
        return;
      }
      try {
        signUp(email.value, password.value, name.value, "seller");
        document.querySelector("[data-bs-dismiss='modal']").click();
        renderSellersPage(container, getSellers(), pageNumber, itemsPerPage);
      } catch (error) {
        email.classList.add("is-invalid");
        emailInvalidFeedback.textContent = error.message;
        emailInvalidFeedback.style.display = "block";
      }
    });
  });
  document.querySelector("table").addEventListener("click", (e) => {
    if (e.target.dataset?.delId) {
      modal.innerHTML = getModalHTML(e.target.dataset.delId);
      document.querySelector(".modal-footer").addEventListener("click", (e) => {
        const id = +e.target.dataset?.id;
        if (!id) return;
        deleteSellerById(id);
        renderSellersPage(container, getSellers(), pageNumber, itemsPerPage);
      });
    } else if (e.target.dataset?.editId) {
      const id = +e.target.dataset.editId;
      modal.innerHTML = getAddSellerModalFormHTML(getUserById(id));
      document.querySelector(".modal-footer").addEventListener("click", (e) => {
        if (!e.target.classList?.contains("btn-success")) return;
        const id = +e.target.dataset?.id;
        const email = document.querySelector("#email");
        const emailInvalidFeedback = document.querySelector(
          ".invalid-feedback.email"
        );
        const password = document.querySelector("#password");
        const passwordInvalidFeedback = document.querySelector(
          ".invalid-feedback.password"
        );
        const name = document.querySelector("#userName");
        const nameInvalidFeedback = document.querySelector(
          ".invalid-feedback.name"
        );

        emailInvalidFeedback.textContent = `Please choose a Email.`; //to reset the error message after being changed by signUp function
        validateEmail(email, emailInvalidFeedback);
        validatePassword(password, passwordInvalidFeedback);
        validateName(name, nameInvalidFeedback);
        if (
          !isValidEmail(email.value) ||
          !isValidName(name.value) ||
          !isValidPassword(password.value)
        ) {
          return;
        }
        try {
          editUserById(id, email.value, password.value, name.value);
          document.querySelector("[data-bs-dismiss='modal']").click();
          renderSellersPage(container, getSellers(), pageNumber, itemsPerPage);
        } catch (error) {
          email.classList.add("is-invalid");
          emailInvalidFeedback.textContent = error.message;
          emailInvalidFeedback.style.display = "block";
        }
        console.log("sellers");
      });
    }
  });
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    renderSellersPage
  );
}

export function getAddSellerModalFormHTML(seller) {
  return `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addSellerModalLabel">
        <p class="lead text-success">
        ${
          seller
            ? `Update ${seller?.name}'s Info`
            : "Add new seller to the store 🤑"
        }
          
         </p>
      
         </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
 
        <div class="input-group ">
          <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" value="${
              seller?.email ? seller.email : ""
            }">
            <label for="email">Email address</label>
          </div>
          <div class="invalid-feedback email">
              Please choose a Email.
           </div>
        </div>
        <div class="input-group has-validation">
          <div class="form-floating mt-3 ">
            <input type="text" class="form-control mt-3" id="userName" placeholder="Seller Name" value="${
              seller?.name ? seller.name : ""
            }">
            <label for="userName">Seller name</label>
          </div>
          <div class="invalid-feedback name">
              Please choose a username.
           </div>
        </div>
      <div class="input-group has-validation">
        <div class="form-floating mt-3">
        
          <input type="${
            seller?.password ? "text" : "password"
          }" class="form-control mt-3" id="password" placeholder="Password" aria-describedby="invalidCheckPasswordFeedback" value="${
    seller?.password ? seller.password : ""
  }">
       
          <label for="password">Password</label>
        </div>
            <div class="invalid-feedback password" id="invalidCheckPasswordFeedback">
              Password must be at least 8 characters, at least a symbol, upper and lower case letters and a number.
           </div>
        </div>

      </div>
      <div class="modal-footer d-flex justify-content-around">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-success" data-id="${
          seller?.id
        }" >Confirm</button>
      </div>
    </div>
  </div>
  `;
}

function validateEmail(email, emailInvalidFeedback) {
  if (!isValidEmail(email.value)) {
    email.classList.add("is-invalid");
    emailInvalidFeedback.style.display = "block";
  } else {
    email.classList.remove("is-invalid");
    emailInvalidFeedback.style.display = "none";
  }
}
function validateName(name, nameInvalidFeedback) {
  if (!isValidName(name.value)) {
    name.classList.add("is-invalid");
    nameInvalidFeedback.style.display = "block";
  } else {
    name.classList.remove("is-invalid");
    nameInvalidFeedback.style.display = "none";
  }
}
function validatePassword(password, passwordInvalidFeedback) {
  if (!isValidPassword(password.value)) {
    password.classList.add("is-invalid");
    passwordInvalidFeedback.style.display = "block";
  } else {
    password.classList.remove("is-invalid");
    passwordInvalidFeedback.style.display = "none";
  }
}

export function handleEditUser(id) {
  modal.innerHTML = getAddSellerModalFormHTML(getUserById(id));
  document.querySelector(".modal-footer").addEventListener("click", (e) => {
    const id = +e.target.dataset?.id;
    console.log("id  seller modal:>> ", id);
    if (!id) return;
    const email = document.querySelector("#email");
    const emailInvalidFeedback = document.querySelector(
      ".invalid-feedback.email"
    );
    const password = document.querySelector("#password");
    const passwordInvalidFeedback = document.querySelector(
      ".invalid-feedback.password"
    );
    const name = document.querySelector("#userName");
    const nameInvalidFeedback = document.querySelector(
      ".invalid-feedback.name"
    );

    emailInvalidFeedback.textContent = `Please choose a Email.`; //to reset the error message after being changed by signUp function
    validateEmail(email, emailInvalidFeedback);
    validatePassword(password, passwordInvalidFeedback);
    validateName(name, nameInvalidFeedback);
    if (
      !isValidEmail(email.value) ||
      !isValidName(name.value) ||
      !isValidPassword(password.value)
    ) {
      return;
    }
    try {
      editUserById(id, email.value, password.value, name.value);
      document.querySelector("[data-bs-dismiss='modal']").click();
    } catch (error) {
      email.classList.add("is-invalid");
      emailInvalidFeedback.textContent = error.message;
      emailInvalidFeedback.style.display = "block";
    }
  });
}
