import {
  deleteProductById,
  getByPageNumber,
  getUserById,
  searchProductsByTitle,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  getSelectItemsPerPageHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";

export function renderProductsPage(container, array, pageNumber, itemsPerPage) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");
  // console.log("search.cloneNode(true) :>> ", search.cloneNode(true));
  console.log("search.onchange :>> ", search.onchange);
  // search.replaceWith(search.cloneNode(true)); //to remove event listener
  search.onchange = (e) => {
    console.log("e.target.value :>> ", e.target.value);
    console.log("array :>> ", array);
    console.log(
      "searchProductsByTitle(e.target.value) :>> ",
      searchProductsByTitle(e.target.value)
    );
    renderProductsPage(
      container,
      searchProductsByTitle(e.target.value),
      pageNumber,
      itemsPerPage
    );
  };
  console.log("search.onchange :>> ", search.onchange);

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
  document.querySelector("table").addEventListener("click", (e) => {
    console.log("Proucts table event");

    const id = e.target.dataset?.id;
    if (!id) return;
    modal.innerHTML = getModalHTML(id);
    document.querySelector(".modal-footer").addEventListener("click", (e) => {
      console.log("modal-footer Proucts footer");
      if (!e.target.dataset.id) return;
      const id = +e.target.dataset.id;
      deleteProductById(id);
      renderProductsPage(container, state.products, pageNumber, itemsPerPage);
    });
  });
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    renderProductsPage
  );
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
