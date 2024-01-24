export function getSearchValue() {
    // let value = document.querySelector("searchform").value;
    // let value2 = document.querySelector("input[type='search']").value;
    console.log("from getSearchValue.js");
    // console.log(value2);
    if (document.querySelector("input[type='search']") !== null) {
      return document.querySelector("input[type='search']").value;
    } else {
      return " ";
    }
}

// <!-- Search Bar STARTS -->
// <form action="" id="searchform">
//   <input type="search" placeholder="Search by product" required>
//   <i class="fa fa-search"></i>
//   <a href="javascript:void(0)" id="clear-btn"><i class="fa-solid fa-xmark"></i></a>
// </form>
// <!-- Search Bar ENDS -->
