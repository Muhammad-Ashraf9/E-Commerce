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
      ],
      status: "pending",
      date: "1999-07-22",
    },
  ],
  products: [
    {
      id: 1,
      title: "ashhh",
      description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
      imgURL0: "../assets/Products/prod11.png",
      imgURL1: "../assets/Products/prod12.png",
      imgURL2: "../assets/Products/prod13.png",
      imgURL3: "../assets/Products/prod14.png",
      price: 100,
      prevPrice: 200,
      category: "Sofas",
      sellerId: 3,
      stock: 10,
      rating: 4,
      numberofsales:0,
      countSold:0,
      reviews: [
        {
          userId: 1,
          comment: "good",
          rating: 4,
        },
        {
          userId: 2,
          comment: "bad",
          rating: 2,
        },
      ],
    },
  ],
};

export function setCurrentUser(user) {
  state.currentUser = user;
  saveInLocalStorage("currentUser", user);
}
export function getCurrentUser() {
  return state.currentUser;
}
export function addUser(user) {
  loadStateFromLocalStorage("users");//this solved the problem with sign up only once after default
  state.users.push(user);
  saveInLocalStorage("users", state.users);
}
export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function loadStateFromLocalStorage() {
  for (const key in state) {
    state[key] = JSON.parse(localStorage.getItem(key)) || state[key];
  }
}
export function getUserById(id) {
  return state.users.find((user) => user.id === +id);
}
export function getUserByEmail(email) {
  return state.users.find((user) => user.email === email);
}
