import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletConnectButtons } from "../Wallet/WalletConnectButtons";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { AUTH_DOMAIN, signInMessage } from "../../config";
import { firebaseClient } from "../../utils/firebaseClient";
import { useSolanaSignIn } from "../context/useSolanaSignIn";

export const SignInWithSolana = () => {
  const { isAuthenticated, authenticate, data, publicKey } = useSolanaSignIn();
  useEffect(() => {
    if (publicKey) {
      authenticate();
    }
  }, [publicKey, authenticate]);

  return <>{!isAuthenticated && <WalletConnectButtons />}</>;
};
