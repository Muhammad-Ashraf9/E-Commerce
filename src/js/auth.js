import { state } from "./model.js";

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export function getCoookie(key) {
  const cookies = document.cookie.split(";");
  if (!cookies.length) {
    return;
  }

  for (let i = 0; i < cookies.length; i++) {
    const [cKey, cValue] = cookies[i].split("=");
    if (cKey.trim() === key) {
      return cValue;
    }
  }
}

function validatePassword(password) {
  return !!password && password.length >= 6;
}
export function isAuthenticated() {
  return document.cookie.split(";").some((c) => c.split("=")[1]);
}

export function signIn(email, password, accountType) {
  // accountType = "customers" | "sellers" | "admins"
  console.log(accountType.toLowerCase());
  const user = state[accountType.toLowerCase()].find(
    (user) => user.email.toLowerCase() === email
  );
  if (!user) {
    throw new Error("No user with this email");
  }
  if (password !== user.password) {
    throw new Error("Wrong password");
  }
  setCookie("id", user.id, 7);
  setCookie("accountType", user.accountType, 7);
  state.currentUser = user;
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
function deleteCookie(cName) {
  const sessionEnd = new Date("1999-07-22");
  document.cookie = `${cName}=;expires:${sessionEnd}`;
}
export function signOut() {
  deleteCookie("id");
  deleteCookie("accountType");
}

export function signUp(email, password, accountType) {
  const user = {
    email,
    password,
    accountType,
    id: Date.now(),
    orders: [],
  };
  if (accountType === "customers") {
    user.cart = [];
  }
  if (accountType === "sellers") {
    user.products = [];
  }
  state[accountType.toLowerCase()].push(user);
  signIn(email, password, accountType);
}
