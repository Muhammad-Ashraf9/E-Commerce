import {
  deleteProductById,
  getByPageNumber,
  getUserById,
  searchByField,
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
  sortBy,
  searchBy
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");
  // search.replaceWith(search.cloneNode(true)); //to remove event listener

  //onchange instead of addEventListener to remove previous event listeners
  search.onchange = (e) => {
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderProductsPage(
      container,
      searchByField(state.products, newSearchBy.field, newSearchBy.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      newSearchBy
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
    searchBy,
    renderProductsPage
  );

  document.querySelector(
    `[data-field="${sortBy.field}"]`
  ).className = `${sortBy.order}`;

  document.querySelector("table").addEventListener("click", (e) => {
    const field = e.target.dataset?.field;
    if (field) {
      const newSortBy = { ...sortBy };
      if (newSortBy.field === field) {
        newSortBy.order = newSortBy.order === "asc" ? "desc" : "asc";
      } else {
        newSortBy.field = field;
        newSortBy.order = "asc";
      }

      renderProductsPage(
        container,
        sortByField(
          state.products.map((p) => ({
            ...p,
            sellerName: getUserById(p.sellerId)?.name || "Deleted Seller🥲",
          })),
          newSortBy.field,
          newSortBy.order
        ),
        pageNumber,
        itemsPerPage,
        newSortBy,
        searchBy
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
        sortBy,
        searchBy
      );
    });
  });
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    searchBy,
    renderProductsPage
  );
  container.insertAdjacentHTML("afterbegin", getSelectSearchByHTML());
  const searchBySelectElement = document.querySelector("select[name=searchBy]");
  searchBySelectElement.value = searchBy.field;
  searchBySelectElement.addEventListener("change", (e) => {
    const newSearchBy = { ...searchBy, field: e.target.value };
    renderProductsPage(
      container,
      searchByField(state.products, newSearchBy.field, newSearchBy.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      newSearchBy
    );
  });
}
export function generateProductsTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col" data-field="id">ID</th>
      <th scope="col" data-field="title">Product title</th>
      <th scope="col" data-field="description" >Description</th>
      <th scope="col" data-field="sellerName">Seller</th>
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
      <td>${getUserById(product.sellerId)?.name || "Deleted Seller🥲"}</td>
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

export function getSelectSearchByHTML() {
  return `
  <div> Search By
  <select name="searchBy" class="dashborad-select" aria-label="search by">
  <option value="id">id</option>
  <option value="title">title</option>
  <option value="description">description</option>
  <option value="category">category</option>
  <option value="price">price</option>
  </select>
  </div>
  `;
}
