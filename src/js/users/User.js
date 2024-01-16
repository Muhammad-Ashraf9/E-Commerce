export default class User {
  #id;
  #name;
  #email;
  #password;
  constructor(email, password, name) {
    if (this.constructor === User) {
      throw new Error("User is an abstract class");
    }
    this.#id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.#name = name;
    this.#email = email;
    this.#password = password;
  }
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get email() {
    return this.#email;
  }
  get password() {
    return this.#password;
  }
  set email(email) {
    if (!validateEmail(email)) throw new Error("Invalid email");
    this.#email = email;
  }
  set password(password) {
    if (!validatePassword(password))
      throw new Error("Invalid password: must be at least 8 characters");
    this.#password = password;
  }
  set name(name) {
    this.#name = name;
  }
}
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
