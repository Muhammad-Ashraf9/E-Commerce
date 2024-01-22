import { signOut } from "../auth.js";
import {
  getCurrentUser,
  getCustomers,
  getLastAddedProducts,
  getTotalOrdersRevenue,
  getSellers,
  state,
  getUserById,
  getProductById,
  getOrderTotal,
} from "../model.js";
import {
  generateCustomersTabelBody,
  generateCustomersTabelHead,
} from "./customers-admin.js";
import {
  generateSellersTabelBody,
  generateSellersTabelHead,
} from "./sellers-admin.js";

const main = document.querySelector("main");
const signoutBtn = document.querySelector(".signout");
// const chart = document.querySelector("#myChart");
const sidebar = document.querySelector(".sidebar");

if (!getCurrentUser() || getCurrentUser().accountType !== "admin") {
  location.assign("../html/main.html");
}

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

function generateTabel(header, body) {
  return `    <div class="table-responsive small">
            <table class="table table-striped table-sm">
              ${header}
              ${body}
            </table>
          </div>`;
}

function getSummaryCardHTML(array, title) {
  return ` <div class="col-12 col-md-6 col-lg-3 m-auto">
              <div class="summary-card">
                <div class="d-flex justify-content-between">
                  <div>
                    <div class="summary-card__count">${array.length}</div>
                    <div class="summary-card__title">${title}</div>
                  </div>
                  <div class="summary-card__icon">
                    <i class="fa-solid fa-truck-fast"></i>
                  </div>
                </div>
              </div>
            </div>`;
}
function getTotalCardHTML(number, title) {
  return `<div class="col-12 col-md-6 col-lg-4 m-auto">
              <div class="total-card d-flex align-items-center">
                <div class="total-card__icon">
                  <i class="fa-solid fa-money-bill"></i>
                </div>
                <div class="d-flex flex-column">
                  <h3 class="total-card__amount">${number}$</h3>
                  <div class="total-card__title">${title}</div>
                </div>
              </div>
            </div>`;
}

function renderDashboard() {
  main.insertAdjacentHTML("afterbegin", `<canvas id="myChart"></canvas>`);

  console.log("dashboard");
  main.insertAdjacentHTML(
    "afterbegin",
    `<div class="row">${getTotalCardHTML(
      getTotalOrdersRevenue(),
      "Total Revenue"
    )}${getTotalCardHTML(state.products.length, "Total Products")}
      ${getTotalCardHTML(state.orders.length, "Total Orders")}
      </div>`
  );
  main.insertAdjacentHTML(
    "afterbegin",
    `<div class="row">${getSummaryCardHTML(
      state.orders,
      "orders"
    )}${getSummaryCardHTML(state.products, "products")}${getSummaryCardHTML(
      getCustomers(),
      "customers"
    )}${getSummaryCardHTML(getSellers(), "sellers")}</div>`
  );
  const createdChart = new Chart(document.querySelector("#myChart"), {
    type: "bar",
    data: {
      labels: ["Users", "Orders", "Products"],
      datasets: [
        {
          label: "Total",
          data: [
            state.users.length,
            state.orders.length,
            state.products.length,
          ],
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
  main.insertAdjacentHTML("beforeend", generateTabel(getLastAddedProducts(3)));
}

sidebar.addEventListener("click", (e) => {
  console.log("e.target :>> ", e.target);
  if (e.target.classList.contains("nav-link")) {
    console.log("e.target :>> ", e.target);
    const activeLink = document.querySelector(".nav-link.active");
    activeLink.classList.remove("active");
    e.target.classList.add("active");
    main.innerHTML = "";
    switch (e.target.dataset.link) {
      case "dashboard":
        renderDashboard();
        break;
      case "products":
        main.insertAdjacentHTML(
          "beforeend",
          generateTabel(
            generateProductsTableHeader(),
            generateProductsTableBody(state.products)
          )
        );
        break;
      case "orders":
        main.insertAdjacentHTML(
          "beforeend",
          generateTabel(
            generateOrdersTableHeader(),
            generateOrdersTableBody(state.orders)
          )
        );
        break;
      case "customers":
        main.insertAdjacentHTML(
          "beforeend",
          generateTabel(
            generateCustomersTabelHead(),
            generateCustomersTabelBody(getCustomers())
          )
        );
        break;
      case "sellers":
        main.insertAdjacentHTML(
          "beforeend",
          generateTabel(
            generateSellersTabelHead(),
            generateSellersTabelBody(getSellers())
          )
        );
        break;
      default:
        break;
    }
  }
});
signoutBtn.addEventListener("click", () => {
  signOut();
  location.assign("../html/main.html");
});

///
renderDashboard();

function generateProductsTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
`;
}
function generateProductsTableBody(arrayOfProducts) {
  return arrayOfProducts
    .map(
      (product) =>
        `
      <tbody>
      <tr>
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${getUserById(product.sellerId).name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>
      <button class="btn btn-sm btn-danger" data-id="${
        product.id
      }">Delete</button>
      </td>
    </tr>
    </tbody>
    `
    )
    .join("");
}

function generateOrdersTableHeader() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Products</th>
      <th scope="col">Sellers</th>
      <th scope="col">Total</th>
      <th scope="col">Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
`;
}
function generateOrdersTableBody(arrayOfOrders) {
  return arrayOfOrders
    .map(
      (order) =>
        `
      <tbody>
      <tr>
      <td>${order.id}</td>
      <td>${getUserById(order.customerId).name}</td>
      <td>${order.items
        .map((i) => getProductById(i.productId).title)
        .join(",")}</td>
      <td>${order.items
        .map((i) => getUserById(getProductById(i.productId).sellerId))
        .join(",")}</td>
      <td>${getOrderTotal(order)}</td>
      <td>${new Date(order.id).toISOString().split("T")[0]}</td>
      <td>
      <button class="btn btn-sm btn-danger" data-id="${
        order.id
      }">Delete</button>
      </td>
    </tr>
    </tbody>
    `
    )
    .join("");
}
