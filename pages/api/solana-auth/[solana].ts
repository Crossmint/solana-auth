import { FirebaseAdapter } from "../../../utils/adapters/firebase";
import firebaseApp from "../../../utils/firebase";
import SolanaNextAuth from "../../../utils/SolanaNextAuth";

export default SolanaNextAuth({ adapter: FirebaseAdapter(firebaseApp) });
