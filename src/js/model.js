export const state = {
  currentUser: null,
  guestCart: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 2 },
    { id: 3, quantity: 2 },
  ],
  users: [
    {
      id: 1,
      name: "ash customer",
      email: "ash@customer.ash",
      password: "ash123",

      orders: [1, 2],

      cart: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 2 },
      ],

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
    {
      id: 5,
      name: "ash seller",
      email: "ash@seller.ash",
      password: "ash123",
      orders: [3],
      accountType: "seller",
      products: [
        {
          productId: 3,
          stock: 10,
        },
        {
          productId: 4,
          stock: 10,
        },
      ],
    },
  ],
  orders: [
    {
      id: 189770,
      items: [
        {
          id: 1,
          title: "ashhh",
          description: "dsfsdfsd sdfsd fsd f",
          price: 100,
          img: "../assets/test1.jpeg",
          sellerId: 3,
          category: "any",
          stock: 6,
        },
        {
          id: 2,
          title: "fghfgh",
          description: "fffff ffff",
          price: 10,
          img: "../assets/test2.jpeg",
          sellerId: 3,
          stock: 8,
        },
      ],
      customerId: 1,
      status: "pending",
      date: "2024-01-25",
      customerDetails: {
        FirstName: "abdelhameed",
        lastname: "abdelhameed",
        userAddress: "78 madrab st,ezbet elshal,qism tani",
        Email: "abdelhameedosamaiti@gmail.com",
        Phone: "01094335757",
        streetAddress: "78 madrab st,ezbet elshal,qism tani",
        City: "mansoura",
        Zip: "35511",
      },
    },
    {
      id: 354028,
      items: [
        //
        {
          id: 1,
          title: "ashhh",
          description: "dsfsdfsd sdfsd fsd f",
          price: 100,
          img: "../assets/test1.jpeg",
          sellerId: 3,
          category: "any",
          stock: 7,
        },
        {
          id: 2,
          title: "fghfgh",
          description: "fffff ffff",
          price: 10,
          img: "../assets/test2.jpeg",
          sellerId: 3,
          stock: 8,
        },
      ],
      customerId: 1,
      status: "pending",
      date: "2024-01-25",
      customerDetails: {
        FirstName: "abdelhameed",
        lastname: "abdelhameed",
        userAddress: "78 madrab st,ezbet elshal,qism tani",
        Email: "abdelhameedosamaiti@gmail.com",
        Phone: "01094335757",
        streetAddress: "78 madrab st,ezbet elshal,qism tani",
        City: "mansoura",
        Zip: "35511",
      },
    },
  ],
  products: [
    {
      id: 1,
      title: "ashhh",
      description: "dsfsdfsd sdfsd fsd f",
      price: 100,
      img: "../assets/test1.jpeg",
      sellerId: 3,
      category: "any",
      stock: 10,

      image: "../../images/Meubel House_Logos-05.png",
    },
    {
      id: 2,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,

      img: "../assets/test1.jpeg",

      sellerId: 3,
      stock: 10,
    },
    {
      id: 3,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,

      img: "../assets/test1.jpeg",
      sellerId: 5,

      stock: 10,
    },
    {
      id: 4,
      title: "fghfgh",
      description: "fffff ffff",
      price: 10,
      img: "../assets/test1.jpeg",
      sellerId: 5,
      category: "any",
      stock: 10,
      image: "../../images/Meubel House_Logos-05.png",
    },
  ],
};
function loadStateFromLocalStorage() {
  for (const key in state) {
    state[key] = JSON.parse(localStorage.getItem(key)) || state[key];
  }
}

export function saveStateInLocalStorage() {
  for (const key in state) {
    localStorage.setItem(key, JSON.stringify(state[key]));
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
    const foundProduct = state.products.find(
      (product) => product.id === productId.productId
    );

    // If the order is found, add it to the allOrders array
    if (foundProduct) {
      console.log(foundProduct);
      allProducts.push(foundProduct);
    }
  }

  return allProducts;
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

export function getByPageNumber(array, pageNumber, itemsPerPage) {
  //sorting first or sorting after slicing?
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}
export function deleteProductById(id) {
  //get product to get seller id
  const product = getProductById(id);

  //loop over users
  state.users.forEach((user) => {
    if (user.id === product.sellerId) {
      //delete product from seller products
      user.products = user.products.filter(
        (product) => product.productId !== +id
      );
    } else if (user.accountType === "customer") {
      //delete product from all carts
      user.cart = user.cart.filter((item) => item.id !== +id);
    }
  });

  //delete product from guest cart
  state.guestCart = state.guestCart.filter((item) => item.id !== +id);

  //delete product from products
  state.products = state.products.filter((product) => product.id !== +id);

  //save state in local storage
  saveStateInLocalStorage();
}

export function changeCartItemCount(id, quantity) {
  const cart = getCurrentCart();
  const index = cart.findIndex((item) => item.id === +id);
  cart[index].quantity = quantity;
  if (!state.currentUser) {
    state.guestCart = cart;
  } else {
    state.currentUser.cart = cart;
    const index = state.users.findIndex(
      (user) => user.id === state.currentUser.id
    );
    state.users[index].cart = cart;
  }

  saveStateInLocalStorage();
}

export function DeleteFromCart(id) {
  const cart = getCurrentCart();
  const newCart = cart.filter((item) => item.id !== +id);
  if (!state.currentUser) {
    state.guestCart = newCart;
  } else {
    state.currentUser.cart = newCart;
    const index = state.users.findIndex(
      (user) => user.id === state.currentUser.id
    );
    state.users[index].cart = newCart;
  }
  saveStateInLocalStorage();
}
export function getCurrentCart() {
  return state.currentUser ? state.currentUser.cart : state.guestCart;
}
export function deleteCustomerById(id) {
  state.users = state.users.filter((user) => user.id !== +id);
  saveInLocalStorage("users", state.users);
}
export function deleteSellerById(id) {
  const seller = getUserById(id);
  seller.products.forEach((product) => deleteProductById(product.productId));
  deleteCustomerById(id);
  saveStateInLocalStorage();
}
export function editUserById(id, email, password, name) {
  const foundUser = getUserByEmail(email);
  if (foundUser && foundUser.id !== +id)
    throw new Error("Email already in use.");
  const index = state.users.findIndex((user) => user.id === +id);
  state.users[index].email = email;
  state.users[index].password = password;
  state.users[index].name = name;
  saveStateInLocalStorage();
}
export function searchProductsByTitle(title) {
  return state.products.filter((product) =>
    product.title.toLowerCase().includes(title.toLowerCase())
  );
}
export function searchSellerByName(name) {
  return state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(name.toLowerCase()) &&
      user.accountType === "seller"
  );
}
export function searchCustomerByName(name) {
  return state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(name.toLowerCase()) &&
      user.accountType === "customer"
  );
}
export function searchOrdersByCustomerName(name) {
  return state.orders.filter((order) =>
    getUserById(order.customerId).name.toLowerCase().includes(name.toLowerCase())
  );
}
//this runs once when the app starts sets the state from local storage
loadStateFromLocalStorage();
