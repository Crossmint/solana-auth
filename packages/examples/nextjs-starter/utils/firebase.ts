
import { cert, getApps, initializeApp, credential } from "firebase-admin/app";
import * as serviceAccount from "../service-account.json"

let firebaseApp = getApps()[0];


function getFirebaseApp(){
if (!firebaseApp) {
  firebaseApp = initializeApp({credential:  cert(serviceAccount)});

}
  return firebaseApp

}


export default getFirebaseApp;
