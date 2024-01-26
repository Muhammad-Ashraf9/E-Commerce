export function getSearchValue() {
  // let value = document.querySelector("searchform").value;
  // let value2 = document.querySelector("input[type='search']").value;
  if (document.querySelector("input[type='search']") !== null) {
    return document.querySelector("input[type='search']").value;
  } else {
    return "";
  }
}

