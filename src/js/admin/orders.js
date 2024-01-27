import {
  getByPageNumber,
  getOrderTotal,
  getProductById,
  getUserById,
  searchByField,
  searchOrdersByCustomerName,
  sortByField,
  state,
} from "../model.js";
import { generateTabel } from "./dashboard.js";
import {
  getPaginationHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";
export function generateOrdersTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col" data-field="id">Order Id</th>
      <th scope="col" data-field="customerId">Customer Id</th>
      <th scope="col">Customer Name</th>
      <th scope="col" data-field="date">Date</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
`;
}
export function generateOrdersTableBody(arrayOfOrders) {
  return arrayOfOrders
    .map(
      (order) =>
        `
      <tbody>
      <tr>
      <td>${order.id}</td>
      <td>${order.customerId}</td>
      <td>${
        getUserById(order.customerId) //better to put all orders data in order object instead of only the id
          ? getUserById(order.customerId).name
          : "Deleted user"
      }</td>
   
    
      <td>${new Date(order.id).toISOString().split("T")[0]}</td>
      <td>${getOrderTotal(order)}</td>
    </tr> 
    </tbody>
    `
    )
    .join("");
}
export function renderOrdersPage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy
) {
  //set on change event to search input to sellers
  const search = document.querySelector("#navbarSearch input");

  //set on change event to search input to sellers
  search.onchange = (e) => {
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderOrdersPage(
      container,
      searchByField(state.orders, newSearchBy.field, newSearchBy.value),
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
      generateOrdersTableHeader(),
      generateOrdersTableBody(getByPageNumber(array, pageNumber, itemsPerPage))
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
    renderOrdersPage
  );
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    sortBy,
    searchBy,
    renderOrdersPage
  );


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

      renderOrdersPage(
        container,
        sortByField(state.orders, sortBy.field, sortBy.order),
        pageNumber,
        itemsPerPage,
        sortBy,
        searchBy
      );
    }


  });
  container.insertAdjacentHTML("afterbegin", getSelectSearchByHTML());
  const searchBySelectElement = document.querySelector("select[name=searchBy]");
  searchBySelectElement.value = searchBy.field;
  searchBySelectElement.addEventListener("change", (e) => {
    const newSearchBy = { ...searchBy, field: e.target.value };
    renderOrdersPage(
      container,
      searchByField(state.orders, newSearchBy.field, newSearchBy.value),
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
  <option value="id">Order Id</option>
  <option value="customerId">customer Id</option>
  </select>
  </div>
  `;
}
