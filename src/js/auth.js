import { deleteCookie, getCoookie, setCookie } from "./helper.js";
import {
  addUser,
  getCurrentUser,
  getUserByEmail,
  getUserById,
  setCurrentUser,
  state,
} from "./model.js";

export function signIn(email, password) {
  const user = getUserByEmail(email);
  if (!user) {
    throw new Error("No user with this email");
  }
  if (password !== user.password) {
    throw new Error("Wrong password");
  }
  setCookie("id", user.id, 7);
  setCurrentUser(user);
}

export function signOut() {
  deleteCookie("id");
  setCurrentUser(null);
}

export function signUp(email, password, name, accountType) {
  if (getUserByEmail(email)) {
    throw new Error("Email already exist");
  }

  const customer = {
    id: Date.now(),
    name,
    email,
    accountType: (accountType || "customer").toLowerCase(),
    password,
    orders: [],
  };
  if (customer.accountType === "seller") {
    customer.products = [];
  } else if (customer.accountType === "customer") {
    if (!getCurrentUser()) {
      //i use signup to add customers so i need to add guestCart only when no user is logged in
      customer.cart = [...state.guestCart];
      state.guestCart = [];
    } else {
      customer.cart = [];
    }
  }
  addUser(customer);
  // signIn(email, password);
}

export function setAuthStateFromCookie() {
  const id = getCoookie("id");
  if (!id) return;
  const user = getUserById(id);
  if (!user) return;
  setCurrentUser(user);
}
