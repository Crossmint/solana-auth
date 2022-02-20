import { Auth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SolanaAuthButton } from "../SolanaAuthButton/index";

interface SolanaAuthButtonFirebaseProps {
  auth: Auth;
}
/**
 * Component to wrap the SignInWithSolana Buttons
 * This component used a hook to login the user with firebase's auth
 */
export const SolanaAuthButtonFirebase: React.FC<
  SolanaAuthButtonFirebaseProps
> = ({ auth }) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading && <p>Signing in...</p>}
      <SolanaAuthButton />
      {error && <p>Error signing in: {error} </p>}
    </>
  );
};
