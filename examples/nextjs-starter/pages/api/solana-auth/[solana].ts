import { FirebaseAdapter } from "../../../../../src/auth-functions/adapters/firebase";
import SolanaNextAuth from "../../../../../src/auth-functions/SolanaNextAuth";
import firebaseApp from "../../../utils/firebase";

export default SolanaNextAuth({ adapter: FirebaseAdapter(firebaseApp) });
