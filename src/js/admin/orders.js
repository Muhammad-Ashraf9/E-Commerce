import {
  getByPageNumber,
  getOrderTotal,
  getProductById,
  getUserById,
  searchOrdersByCustomerName,
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
      <th scope="col">ID</th>
      <th scope="col">Customer Name</th>

      <th scope="col">Total</th>
      <th scope="col">Date</th>
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
      <td>${
        getUserById(order.customerId) //better to put all orders data in order object instead of only the id
          ? getUserById(order.customerId).name
          : "Deleted user"
      }</td>
   
    
      <td>${getOrderTotal(order)}</td>
      <td>${new Date(order.id).toISOString().split("T")[0]}</td>
    </tr> 
    </tbody>
    `
    )
    .join("");
}
export function renderOrdersPage(container, array, pageNumber, itemsPerPage) {
  //set on change event to search input to sellers
  const search = document.querySelector("#navbarSearch input");


  //set on change event to search input to sellers
  search.onchange = (e) => {
    renderOrdersPage(
      container,
      searchOrdersByCustomerName(e.target.value),
      pageNumber,
      itemsPerPage
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
    renderOrdersPage
  );
  handleChangingItemsPerPage(
    container,
    array,
    pageNumber,
    itemsPerPage,
    renderOrdersPage
  );
}
