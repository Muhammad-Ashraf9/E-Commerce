export let state = {
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
      ],
      status: "pending",
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
  ],
};

export function setCurrentUser(user) {
  state.currentUser = user;
  saveStateInLocalStorage();
}
export function getCurrentUser() {
  return state.currentUser;
}
export function addUser(user) {
  state.users.push(user);
  saveStateInLocalStorage();
}
export function saveStateInLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}
export function loadStateFromLocalStorage() {
  const storedState = localStorage.getItem("state");
  if (!storedState) {
    saveStateInLocalStorage();
    return;
  }
  //get keys - loop over keys- set value of each key (state is constant)
  // let state for now
  state = JSON.parse(storedState);
}
export function getUserById(id) {
  return state.users.find((user) => user.id === +id);
}
export function getUserByEmail(email) {
  return state.users.find((user) => user.email === email);
}
