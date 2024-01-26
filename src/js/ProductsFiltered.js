// import { products } from "../js/Products.js";
import { state } from "./model.js";
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
