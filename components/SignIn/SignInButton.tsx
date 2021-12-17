import { useWallet } from "@solana/wallet-adapter-react";
import { sign } from "tweetnacl";
import { useCallback, useState } from "react";
import { WalletConnectButtons } from "../WalletConnectButtons";

export const SignInWithSolana = () => {
  const [signingIn, setSignIn] = useState<boolean>(false);
  const { publicKey, signMessage } = useWallet();

  const getAuthChallenge = useCallback(async () => {
    try {
      const { nonce } = await fetch(`/api/getauthchallenge?pubkey=${publicKey}`)
        .then((resp) => resp.json())
        .then((data) => data);

      if (!signMessage) throw new Error("Wallet does not support signing");

      // encode the message
      const message = new TextEncoder().encode(
        `Sign this message to sign into desolate.space || id=${Object.entries(
          nonce
        )}`
      );
      // sign with the wallet
      const signature = await signMessage(message);
      console.log(signature);

      // complete the authorization
      fetch(
        "/api/completeauthchallenge?" +
          new URLSearchParams({
            pk: Array.from(publicKey!.toBuffer()).toString(),
            pl: message.toString(),
            pls: Array.from(signature).toString(),
          })
      );
    } catch (error: any) {
      alert(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);
  return (
    <>
      {signingIn ? (
        <WalletConnectButtons />
      ) : (
        <button onClick={() => setSignIn(true)}>Sign in!</button>
      )}
      {signingIn && publicKey && (
        <button onClick={() => getAuthChallenge()}>Complete sign in</button>
      )}
    </>
  );
};

const uatsa = (a: Uint8Array) => a.toString().split(",");
