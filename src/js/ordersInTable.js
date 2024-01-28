import { saveStateInLocalStorage, state as stateinmycomputer } from "./model.js";
// localStorage.setItem("state", JSON.stringify(stateinmycomputer));
// localStorage.setItem("orders", JSON.stringify(state.orders));
import { state } from "../js/model.js";

// let state = JSON.parse(localStorage.getItem("state"));

let orders = state.orders;
let myID = 2; // get it from the function
function renderOrders(tableDiv, myID) {
  // render table to print all the orders in a table
  let tableinnerHTML = "";
  let flag = false;
  let myorderscounter = 0;
  let myorderCost = 0;
  let mytotalCost = 0;
  for (let i = 0; i < orders.length; i++) {
    console.log("itrate");
    //   if (myID === orders[i][customerId]) {
    if (orders[i]["customerId"] === myID) {
      console.log(orders[i]["customerId"]);
      myorderscounter++;
      tableinnerHTML += `<div class="table-responsive ">`; // table - responsive;
      tableinnerHTML += `<table class="table table-sm table-striped border-dark table-bordered shadow-lg table-hover caption-top text-center align-middle px-2 mx-2">`;
      tableinnerHTML += `<caption class="h3"> Order# ${myorderscounter} <br>Serial Number (${orders[i]["id"]}) <br>at ${orders[i]["date"]} </caption>`;
      tableinnerHTML += `<thead class="user-select-none "><tr>`;
      tableinnerHTML += `<th>#</th>`;
      orders[i]["items"].every((item) => {
        for (const key in item) {
          switch (key) {
            case "id":
              tableinnerHTML += `<th>S. No.</th>`;
              break;
            case "title":
              tableinnerHTML += `<th>Name</th>`;
              break;
            case "description":
              tableinnerHTML += `<th>Details</th>`;
              break;
            case "img0":
              tableinnerHTML += `<th>Image 1</th>`;
              break;
            case "img1":
              tableinnerHTML += `<th>Image 2</th>`;
              break;
            case "sellerId":
              tableinnerHTML += `<th>Seller</th>`;
              break;
            case "category":
              tableinnerHTML += `<th>Category</th>`;
              break;
            default:
              tableinnerHTML += `<th>${key}</th>`;
              break;
          }
        }
      });
      tableinnerHTML += `<th>Cost</th>`;
      tableinnerHTML += `</tr></thead><tbody class="user-select-none">`;
      let myorderitemscounter = 0;
      orders[i]["items"].forEach((item) => {
        flag = true;
        myorderitemscounter++;
        tableinnerHTML += `<tr><th >${myorderitemscounter}</th>`;
        for (const key in item) {
          if (key === "img0" || key === "img1") {
            tableinnerHTML += `<td class="" style="" >
                                  <img title="Click To Show" src="${item[key]}" class="imageResize img-fluid img-thumbnail" style="max-width: 10vw ">
                                  </img>
                              </td>`;
          } else {
            tableinnerHTML += `<td class="text-wrap lh-1 ${key}">${item[key]}</td>`;
          }
          myorderCost = item["price"] * item["quantity"];
        }
        tableinnerHTML += `<th>${myorderCost}$</th>`;
        mytotalCost += myorderCost;
        myorderCost = 0;
        tableinnerHTML += `</tr>`;
      });

      tableinnerHTML += `</tbody>`;
      tableinnerHTML += `<tfoot class="text-center align-middle" style="vertical-align:bottom">
                        <tr>
                          <td colspan="4"><b>Total Items:</b> ${myorderitemscounter}</td>
                          <td colspan="5">
                            status: ${
                              orders[i]["status"] === "deleverd"
                                ? `<span class="text-success">${orders[i]["status"]}</span>`
                                : `<span class="text-danger">${orders[i]["status"]}</span> 
                                   <input type="checkbox" class="btn-check" id="${i}" autocomplete="off"">
                                   <label class="btn btn-outline-primary" for="${i}">Delevered</label>`
                            } 
                          </td>
                          <td colspan="3"><b>Total Price:</b> ${mytotalCost}$</td>
                        </tr>
                      </tfoot> `;
      tableinnerHTML += `</table>`;
      tableinnerHTML += `</div>`;
      mytotalCost = 0;
    }
  }
  console.log(myorderscounter);
  if (flag === false) {
    // if (myorderscounter === 0) {
    //   // if there is no orders (empty checkout)
    //   tableinnerHTML = "";

    tableinnerHTML = "";
    tableinnerHTML = `<div class="text-center h1 alert alert-danger my-3">No Orders</div>`;
  }

  console.log(tableinnerHTML);
  tableDiv.innerHTML = tableinnerHTML;
}
//status: <span class="text-success">Delivered</span>

// add an event listener to the checkbox
// <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" onchange="doalert(this)
// let chckbx = document.querySelectorAll('input[type="checkbox"]');
// chckbx.addEventListener("change", chckbx.forEach.call((element => {
//   element.addEventListener("change", doalert(element));
// })));

let tableDiv = document.getElementById("table");
renderOrders(tableDiv, myID);
function changeState(e) {
  console.log("changeState");
  swal({
    title: "Delivery Confirmation!",
    text: "Are you sure you want to confirm the delivery?",
    icon: "warning",
    buttons: true,
    dangerMode: false,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Thanks for order from us ❤;", {
        icon: "success",
      });
      orders[e.target.id]["status"] = "deleverd";
      state.orders = orders;
      // localStorage.setItem("state", JSON.stringify(state));
      saveStateInLocalStorage();
      renderOrders(tableDiv, myID);
    } else {
      swal("Your order in safe hands!");
    }
  });

  // var txt;
  // if (confirm("Did you received your order?")) {
  //   orders[e.target.id]["status"] = "deleverd";
  //   state.orders = orders;
  //   localStorage.setItem("state", JSON.stringify(state));
  //   renderOrders(tableDiv, myID);
  // } else {
  //   txt = "You pressed Cancel!";
  // }
}

function addEventListenerByquerySelectorAll(query, event, fun) {
  var list = document.querySelectorAll(query);
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fun, false);
  }
}

addEventListenerByquerySelectorAll(
  'input[type="checkbox"]',
  "change",
  changeState
);
