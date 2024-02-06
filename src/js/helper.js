export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
export function deleteCookie(cName) {
  const sessionEnd = new Date("1999-07-22");
  //fix delete cookie instead of setting it empty string
  document.cookie = `${cName}=;expires=${sessionEnd}`;
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

export function isValidPassword(password) {
  return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

export function isValidName(string) {
  return /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
    string
  );
}
export function isValidEmail(emailString) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailString.toLowerCase()
  );
}
export function generateRandomId() {
  return Math.floor(Math.random() * 1000000) + 1;
}

export function validateEmail(email, emailInvalidFeedback) {
  if (!isValidEmail(email.value)) {
    email.classList.add("is-invalid");
    emailInvalidFeedback.style.display = "block";
  } else {
    email.classList.remove("is-invalid");
    emailInvalidFeedback.style.display = "none";
  }
}
export function validateName(name, nameInvalidFeedback) {
  if (!isValidName(name.value)) {
    name.classList.add("is-invalid");
    nameInvalidFeedback.style.display = "block";
  } else {
    name.classList.remove("is-invalid");
    nameInvalidFeedback.style.display = "none";
  }
}
export function validatePassword(password, passwordInvalidFeedback) {
  if (!isValidPassword(password.value)) {
    password.classList.add("is-invalid");
    passwordInvalidFeedback.style.display = "block";
  } else {
    password.classList.remove("is-invalid");
    passwordInvalidFeedback.style.display = "none";
  }
}
