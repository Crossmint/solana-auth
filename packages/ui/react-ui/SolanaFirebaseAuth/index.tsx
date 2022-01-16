import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebaseClient";
import { SolanaAuthButton } from "../SolanaAuthButton";

/**
 * Component to wrap the SignInWithSolana Buttons
 * This component used a hook to login the user with firebase's auth
 */
const SolanaFirebaseAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading ? (
        <p>Signing in...</p>
      ) : user ? (
        <p>Signed in!</p>
      ) : (
        <SolanaAuthButton />
      )}
      {error && <p>Error signing in: {error} </p>}
    </>
  );
};

export default SolanaFirebaseAuth;
