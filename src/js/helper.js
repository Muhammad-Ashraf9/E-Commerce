export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
export function deleteCookie(cName) {
  const sessionEnd = new Date("1999-07-22");
  document.cookie = `${cName}=;expires:${sessionEnd}`;
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
  return /^[a-zA-Z]{4,50}$/.test(string);
}
export function isValidEmail(emailString) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailString.toLowerCase()
  );
}
