import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletConnectButtons } from "../WalletConnectButtons";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { AUTH_DOMAIN, signInMessage } from "../../config";
import { firebaseClient } from "../../utils/firebaseClient";

export const SignInWithSolana = () => {
  const { publicKey, signMessage } = useWallet();
  const [authenticated, setAuthed] = useState<boolean>(false);

  const authenticate = useCallback(async () => {
    try {
      const { nonce } = await fetch(`/api/getauthchallenge?pubkey=${publicKey}`)
        .then((resp) => resp.json())
        .then((data) => data);

      if (!signMessage) throw new Error("Wallet does not support signing");

      // construct the message

      const message = signInMessage(nonce);
      // encode the message
      const encodedMsg = new TextEncoder().encode(message);
      // sign with the wallet
      const signature = await signMessage(encodedMsg);

      // complete the authorization
      const auth = getAuth(firebaseClient);

      let { token } = await fetch(
        "/api/completeauthchallenge?" +
          new URLSearchParams({
            pubkey: publicKey!.toString(),
            pl: message,
            pls: Array.from(signature).toString(),
          })
      ).then((resp) => resp.json());

      if (!token) throw new Error("No token received");

      const userCredentials = await signInWithCustomToken(auth, token);
      const user = userCredentials.user;
      setAuthed(true);
    } catch (error: any) {
      alert(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  useEffect(() => {
    if (publicKey) {
      authenticate();
    }
  }, [publicKey, authenticate]);

  return <>{!publicKey && <WalletConnectButtons />}</>;
};
