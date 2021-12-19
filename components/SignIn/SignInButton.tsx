import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { WalletConnectButtons } from "../WalletConnectButtons";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { AUTH_DOMAIN } from "../../config";

export const SignInWithSolana = () => {
  const [signingIn, setSignIn] = useState<boolean>(false);
  const { publicKey, signMessage } = useWallet();
  const [authed, setAuthed] = useState<boolean>(false);

  const getAuthChallenge = useCallback(async () => {
    try {
      const { nonce } = await fetch(`/api/getauthchallenge?pubkey=${publicKey}`)
        .then((resp) => resp.json())
        .then((data) => data);

      if (!signMessage) throw new Error("Wallet does not support signing");

      // construct the message
      const nonceStr = `|| id=${nonce}`;
      const message =
        "Sign this message to sign into " + AUTH_DOMAIN + nonceStr;

      // encode the message
      const encodedMsg = new TextEncoder().encode(message);
      // sign with the wallet
      const signature = await signMessage(encodedMsg);

      // complete the authorization
      const auth = getAuth();

      let { token } = await fetch(
        "/api/completeauthchallenge?" +
          new URLSearchParams({
            pk: publicKey!.toString(),
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

  return (
    <>
      {authed ? (
        <p> YAY AUTHED</p>
      ) : signingIn ? (
        <WalletConnectButtons />
      ) : (
        <button onClick={() => setSignIn(true)}>Sign in!</button>
      )}
      {signingIn && publicKey && !authed && (
        <button onClick={() => getAuthChallenge()}>Complete sign in</button>
      )}
    </>
  );
};
