import {
  deleteProductById,
  getByPageNumber,
  getUserById,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import { getPaginationHTML, handlePagination } from "./pagination.js";
export function generateSellersTabelHead() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Email</th>
      <th scope="col">Products Number</th>
      <th scope="col">Orders Number</th>
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
        <button class="btn btn-sm btn-danger"  data-id="${seller.id}">Delete</button>
        <button class="btn btn-sm btn-primary"  data-id="${seller.id}">Edit</button>
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
  modal
) {
  container.innerHTML = "";
  container.insertAdjacentHTML(
    "afterbegin",
    `<button class="btn btn-bg btn-success m-4" data-bs-toggle="modal" data-bs-target="#modal" >Add Seller</button>`
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
    renderSellersPage
  );
  container.addEventListener("click", (e) => {
    const id = e.target.dataset?.id;
    if (!id) return;
    if (e.target.textContent === "Delete") {
      console.log("id :>> ", id);
      deleteUserById(id);
      renderSellersPage(container, getSellers(), pageNumber, itemsPerPage);
    }
    // pageNumber should be 1
  });
}

function getAddSellerModalFormHTML() {
  return `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addSellerModalLabel">
        <div class="alert alert-success" role="alert">Add Seller</div></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="alert alert-success" role="alert">
      Add Seller to the store 🤑
      </div>
      </div>
      <div class="modal-footer d-flex justify-content-around">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger"    data-bs-dismiss="modal" data-id="${id}">Delete</button>
      </div>
    </div>
  </div>
  `;
}
