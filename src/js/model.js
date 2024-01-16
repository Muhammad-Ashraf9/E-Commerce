export const state = {
  customers: [
    {
      id: 1,
      name: "ash",
      email: "ash99@gmail.com",
      password: "ash123",
      orders: [],
      cart: [],
      AccountType: "customers",
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
      AccountType: "admins",
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
      AccountType: "sellers",
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
