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
      orders: [354028, 3528],
      accountType: "seller",
      products: [
        {
          productId: 1,
        },
      ],
    },
    {
      id: 5,
      name: "ash seller",
      email: "ash@seller.ash",
      password: "ash12345",
      orders: [ 3],
      accountType: "seller",
      products: [
        {
          productId: 3,
        },
        {
          productId: 4,
        },
      ],
    },
  ],
  orders: [
    {
      "id": 354028,
      "items": [
        {
          "id": 1,
          "title": "order1",
          "description": "dsfsdfsd sdfsd fsd f",
          'quantity':5,
          "price": 100,
          "img": "../assets/test1.jpeg",
          "sellerId": 3,
          'status':'pending',
          "category": "any",
          "stock": 7
        },
        {
          "id": 2,
          "title": "order2",
          "description": "fffff ffff",
          'quantity':10,
          "category": "any",
          "price": 10,
          "img": "../assets/test2.jpeg",
          'status':'pending',
          "sellerId": 10,
          "stock": 8
        }
      ],
      "customerId": 1,
      "status": "pending",
      "date": "2024-01-25",
      "customerDetails": {
        "FirstName": "abdelhameed",
      "lastname": "abdelhameed",
      "userAddress": "78 madrab st,ezbet elshal,qism tani",
      "Email": "abdelhameedosamaiti@gmail.com",
      "Phone": "01094335757",
      "streetAddress": "78 madrab st,ezbet elshal,qism tani",
      "City": "mansoura",
      "Zip": "35511"
    }
  },
  {
    "id": 3528,
    "items": [
      {
        "id": 3,
        "title": "order3",
        "description": "dsfsdfsd sdfsd fsd f",
        'quantity':25,
        "price": 500,
        "img": "../assets/test1.jpeg",
        "sellerId": 3,
        'status':'pending',
        "category": "any",
        "stock": 17
      },
      {
        "id": 1,
        "title": "order4",
        "description": "fffff ffff",
        'quantity':10,
        "price": 10,
        'status':'pending',
        "category": "any",
        "img": "../assets/test2.jpeg",
        "sellerId": 70,
        "stock": 8
        }
      ],
      "customerId": 1,
      "status": "pending",
      "date": "2024-01-25",
      "customerDetails": {
      "FirstName": "abdelhameed",
      "lastname": "abdelhameed",
      "userAddress": "78 madrab st,ezbet elshal,qism tani",
      "Email": "abdelhameedosamaiti@gmail.com",
      "Phone": "01094335757",
      "streetAddress": "78 madrab st,ezbet elshal,qism tani",
      "City": "mansoura",
      "Zip": "35511"
      }
    },

  ],
  products: [
    {
      id: 1,
      title: "ashhh",
      description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
      imgURL0: "../../assets/Products/prod1.png",
      imgURL1: "../../assets/Products/prod2.png",
      category: "Sofas",
      stock: 10,
      price: 100,
      prevPrice: 200,
      sellerId: 3,
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
function loadStateFromLocalStorage() {
  for (const key in state) {
    state[key] = JSON.parse(localStorage.getItem(key)) || state[key];
  }
}

export function saveStateInLocalStorage(){
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
  const allOrders = [];
  let ordersFromLocalStorage = localStorage.getItem('orders')
  let orders = JSON.parse(ordersFromLocalStorage)
  // Iterate through the order IDs
  for (const orderId of orderIds) {
    // Find the order in the state.orders array
    const foundOrder = orders.find((order) => order.id === orderId);
    // If the order is found, add it to the allOrders array
    if (foundOrder) {
      allOrders.push(foundOrder);
    }
  }
  const result = [];

  for (let i = 0; i < allOrders.length; i++) {
    // Create a new array for each iteration of the outer loop
    const matchedItems = [];
    for (let j = 0; j < allOrders[i].items.length; j++) {
      if (allOrders[i].items[j].sellerId === state.currentUser.id) {
        matchedItems.push(allOrders[i].items[j]);
        matchedItems.push(allOrders[i].date);
        matchedItems.push(allOrders[i].id);
      }
    }
    result.push(matchedItems);
  }
  console.log(result);
  return result;
}

function getAllProductsBySellerId(allProducts){
  if(state.currentUser.accountType === 'seller'){
    if(allProducts){
      let id = state.currentUser.id;
      const result = allProducts.filter(obj => obj.sellerId === id);
      return result
    }
    //
  }else
    return
}
export function getAllProductsByProductIds(productIds) {
  // // console.log(productIds);
  // Initialize an array to store the found orders
  const allProducts = [];

  // Iterate through the order IDs
  for (const productId of productIds) {
    // Find the order in the state.orders array
    // console.log(productId);

    //const foundProduct = state.products.find((product) => product.id === productId.productId);
    const foundProduct = localStorage.getItem('products')
    
    // If the order is found, add it to the allOrders array
    if (foundProduct) {
      // console.log(foundProduct);
      allProducts.push(JSON.parse(foundProduct));
    }
    }
  const arrProducts = getAllProductsBySellerId(allProducts[0])
  return arrProducts;
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

export function DeleteFromCart(id){
  const cart = getCurrentCart()
  const newCart = cart.filter(item => item.id !== +id)
  if(!state.currentUser)
  {
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
  console.log("seller :>> ", seller);
  seller.products.forEach((product) => deleteProductById(product.productId));
  deleteCustomerById(id);
  saveStateInLocalStorage();
}
//this runs once when the app starts sets the state from local storage
loadStateFromLocalStorage();
