export const state = {
  currentUser: null,
  users: [
    {
      id: 1,
      name: "ash customer",
      email: "ash@customer.ash",
      password: "ash123",
      orders: [1, 2,3],
      cart: [1, 2,3],
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
      orders: [1, 2,3],
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
          productId: 1,
          quantity: 2,
          price: 100,
          status: "pending",
        },
      ],
      status: "pending",
      date: "1999-07-22",
    },
    {
      id: 2,
      items: [
        {
          productId: 1,
          quantity: 2,
          price: 100,
          status: "pending",
        },
      ],
      status: "pending",
      date: "1999-07-22",
    },
    {
      id: 3,
      items: [
        {
          productId: 1,
          quantity: 2,
          price: 100,
          status: "pending",
        },
      ],
      status: "pending",
      date: "1999-07-22",
    }
  ],
  products: [
    {
      id: 1,
      title: "ashhh",
      description: "dsfsdfsd sdfsd fsd f",
      price: 100,
      sellerId: 3,
      category:'any',
      stock: 10,
      image:'../../images/Meubel House_Logos-05.png'
    },
    {
      id: 2,
      title: "fghfgh",
      description: "fffff ffff",
      price: 500,
      sellerId: 3,
      category:'any',
      stock: 10,
      image:'../../images/Meubel House_Logos-05.png'
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

export function getAllOrdersByOrderIds(orderIds) {
  // Initialize an array to store the found orders
  const allOrders = [];

  // Iterate through the order IDs
  for (const orderId of orderIds) {
    // Find the order in the state.orders array
    const foundOrder = state.orders.find((order) => order.id === orderId);

    // If the order is found, add it to the allOrders array
    if (foundOrder) {
      allOrders.push(foundOrder);
    }
  }

  return allOrders;
}

export function getAllProductsByProductIds(productIds) {
  // Initialize an array to store the found orders
  const allProducts = [];

  // Iterate through the order IDs
  for (const productId of productIds) {
    // Find the order in the state.orders array
    console.log(productId);
    const foundProduct = state.products.find((product) => product.id === productId.productId);

    // If the order is found, add it to the allOrders array
    if (foundProduct) {
      console.log(foundProduct);
      allProducts.push(foundProduct);
    }
  }

  return allProducts;
}