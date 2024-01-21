import { signOut } from "../auth.js";
import { getCurrentUser, state } from "../model.js";

const main = document.querySelector("main");
const signoutBtn = document.querySelector(".signout");
const chart = document.querySelector("#myChart");

if (!getCurrentUser() || getCurrentUser().accountType !== "admin") {
  location.assign("../html/main.html");
}
signoutBtn.addEventListener("click", () => {
  signOut();
  location.assign("../html/main.html");
});
// Graphs
// eslint-disable-next-line no-unused-vars
// const myChart = new Chart(chart, {
//   type: "line",
//   data: {
//     labels: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     datasets: [
//       {
//         data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
//         lineTension: 0,
//         backgroundColor: "transparent",
//         borderColor: "#007bff",
//         borderWidth: 4,
//         pointBackgroundColor: "#007bff",
//       },
//     ],
//   },
//   options: {
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         boxPadding: 3,
//       },
//     },
//   },
// });
const createdChart = new Chart(chart, {
  type: "bar",
  data: {
    labels: ["Users", "Orders", "Products"],
    datasets: [
      {
        label: "Total",
        data: [state.users.length, state.orders.length, state.products.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
main.insertAdjacentHTML(
  "beforeend",
  generateTabel(state.products.slice(state.products.length - 3))
);

function generateTabel(arrayOfobjects) {
  return `    <div class="table-responsive small">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  ${generateTableHeader(arrayOfobjects[0])}
                </tr>
              </thead>
              <tbody>
             ${arrayOfobjects
               .map((object) => generateTabelRow(object))
               .join("")}
              </tbody>
            </table>
          </div>`;
}
function generateTableHeader(object) {
  let tableHeader = "";
  for (const key in object) {
    tableHeader += `<th scope="col">${key}</th>`;
  }
  return tableHeader;
}
function generateTabelRow(object) {
  let tableRow = "";
  for (const key in object) {
    tableRow += `<td>${object[key]}</td>`;
  }
  return `<tr>${tableRow}</tr>`;
}
