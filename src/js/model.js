export const state = {
  currentUser: null,
  users: [
    {
      id: 1,
      name: "ash customer",
      email: "ash@customer.ash",
      password: "ash123",
      orders: [1, 2],
      cart: [1, 2],
      accountType: "customer",
    },
    {
      id: 2,
      name: "ash admin",
      email: "ash@admin.ash",
      password: "ash123",
      accountType: "admin",
    },
    {
      id: 3,
      name: "ash seller",
      email: "ash@seller.ash",
      password: "ash123",
      orders: [1, 2],
      accountType: "seller",
      products: [
        {
          productId: 1,
          stock: 10,
        },
        {
          productId: 2,
          stock: 10,
        },
      ],
    },
  ],
  orders: [
    {
      id: 1,
      items: [
        {
          productId: 3,
          quantity: 2,
          price: 100,
          status: "pending",
        },
        {
          productId: 2,
          quantity: 6,
          price: 10,
          status: "pending",
        },
      ],
      customerId: 1,
      status: "pending",
      date: "1999-07-22",
    },
    {
      id: 2,
      items: [
        {
          productId: 2,
          quantity: 5,
          price: 5,
          status: "pending",
        },
        {
          productId: 4,
          quantity: 10,
          price: 20,
          status: "pending",
        },
      ],
      status: "pending",
      customerId: 1,
      date: "1999-07-22",
    },
  ],
  products: [
    {
      id: 1,
      title: "ashhh",
      description: "dsfsdfsd sdfsd fsd f",
      price: 100,
      sellerId: 3,
      stock: 10,
    },
    {
      id: 2,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,
      sellerId: 3,
      stock: 10,
    },
    {
      id: 3,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,
      sellerId: 3,
      stock: 10,
    },
    {
      id: 4,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,
      sellerId: 3,
      stock: 10,
    },
  ],
};

function loadStateFromLocalStorage() {
  for (const key in state) {
    state[key] = JSON.parse(localStorage.getItem(key)) || state[key];
  }
}
function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function setCurrentUser(user) {
  state.currentUser = user;
  saveInLocalStorage("currentUser", user);
}
export function getCurrentUser() {
  return state.currentUser;
}
export function addUser(user) {
  state.users.push(user);
  saveInLocalStorage("users", state.users);
}

export function getUserById(id) {
  return state.users.find((user) => user.id === +id);
}
export function getUserByEmail(email) {
  return state.users.find((user) => user.email === email);
}
export function getCustomers() {
  return state.users.filter((u) => u.accountType === "customer");
}
export function getSellers() {
  return state.users.filter((u) => u.accountType === "seller");
}
export function getLastAddedProducts(number = 0) {
  return state.products.slice(-number);
}
export function getTotalOrdersRevenue() {
  return getOrdersRevenue(state.orders);
}
export function getOrderById(id) {
  return state.orders.find((order) => order.id === +id);
}
export function getProductById(id) {
  return state.products.find((product) => product.id === +id);
}
export function getOrdersRevenue(ordersArray) {
  return ordersArray.reduce((acc, order) => acc + getOrderTotal(order), 0);
}
export function getOrderTotal(order) {
  return order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
//this runs once when the app starts sets the state from local storage
loadStateFromLocalStorage();
