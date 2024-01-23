import { products } from "../js/Products.js";

export function renderPaginationSection(page, pagesCount) {
  console.log("page: " + page + " pagesCount: " + pagesCount);
  const pagSec = document.getElementById("paginationSection");
  pagSec.innerHTML = "";
  if(pagesCount == 0) return

  // Create the pagination buttons
  const pagSecDiv = document.createElement("ul");
  pagSecDiv.classList.add("pagination");
  pagSecDiv.setAttribute("style", "justify-content: center;");

  // Create the < button
  if (page != 1) {
    const pagSecDivLiLeft = document.createElement("li");
    pagSecDivLiLeft.classList.add("page-item");
    pagSecDiv.appendChild(pagSecDivLiLeft);
    const pagSecDivLiLeftA = document.createElement("a");
    pagSecDivLiLeftA.classList.add("page-link");
    pagSecDivLiLeftA.setAttribute("href", "#");
    pagSecDivLiLeftA.innerText = "Previous";
    pagSecDivLiLeft.appendChild(pagSecDivLiLeftA);
    pagSecDiv.appendChild(pagSecDivLiLeft);
    pagSec.appendChild(pagSecDiv);
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
      console.log("i: " + i + " page: " + page);
      const pagSecDivLi = document.createElement("li");
      pagSecDivLi.classList.add("page-item");
      if (i == page) {
        pagSecDivLi.classList.add("active");
      }
      const pagSecDivLiA = document.createElement("a");
      pagSecDivLiA.classList.add("page-link");
      pagSecDivLiA.setAttribute("href", "#");
      pagSecDivLiA.innerText = i;
      pagSecDiv.appendChild(pagSecDivLi);
      pagSecDivLi.appendChild(pagSecDivLiA);
    }

    if ((i == page - 2 && i >= 1) || (i == page + 2 && i <= pagesCount)) {
      const pagSecDivLi = document.createElement("li");
      pagSecDivLi.classList.add("page-item");
      const pagSecDivLiA = document.createElement("a");
      pagSecDivLiA.classList.add("page-link");
      pagSecDivLiA.setAttribute("href", "#");
      pagSecDivLiA.classList.add("disabled");
      pagSecDivLiA.innerText = "...";
      pagSecDiv.appendChild(pagSecDivLi);
      pagSecDivLi.appendChild(pagSecDivLiA);
    }
  }

  // Create the > button
  if (page != pagesCount) {
    const pagSecDivLiRight = document.createElement("li");
    pagSecDivLiRight.classList.add("page-item");
    pagSecDiv.appendChild(pagSecDivLiRight);
    const pagSecDivLiRightA = document.createElement("a");
    pagSecDivLiRightA.classList.add("page-link");
    pagSecDivLiRightA.setAttribute("href", "#");
    pagSecDivLiRightA.innerText = "Next";
    pagSecDivLiRight.appendChild(pagSecDivLiRightA);

    pagSecDiv.appendChild(pagSecDivLiRight);
    pagSec.appendChild(pagSecDiv);
  }

  pagSec.appendChild(pagSecDiv);
}
