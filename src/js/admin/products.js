import {
  deleteProductById,
  getByPageNumber,
  getUserById,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import { getPaginationHTML, handlePagination } from "./pagination.js";

export function renderProductsPage(container, array, pageNumber, itemsPerPage) {
  const modal = document.querySelector("#modal");
  container.innerHTML = "";
  container.insertAdjacentHTML(
    "beforeend",
    generateTabel(
      generateProductsTableHeader(),
      generateProductsTableBody(
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
    renderProductsPage
  );
  container.addEventListener("click", (e) => {
    const id = e.target.dataset?.id;
    if (!id) return;
    modal.innerHTML = getModalHTML(id);
  });
  modal.addEventListener("click", (e) => {
    if (!e.target.dataset.id) return;
    const id = +e.target.dataset.id;
    deleteProductById(id);
    renderProductsPage(container, state.products, pageNumber, itemsPerPage);
  });
}
export function generateProductsTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
`;
}
export function generateProductsTableBody(arrayOfProducts) {
  return arrayOfProducts
    .map(
      (product) =>
        `<tbody>
      <tr>
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${getUserById(product.sellerId).name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>
      <button class="btn btn-sm btn-danger"  data-bs-toggle="modal" 
       data-bs-target="#modal"            
          data-id="${product.id}">Delete</button>      
      </td>
    </tr>
    </tbody> `
    )
    .join("");
}
