
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
