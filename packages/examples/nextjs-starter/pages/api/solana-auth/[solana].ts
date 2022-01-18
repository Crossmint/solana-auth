import { FirebaseAdapter, SolanaNextAuth } from "@crossmint/solana-auth-base";
import firebaseApp from "../../../utils/firebase";

export default SolanaNextAuth({ adapter: FirebaseAdapter(firebaseApp) });
