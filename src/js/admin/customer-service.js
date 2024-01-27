import {
  deleteMessageById,
  deleteProductById,
  getByPageNumber,
  searchByField,
  sortByField,
  state,
} from "../model.js";
import { generateTabel, getModalHTML } from "./dashboard.js";
import {
  getPaginationHTML,
  handleChangingItemsPerPage,
  handlePagination,
} from "./pagination.js";
import { getSelectSearchByHTML } from "./products.js";

export function renderCustomerServicePage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");

  //onchange instead of addEventListener to remove previous event listeners
  search.onchange = (e) => {
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderCustomerServicePage(
      container,
      searchByField(state.messages, newSearchBy.field, newSearchBy.value),
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
      generateCustomerServiceTableHeader(),
      generateCustomerServiceTableBody(
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
    renderCustomerServicePage
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

      renderCustomerServicePage(
        container,
        sortByField(array, sortBy.field, sortBy.order),
        pageNumber,
        itemsPerPage,
        sortBy,
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
      deleteMessageById(id);
      renderCustomerServicePage(
        container,
        state.messages,
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
    renderCustomerServicePage
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
function generateCustomerServiceTableHeader() {
  return `
    <thead>
    <tr>
        <th scope="col" data-field="mId">Message ID</th>
        <th scope="col" data-field="uId">User ID</th>
        <th scope="col" data-field="name">Name</th>
        <th scope="col" data-field="email">Email</th>
        <th scope="col" data-field="message">Message</th>
        <th scope="col" data-field="date">Date</th>
        <th scope="col">Actions</th>
    </tr>`;
}

function generateCustomerServiceTableBody(array) {
  return `
        <tbody>
        ${array
          .map((item) => {
            return `
            <tr>
                <td>${item.mId}</td>
                <td>${item.uId}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.message}</td>
                <td>${new Date(item.date).toISOString().split("T")[0]}</td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" 
       data-bs-target="#modal" data-id="${item.mId}">Delete</button>
                </td>
            </tr>
            `;
          })
          .join("")}
        </tbody>`;
}
