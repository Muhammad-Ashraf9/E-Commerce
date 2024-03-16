import { getCurrentUser } from "../model";
const currentUserForAuth = getCurrentUser();
if (!currentUserForAuth || currentUserForAuth.accountType !== "seller") {
    location.assign("../../html/NewMain.html");
}