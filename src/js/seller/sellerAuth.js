import { getCurrentUser } from "../model";
const currentUserForAuth = getCurrentUser();
console.log('from outer auth ');
if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
    console.log('from inner auth ');
    location.assign("../../html/NewMain.html");
}