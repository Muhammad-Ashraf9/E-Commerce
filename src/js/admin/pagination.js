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
  renderFunction
) {
  const pagination = document.querySelector(".pagination");
  pagination.addEventListener("click", (e) => {
    if (!e.target.dataset?.goto) return;
    pageNumber = +e.target.dataset.goto;
    renderFunction(container, array, pageNumber, itemsPerPage);
  });
}
