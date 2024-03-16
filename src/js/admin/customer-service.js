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

export function renderCustomerServicePage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy = { field: "mId", order: "asc" },
  searchBy = { field: "mId", value: "" }
) {
  const modal = document.querySelector("#modal");
  const search = document.querySelector("#navbarSearch input");

  //onchange instead of addEventListener to remove previous event listeners
  search.onchange = (e) => {
    const newSearchBy = { ...searchBy, value: e.target.value.trim() };

    renderCustomerServicePage(
      container,
      searchByField(state.messages, newSearchBy.field, newSearchBy.value),
      1, //reset page number to 1 on search
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

      renderCustomerServicePage(
        container,
        sortByField(state.messages, newSortBy.field, newSortBy.order),
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
      // console.log("modal-footer Proucts footer");
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
    1, //reset page number to 1 on changing items per page
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
    renderCustomerServicePage(
      container,
      searchByField(state.messages, newSearchBy.field, newSearchBy.value),
      pageNumber,
      itemsPerPage,
      sortBy,
      newSearchBy
    );
  });
}

function getSelectSearchByHTML() {
  return `
  <div class="col-4"> Search By
  <select name="searchBy" class="dashborad-select" aria-label="search by">
  <option value="mId">Message ID</option>
  <option value="uId">User ID</option>
  <option value="name">User Name</option>
  <option value="email">Email</option>
  </select>
  </div>
  `;
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
