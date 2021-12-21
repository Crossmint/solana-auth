import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletConnectButtons } from "../Wallet/WalletConnectButtons";
import { useSolanaSignIn } from "../context/useSolanaSignIn";

export const SignInWithSolana = () => {
  const { isAuthenticated, authenticate, wallet, connect } = useSolanaSignIn();
  const { ready, connected } = useWallet();
  const [signingIn, setSigningIn] = useState<boolean>(false);

  let walletNeedsConnecting = !wallet || !ready;

  const asyncAuth = useCallback(async () => {
    setSigningIn(true);
    await authenticate();
    setSigningIn(false);
  }, [authenticate]);

  // TODO: These effects could probably be added to signinProvider

  useEffect(() => {
    if (ready) connect();
  }, [ready, connect]);

  useEffect(() => {
    if (connected && signingIn) {
      asyncAuth();
    } else {
      console.log("NOT CONNECTED");
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
        <p>Logged In!</p>
      ) : (
        <button onClick={async () => await setSigningIn(true)}>
          Sign in with Solana
        </button>
      )}
    </>
  );
};
