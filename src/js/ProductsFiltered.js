import { products } from "../js/Products.js";
export let ProductsFiltered = (searchValue, category) => {
  return products.filter((product) => {
    const isMatchingSearchValue = product.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    if (!category) return isMatchingSearchValue;
    const isMatchingCategory = product.category
      .toLowerCase()
      .includes(category.toLowerCase());
    return isMatchingSearchValue && isMatchingCategory;
  });
};
