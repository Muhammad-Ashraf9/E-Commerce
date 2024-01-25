import {
  deleteCustomerById,
  deleteProductById,

  getByPageNumber,
  getCustomers,
  getUserById,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import { getPaginationHTML, handlePagination } from "./pagination.js";
export function generateCustomersTabelHead() {
  return `<td>id</td>
  <td>name</td>
  <td>Email</td>
  <td>number of orders</td>
  <td>Date</td>
    <td>Actions</td>
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
       data-bs-target="#modal" data-id="${customer.id}">Delete</button>
        <button class="btn btn-sm btn-primary" data-bs-toggle="modal" 
       data-bs-target="#modal" data-id="${customer.id}">Edit</button>
        </td>
      </tr>`
    )
    .join("");
}

export function renderCustomersPage(
  container,
  array,
  pageNumber,
  itemsPerPage
) {
  container.innerHTML = "";
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
    renderCustomersPage
  );
  document.querySelector("table").addEventListener("click", (e) => {
    console.log("Customers table event");
    //every time i navigate to customers it adds this event same with proucts (can delete prouct and customer )
    // sol: remove event listener before adding it again or ad event listener to the table that got rendered
    const id = e.target.dataset?.id;
    if (!id) return;
    modal.innerHTML = getModalHTML(id);
    document.querySelector(".modal-footer").addEventListener("click", (e) => {
      console.log("modal-footer from customers");
      if (!e.target.dataset.id) return;
      const id = +e.target.dataset.id;
      deleteCustomerById(id);
      renderCustomersPage(container, getCustomers(), pageNumber, itemsPerPage);
    });
  });
}
