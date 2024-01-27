import {
  deleteCustomerById,
  deleteProductById,
  editUserById,
  getByPageNumber,
  getCustomers,
  getUserById,
  searchByField,
  searchCustomerByName,
  sortByField,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";
import { handleAddUser, handleEditUser } from "./sellers.js";
export function generateCustomersTabelHead() {
  return `  
  <thead>
    <tr>
          <th scope="col" data-field="id">Id</th>
          <th scope="col" data-field="name">Name</th>
          <th scope="col" data-field="email">Email</th>
          <th scope="col" data-field="numberOfOrders">Number Of Orders</th>
          <th scope="col" data-field="date">Date</th>
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
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderCustomersPage(
      container,
      searchByField(getCustomers(), newSearchBy.field, newSearchBy.value),
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

  //
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

      renderCustomersPage(
        container,
        sortByField(
          getCustomers().map((c) => ({
            ...c,
            numberOfOrders: c.orders.length,
            date: c.id,
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
  container.insertAdjacentHTML("afterbegin", getSelectSearchByHTML());
  const searchBySelectElement = document.querySelector("select[name=searchBy]");
  searchBySelectElement.value = searchBy.field;
  searchBySelectElement.addEventListener("change", (e) => {
    const newSearchBy = { ...searchBy, field: e.target.value };
    renderCustomersPage(
      container,
      searchByField(getCustomers(), newSearchBy.field, newSearchBy.value),
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
