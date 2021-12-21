import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletConnectButtons } from "../Wallet/WalletConnectButtons";
import { useSolanaSignIn } from "../context/useSolanaSignIn";
import Image from "next/image";

export const SignInWithSolana = () => {
  const { isAuthenticated, authenticate, wallet, connect, signout } =
    useSolanaSignIn();
  const { ready, connected } = useWallet();
  const [signingIn, setSigningIn] = useState<boolean>(false);

  let walletNeedsConnecting = !wallet || !ready;

  const asyncAuth = useCallback(async () => {
    setSigningIn(true);
    await authenticate();
    setSigningIn(false);
  }, [authenticate]);

  // TODO: These effects could probably be added to signinProvider
  //  or at least they could probably be in the same hook
  useEffect(() => {
    if (ready) connect();
  }, [ready, connect]);

  useEffect(() => {
    if (connected && signingIn) {
      asyncAuth();
    }
  }, [connected, asyncAuth, signingIn]);

  const SigningInContainer = () => {
    return (
      <>
        {walletNeedsConnecting ? (
          <WalletConnectButtons />
        ) : (
          <p>Connecting...</p>
        )}
      </>
    );
  };

  return (
    <>
      {signingIn ? (
        <SigningInContainer />
      ) : isAuthenticated ? (
        <button onClick={() => signout()}>Sign out!</button>
      ) : (
        <button onClick={() => setSigningIn(true)}>
          {wallet && <Image width={24} height={24} src={wallet.icon} />}Sign in
          with Solana
        </button>
      )}
    </>
  );
};
