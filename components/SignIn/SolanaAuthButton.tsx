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
  const {
    isAuthenticated,
    isSigningIn,
    authenticate,
    wallet,
    walletNotSelected,
    signout,
    openWalletModal,
    publicKey,
    disconnectWallet,
  } = useSolanaSignIn();

  const pubKeySlice =
    publicKey?.toString().slice(0, 2) +
    "..." +
    publicKey?.toString().slice(publicKey.toString().length - 2);

  const SigningInContainer = () => {
    return <>{walletNotSelected && <WalletConnectButtons />}</>;
  };

  const UnAuthedContainer = () => {
    return (
      <>
        {isSigningIn ? (
          <SigningInContainer />
        ) : (
          <>
            <button
              className="solana-auth-btn sign-in"
              onClick={() => authenticate()}
            >
              {wallet && <Image width={24} height={24} src={wallet.icon} />}{" "}
              Sign in with {!walletNotSelected ? pubKeySlice : "Solana"}
            </button>

            <button
              className="solana-auth-btn change-wallet"
              onClick={() => openWalletModal()}
            >
              Change wallet
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="solana-auth authed">
            {`Signed in with ${pubKeySlice}`}
          </div>
          <button
            className="solana-auth-btn sign-out"
            onClick={() => signout()}
          >
            Sign out!
          </button>
        </>
      ) : (
        <UnAuthedContainer />
      )}
    </>
  );
};
