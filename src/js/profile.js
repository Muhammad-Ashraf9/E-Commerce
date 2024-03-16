import { getCurrentUser, state } from "./model.js";
import renderNav from "./views/Nav.js";
import renderFooter from "./views/Footer.js";
const body = document.querySelector("body");
renderNav(body);
renderFooter(body);
const CurrentUser = getCurrentUser()
window.addEventListener("load",function(){
    document.getElementById("UserFullName").innerText  = CurrentUser.name
    document.getElementById("mail").innerText  = CurrentUser.email
    // document.getElementById("number").innerText  = CurrentUser.
  document.getElementById("username").innerText  = "Hello, "+ CurrentUser.name


})
