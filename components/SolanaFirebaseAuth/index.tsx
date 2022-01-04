import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../pages/_app";
import { SignInWithSolana } from "../SignIn";

/**
 * Component to wrap the SignInWithSolana Buttons
 * This component used a hook to login the user with firebase's auth
 */
const SolanaFirebaseAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading ? (
        <p>Siging in...</p>
      ) : user ? (
        <p>Signed in!</p>
      ) : (
        <SignInWithSolana />
      )}
      {error && <p>Error signing in: {error} </p>}
    </>
  );
};

export default SolanaFirebaseAuth;
