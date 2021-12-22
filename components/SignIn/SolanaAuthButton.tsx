import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletConnectButtons } from "../Wallet/WalletConnectButtons";
import { useSolanaSignIn } from "../context/useSolanaSignIn";
import Image from "next/image";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const SignInWithSolana = () => {
  const { isAuthenticated, authenticate, wallet, walletNotSelected, signout } =
    useSolanaSignIn();
  const { ready, connected } = useWallet();
  const [signingIn, setSigningIn] = useState<boolean>(false);

  const asyncAuth = useCallback(async () => {
    setSigningIn(true);
    await authenticate();
    setSigningIn(false);
  }, [authenticate]);

  // TODO: These effects could probably be added to signinProvider
  //  or at least they could probably be in the same hook
  useEffect(() => {
    if (connected && signingIn) {
      asyncAuth();
    }
  }, [connected, asyncAuth, signingIn]);

  const SigningInContainer = () => {
    return <>{walletNotSelected && <WalletConnectButtons />}</>;
  };

  const UnAuthedContainer = () => {
    return (
      <>
        {signingIn ? (
          <SigningInContainer />
        ) : (
          <button
            className="solana-auth-btn sign-in"
            onClick={() => setSigningIn(true)}
          >
            {wallet && <Image width={24} height={24} src={wallet.icon} />} Sign
            in with Solana
          </button>
        )}
      </>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <button className="solana-auth-btn sign-out" onClick={() => signout()}>
          Sign out!
        </button>
      ) : (
        <UnAuthedContainer />
      )}
      {!walletNotSelected && <WalletMultiButton />}
    </>
  );
};
