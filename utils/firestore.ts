import { Firestore } from "firebase-admin/firestore";
import { FIRESTORE_CLIENT_EMAIL, FIRESTORE_PRIVATE_KEY } from "../keys";

const db = new Firestore({
  projectId: "solana-signin",
  credentials: {
    private_key: FIRESTORE_PRIVATE_KEY,
    client_email: FIRESTORE_CLIENT_EMAIL,
  },
});

export default db;
