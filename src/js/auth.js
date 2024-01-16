import { state } from "./model";

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function validatePassword(password) {
  return String(password).length >= 8;
}
export function isAuthenticated() {
  return document.cookie;
}

export function signIn(email, password, accountType) {
  if (!validateEmail(email)) {
    throw new Error("Invallid Email:must be in right format");
  }
  if (!validatePassword(password)) {
    throw new Error("Invallid password:must be more than 8");
  }
  // accountType = "customers" | "sellers" | "admins"
  const user = state[accountType.toLowerCase()].find(
    (user) => user.email.toLowerCase() === email
  );
  if (!user) {
    throw new Error("No user with this email");
  }
  if (!password) {
    throw new Error("Wrong password");
  }
  document.cookie = `email=${email};accountType=${accountType};`;
}
export function signOut() {
  const sessionEnd = new Date("1999-07-22");
  document.cookie = `email=${email};session:${sessionEnd}`;
}
