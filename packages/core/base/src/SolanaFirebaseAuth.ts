import { App } from "firebase-admin/app";
import { SolanaAuth } from "./SolanaAuth";
import { SolanaNextAuth } from "./SolanaNextAuth";
import { FirebaseAdapter } from "./firebase";

export const SolanaFirebaseAuth = (app: App) =>
  SolanaAuth({
    adapter: FirebaseAdapter(app),
  });

export const SolanaFirebaseNextAuth = (app: App) =>
  SolanaNextAuth({
    adapter: FirebaseAdapter(app),
  });
