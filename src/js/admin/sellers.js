import { signUp } from "../auth.js";
import { isValidEmail, isValidName, isValidPassword } from "../helper.js";
import {
  deleteSellerById,
  editUserById,
  getByPageNumber,
  getCustomers,
  getSellers,
  getUserById,
  searchByField,
  searchSellerByName,
  sortByField,
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
      <th scope="col" data-field="id" >Id</th>
      <th scope="col" data-field="name" >Name</th>
      <th scope="col" data-field="email">Email</th>
      <th scope="col" data-field="numberOfProducts">No. Products</th>
      <th scope="col" data-field="numberOfOrders">No. Orders</th>
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
  sortBy,
  searchBy
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");

  //set on change event to search input to sellers
  search.onchange = (e) => {
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderSellersPage(
      container,
      searchByField(getSellers(), newSearchBy.field, newSearchBy.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      newSearchBy
    );
  };
  container.innerHTML = "";
  handleAddUser(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    searchBy,
    renderSellersPage,
    "seller"
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
    searchBy,
    renderSellersPage
  );

  //to change the arrow direction of the sorted field after rendering the table
  document.querySelector(
    `[data-field="${sortBy.field}"]`
  ).className = `${sortBy.order}`;

  document.querySelector("table").addEventListener("click", (e) => {
    const field = e.target.dataset?.field;
    if (field) {
      if (sortBy.field === field) {
        sortBy.order = sortBy.order === "asc" ? "desc" : "asc";
      } else {
        sortBy.field = field;
        sortBy.order = "asc";
      }
      renderSellersPage(
        container,
        sortByField(
          getSellers().map((s) => ({
            ...s,
            numberOfProducts: s.products.length,
            numberOfOrders: s.orders.length,
          })),
          sortBy.field,
          sortBy.order
        ),
        pageNumber,
        itemsPerPage,
        sortBy,
        searchBy
      );
    }

    if (e.target.dataset?.delId) {
      modal.innerHTML = getModalHTML(e.target.dataset.delId);
      document.querySelector(".modal-footer").addEventListener("click", (e) => {
        const id = +e.target.dataset?.id;
        if (!id) return;
        deleteSellerById(id);
        renderSellersPage(
          container,
          getSellers(),
          pageNumber,
          itemsPerPage,
          sortBy,
          searchBy
        );
      });
    } else if (e.target.dataset?.editId) {
      const id = +e.target.dataset.editId;
      handleEditUser(
        id,
        container,
        array, //not used as we are using getSellers() instead to get the updated array
        pageNumber,
        itemsPerPage,
        sortBy,
        searchBy,
        renderSellersPage,
        "seller"
      );
    }
  });
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    searchBy,
    renderSellersPage
  );
  container.insertAdjacentHTML("afterbegin", getSelectSearchByHTML());
  const searchBySelectElement = document.querySelector("select[name=searchBy]");
  searchBySelectElement.value = searchBy.field;
  searchBySelectElement.addEventListener("change", (e) => {
    const newSearchBy = { ...searchBy, field: e.target.value };
    renderSellersPage(
      container,
      searchByField(getSellers(), newSearchBy.field, newSearchBy.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      newSearchBy
    );
  });
}

function getSelectSearchByHTML() {
  return `
  <div> Search By
  <select name="searchBy" class="dashborad-select" aria-label="search by">
  <option value="id">id</option>
  <option value="name">name</option>
  <option value="email">email</option>
  </select>
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

export function handleEditUser(
  id,
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy,
  renderFunction,
  userType
) {
  const modal = document.querySelector("#modal");
  modal.innerHTML = getAddModalFormHTML(userType, getUserById(id));
  document.querySelector(".modal-footer").addEventListener("click", (e) => {
    const id = +e.target.dataset?.id;
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
      renderFunction(
        container,
        userType === "customer" ? getCustomers() : getSellers(), //to render with new array after adding new user
        pageNumber,
        itemsPerPage,
        sortBy,
        searchBy
      );
    } catch (error) {
      email.classList.add("is-invalid");
      emailInvalidFeedback.textContent = error.message;
      emailInvalidFeedback.style.display = "block";
    }
  });
}

export function handleAddUser(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy,
  renderFunction,
  userType
) {
  container.insertAdjacentHTML(
    "afterbegin",
    `<button id="add-${userType}" class="btn btn-bg btn-success m-4" data-bs-toggle="modal" data-bs-target="#modal" >Add ${userType}</button>`
  );
  document.querySelector(`#add-${userType}`).addEventListener("click", (e) => {
    modal.innerHTML = getAddModalFormHTML(userType);
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
        signUp(email.value, password.value, name.value, userType);
        document.querySelector("[data-bs-dismiss='modal']").click();
        renderFunction(
          container,
          userType === "customer" ? getCustomers() : getSellers(), //to render with new array after adding new user
          pageNumber,
          itemsPerPage,
          sortBy,
          searchBy
        );
      } catch (error) {
        email.classList.add("is-invalid");
        emailInvalidFeedback.textContent = error.message;
        emailInvalidFeedback.style.display = "block";
      }
    });
  });
}

function getAddModalFormHTML(userType, user) {
  return `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addSellerModalLabel">
        <p class="lead text-success">
        ${
          user
            ? `Update ${user?.name}'s Info`
            : `Add new ${userType} to the store 🤑`
        }
          
         </p>
      
         </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
 
        <div class="input-group ">
          <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" value="${
              user?.email ? user.email : ""
            }">
            <label for="email">Email address</label>
          </div>
          <div class="invalid-feedback email">
              Please choose a valid Email.
           </div>
        </div>
        <div class="input-group has-validation">
          <div class="form-floating mt-3 ">
            <input type="text" class="form-control mt-3" id="userName" placeholder="${userType} Name" value="${
    user?.name ? user.name : ""
  }">
            <label for="userName">${userType} name</label>
          </div>
          <div class="invalid-feedback name">
              Please choose a valid username.
           </div>
        </div>
      <div class="input-group has-validation">
        <div class="form-floating mt-3">
        
          <input type="${
            user?.password ? "text" : "password"
          }" class="form-control mt-3" id="password" placeholder="Password" aria-describedby="invalidCheckPasswordFeedback" value="${
    user?.password ? user.password : ""
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
          user?.id
        }" >Confirm</button>
      </div>
    </div>
  </div>
  `;
}
