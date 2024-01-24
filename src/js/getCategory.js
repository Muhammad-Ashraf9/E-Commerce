
export function getCheckedValue() {
  // Get all the checkboxes
  var checkboxes = document.querySelectorAll("#CategoryButtons input[type='radio']");
  // Get the checked value
  var checkedValue = "";
  
  // Loop through each checkbox
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    
    // If the checkbox is checked, set the checked value
    if (checkbox.checked) {
      checkedValue = checkbox.value;
      break; // Exit the loop if a checked value is found
    }
  }
  
  // If no checkbox is checked, set the default value
  if (checkedValue === "") {
    checkedValue = "";
  }
  
  return checkedValue;
}

//<div class="container" id="CategoryButtons">
//  <div id="CategoryButtons" class="container">
//    <ul class="row ">
//      <li class="list-group-item col">
//        <input class="form-check-input me-1" type="radio" value="TVs" id="firstCheckbox">
//        <label class="form-check-label" for="firstCheckbox">TVs</label>
//      </li>
//      <li class="list-group-item col">
//        <input class="form-check-input me-1" type="radio" value="Laptops" id="secondCheckbox">
//        <label class="form-check-label" for="secondCheckbox">Laptops</label>
//      </li>
//      <li class="list-group-item col">
//        <input class="form-check-input me-1" type="radio" value="Phone" id="thirdCheckbox">
//        <label class="form-check-label" for="thirdCheckbox">Phone</label>
//      </li>
//    </ul>
//  </div>
//</div>
