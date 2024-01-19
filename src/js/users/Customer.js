import User from "./User";

export default class Customer extends User {
  #orders = [];
  #cart = [];
  constructor(email, password, name) {
    super(email, password, name);
  }
  get orders() {
    return this.#orders;
  }
  get cart() {
    return this.#cart;
  }
  addToCart(item) {
    this.#cart.push(item);
  }
  removeFromCart(productId) {
    this.#cart = this.#cart.filter((item) => item.productId !== productId);
  }
  checkout() {
     this.#orders.push(this.#cart);
    // create new order push id to orders
    // clear cart
    this.#cart = [];
  }
}
