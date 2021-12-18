import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FIRESTORE_CLIENT_EMAIL, FIRESTORE_PRIVATE_KEY } from "../keys";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let firebaseApp = getApps()[0];

if (!firebaseApp)
  firebaseApp = initializeApp({
    credential: cert({
      projectId: "solana-signin",
      privateKey: FIRESTORE_PRIVATE_KEY,
      clientEmail: FIRESTORE_CLIENT_EMAIL,
    }),
  });

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
