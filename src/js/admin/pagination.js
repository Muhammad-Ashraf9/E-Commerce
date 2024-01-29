export function getPaginationHTML(array, pageNumber, itemsPerPage) {
  return `
  <nav aria-label="Page navigation example">

  <ul class="pagination justify-content-center">
    
    ${
      pageNumber > 1
        ? `<li class="page-item"><a class="page-link" href="#" data-goto="${
            pageNumber - 1
          }">Previous</a></li>`
        : ""
    }
        <li class="page-item"><a class="page-link" href="#">${pageNumber}</a></li>

    ${
      pageNumber < Math.ceil(array.length / itemsPerPage)
        ? `<li class="page-item" >
          <a class="page-link" href="#" data-goto="${pageNumber + 1}">
            Next
          </a>
        </li>`
        : ""
    }
  </ul>  
  </nav>

  `;
}
export function handlePagination(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy,
  renderFunction
) {
  const pagination = document.querySelector(".pagination");
  pagination.addEventListener("click", (e) => {
    if (!e.target.dataset?.goto) return;
    pageNumber = +e.target.dataset.goto;
    renderFunction(
      container,
      array,
      pageNumber,
      itemsPerPage,
      sortBy,
      searchBy
    );
  });
}

export function getSelectItemsPerPageHTML() {
  return `
  <div class="col-4"> Show
  <select name="itemsPerPage" class="dashborad-select" aria-label="items per page">
  <option value="1">1</option>
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  <option value="25">25</option>
  <option value="50">50</option>
  </select>
  Entries
  </div>
  `;
}

export function handleChangingItemsPerPage(
  container,
  array,
  pageNumber,
  itemsPerPage,
  sortBy,
  searchBy,
  renderFunction
) {
  container.insertAdjacentHTML(
    "afterbegin",
    getSelectItemsPerPageHTML(itemsPerPage)
  );
  const selectElement = document.querySelector("select");
  selectElement.value = itemsPerPage;
  selectElement.addEventListener("change", (e) => {
    renderFunction(
      container,
      array,
      pageNumber,
      +e.target.value,
      sortBy,
      searchBy
    );
  });
}
