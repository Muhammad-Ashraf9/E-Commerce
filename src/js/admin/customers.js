import {
  deleteCustomerById,
  deleteProductById,
  editUserById,
  getByPageNumber,
  getCustomers,
  getUserById,
  searchCustomerByName,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";
import {
  handleAddUser,
  handleEditUser,
} from "./sellers.js";
export function generateCustomersTabelHead() {
  return `  
  <thead>
    <tr>
      <th scope="col">ID
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">No. orders</th>
           <th scope="col">Date</th>
          <th scope="col">Actions</th>
            </tr>
       </thead>
  `;
}
export function generateCustomersTabelBody(arrayOfCustomers) {
  return arrayOfCustomers
    .map(
      (customer) =>
        `<tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.orders.length}</td>
        <td>${new Date(customer.id).toISOString().split("T")[0]}</td>
        <td>
      <button class="btn btn-sm btn-danger" data-bs-toggle="modal" 
       data-bs-target="#modal" data-del-id="${customer.id}">Delete</button>
        <button class="btn btn-sm btn-primary" data-bs-toggle="modal" 
       data-bs-target="#modal" data-edit-id="${customer.id}">Edit</button>
        </td>
      </tr>`
    )
    .join("");
}

export function renderCustomersPage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy
) {
  const search = document.querySelector("#navbarSearch input");

  //set on change event to search input to sellers
  search.onchange = (e) => {
    renderCustomersPage(
      container,
      searchCustomerByName(e.target.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      searchBy
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
    renderCustomersPage,
    "customer"
  );
  container.insertAdjacentHTML(
    "beforeend",
    generateTabel(
      generateCustomersTabelHead(),
      generateCustomersTabelBody(
        getByPageNumber(array, pageNumber, itemsPerPage)
      )
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
    renderCustomersPage
  );
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    searchBy,
    renderCustomersPage
  );
  document.querySelector("table").addEventListener("click", (e) => {
    if (e.target.dataset?.delId) {
      modal.innerHTML = getModalHTML(+e.target.dataset?.delId);
      document.querySelector(".modal-footer").addEventListener("click", (e) => {
        if (!e.target.dataset.id) return;
        const id = +e.target.dataset.id;
        deleteCustomerById(id);
        renderCustomersPage(
          container,
          getCustomers(),
          pageNumber,
          itemsPerPage
        );
      });
    } else if (e.target.dataset?.editId) {
      const id = +e.target.dataset.editId;
      handleEditUser(
        id,
        container,
        array,
        pageNumber,
        itemsPerPage,
        sortBy,
        searchBy,
        renderCustomersPage,
        "customer"
      );
    }
  });
}
