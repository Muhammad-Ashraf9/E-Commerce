import { renderCards } from "../js/renderCards.js";
document.addEventListener("DOMContentLoaded",function () {
    let firstRow = document.getElementById("ProductShow");
    console.log(firstRow);
    renderCards(1,4,"","");
})