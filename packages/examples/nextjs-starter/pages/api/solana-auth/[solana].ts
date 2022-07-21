import { FirebaseAdapter, SolanaNextAuth } from "@crossmint/solana-auth-base";
import getFirebaseApp from "../../../utils/firebase";

export default SolanaNextAuth({ adapter: FirebaseAdapter(getFirebaseApp()) });
