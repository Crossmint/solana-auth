import { FirebaseAdapter } from "./adapters/firebase";
import firebaseApp from "./firebase";
import SolanaAuth from "./SolanaAuth";

const SolanaFirebaseAuth = SolanaAuth({
  adapter: FirebaseAdapter(firebaseApp),
});

export default SolanaFirebaseAuth;
