// import { products } from "../js/Products.js";
import { state as stateinmycomputer } from "./model.js";
localStorage.setItem("state", JSON.stringify(stateinmycomputer));
let state = JSON.parse(localStorage.getItem("state"));

export let ProductsFiltered = (searchValue, category) => {
  return state.products.filter((product) => {
    const isMatchingSearchValue = product.title.toLowerCase().includes(searchValue.toLowerCase());
    if (!category) return isMatchingSearchValue;
    const isMatchingCategory = product.category
      .toLowerCase()
      .includes(category.toLowerCase());
    return isMatchingSearchValue && isMatchingCategory;
  });
};
