import { products } from "../Products.js";


export function renderCategoryButtons(targetDiv) 
{
    targetDiv.innerHTML = "";
    const categoriesDiv = document.createElement("div");
    let categoriesDivClass = "col-md-3 mb-3";
    categoriesDiv.classList.add(categoriesDivClass);
    const categoriesDivButton = document.createElement("button");
    categoriesDivClass = "btn btn-white w-100 align-items-stretch d-flex";
    categoriesDivButton.classList.add(categoriesDivClass);
    categoriesDiv.appendChild(categoriesDivButton);
    
}
