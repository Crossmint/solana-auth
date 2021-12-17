import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { sign } from "tweetnacl";
import { number } from "prop-types";
import { useCallback, useState } from "react";
import { WalletConnectButtons } from "../WalletConnectButtons";
import base58 from "bs58";

type ResponseData = {
  nonce: Record<number, number>;
};

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
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!sign.detached.verify(message, signature, publicKey!.toBytes()))
        throw new Error("Invalid signature!");
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
