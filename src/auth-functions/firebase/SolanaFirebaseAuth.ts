import firebaseApp from "../../../utils/firebase";
import { FirebaseAdapter } from "../adapters/firebase";
import SolanaAuth from "../SolanaAuth";

const SolanaFirebaseAuth = SolanaAuth({
  adapter: FirebaseAdapter(firebaseApp),
});

export default SolanaFirebaseAuth;
