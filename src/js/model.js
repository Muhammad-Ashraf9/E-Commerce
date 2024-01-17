export const state = {
  currentUser: null,
  customers: [
    {
      id: 1,
      name: "ash",
      email: "ash99@gmail.com",
      password: "ash123",
      orders: [],
      cart: [],
      accountType: "customers",
    },
  ],
  admins: [
    {
      id: 2,
      name: "ash",
      email: "ash99@gmail.com",
      password: "ash123",
      orders: [],
      cart: [],
      accountType: "admins",
    },
  ],
  sellers: [
    {
      id: 3,
      name: "ash",
      email: "ash99@gmail.com",
      password: "ash123",
      orders: [1, 2],
      products: [
        {
          productId: 3,
          stock: 10,
        },
      ],
      accountType: "sellers",
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
      id: 3,
      title: "ashhh",
      description: "dsfsdfsd sdfsd fsd f",
      price: 100,
      sellerId: 3,
      stock: 10,
    },
  ],
};

export function setCurrentUser(user) {
  state.currentUser = user;
}
