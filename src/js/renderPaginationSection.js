export function renderPaginationSection(page, pagesCount) {
  const pagSec = document.getElementById("paginationSection");
  pagSec.innerHTML = "";
  if (pagesCount == 0) return;

  // Create the pagination buttons
  let pagSecDiv = `<ul class="pagination" style="justify-content: center;">`;

  // Create the < button
  if (page != 1) {
    pagSecDiv += `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
  }

  // Create the page buttons
  for (let i = 1; i <= pagesCount; i++) {
    if (
      i == 1 ||
      i == pagesCount ||
      i == page ||
      (i == page - 1 && i >= 1) ||
      (i == page + 1 && i <= pagesCount)
    ) {
      if(i == page)
        pagSecDiv += `<li class="page-item active"  style="background-color: red;"><a class="page-link" href="#">${i}</a></li>`;
      else
        pagSecDiv += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;

    }

    // Create the ... button
    if ((i == page - 2 && i >= 1) || (i == page + 2 && i <= pagesCount)) {
      pagSecDiv += `<li class="page-item"><a class="page-link" style="pointer-events: none;" href="#">...</a></li>`;
    }
  }

  // Create the > button
  if (page != pagesCount) {
    pagSecDiv += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
  }

  pagSec.innerHTML = pagSecDiv;
}
