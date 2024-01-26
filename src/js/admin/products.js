import {
  deleteProductById,
  getByPageNumber,
  getUserById,
  searchProductsByTitle,
  sortByField,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  getSelectItemsPerPageHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";

export function renderProductsPage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");
  // search.replaceWith(search.cloneNode(true)); //to remove event listener

  search.onchange = (e) => {
    renderProductsPage(
      container,
      searchProductsByTitle(e.target.value),
      pageNumber,
      itemsPerPage,
      sortBy
    );
  };

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
    sortBy,
    renderProductsPage
  );
  document.querySelector("table").addEventListener("click", (e) => {
    const field = e.target.dataset?.field;
    if (field) {
      if (sortBy.field === field) {
        sortBy.order = sortBy.order === "asc" ? "desc" : "asc";
      } else {
        sortBy.field = field;
        sortBy.order = "asc";
      }

      renderProductsPage(
        container,
        sortByField(array, sortBy.field, sortBy.order),
        pageNumber,
        itemsPerPage,
        sortBy
      );
    }

    const id = e.target.dataset?.id;
    if (!id) return;
    modal.innerHTML = getModalHTML(id);
    document.querySelector(".modal-footer").addEventListener("click", (e) => {
      console.log("modal-footer Proucts footer");
      if (!e.target.dataset.id) return;
      const id = +e.target.dataset.id;
      deleteProductById(id);
      renderProductsPage(
        container,
        state.products,
        pageNumber,
        itemsPerPage,
        sortBy
      );
    });
  });
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    renderProductsPage
  );
}
export function generateProductsTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col" data-field="id">ID</th>
      <th scope="col" data-field="title">Product title</th>
      <th scope="col" data-field="description" >Description</th>
      <th scope="col" >Seller Name</th>
      <th scope="col" data-field="price">Price</th>
      <th scope="col" data-field="category">Category</th>
      <th scope="col" >Image</th>
      <th scope="col" >Actions</th>
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
      <td>${product.description}</td>
      <td>${
        getUserById(product.sellerId)
          ? getUserById(product.sellerId).name
          : "Deleted Seller🥲"
      }</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td><img class="table-img--sm"src="${product.img}"/></td>
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
