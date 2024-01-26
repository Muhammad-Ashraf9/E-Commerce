import { state } from "./model.js";
let orders = state.orders;
let myID = 1; // get it from the function

// render table to print all the orders in a table
let tableinnerHTML = "";
let myorderscounter = 0;
for (let i = 0; i < orders.length; i++) {
  //   if (myID === orders[i][customerId]) {
  if (myID === 1) {
    myorderscounter++;
    tableinnerHTML += `<div class=" ">`; // table - responsive;
    tableinnerHTML += `<table class="table table-sm table-striped border-dark table-bordered shadow-lg table-hover caption-top text-center align-middle px-2 mx-2">`;
    tableinnerHTML += `<caption class="h3"> Order# ${i + 1} <br>Serial Number (${orders[i]["id"]}) <br>at ${orders[i]["date"]} </caption>`;
    tableinnerHTML += `<thead class="user-select-none "><tr>`;
    tableinnerHTML += `<th>#</th>`;
    orders[i]["items"].every((item) => {
      for (const key in item) {
        tableinnerHTML += `<th>${key}</th>`;
      }
    });
    tableinnerHTML += `</tr></thead><tbody>`;
    let myorderitemscounter = 0;
    orders[i]["items"].forEach((item) => {
      myorderitemscounter++;
      tableinnerHTML += `<tr><th class="user-select-none">${myorderitemscounter}</th>`;
      for (const key in item) {
        if (key === "img") {
            tableinnerHTML += `<td><img src="${item[key]}" class="img-fluid img-thumbnail" style="max-width: 10vw "></img></td>`;
        }else{
            tableinnerHTML += `<td>${item[key]}</td>`;
        }
      }
      tableinnerHTML += `</tr>`;
    });
  }

  // orders[0]["items"].every((item) => {
  //   for (const key in item) {
  //     console.log(key);
  //   }
  // });

  tableinnerHTML += `</tbody>`;
  tableinnerHTML += `  <tfoot style="vertical-align:bottom">
                        <tr style="height:100px">
                          <td>Sum</td>
                          <td>$180</td>
                        </tr>
                      </tfoot> `;
  tableinnerHTML += `</table>`;
  tableinnerHTML += `</div>`;
}
// if (myorderscounter === 0) return;

console.log(tableinnerHTML);
let tableDiv = document.getElementById("table");
tableDiv.innerHTML = tableinnerHTML;
