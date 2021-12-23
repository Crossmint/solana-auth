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

  // TODO: These effects could probably be added to signinProvider
  //  or at least they could probably be in the same hook

  const SigningInContainer = () => {
    return <>{walletNotSelected && <WalletConnectButtons />}</>;
  };

  const UnAuthedContainer = () => {
    return (
      <>
        {isSigningIn ? (
          <SigningInContainer />
        ) : (
          <button
            className="solana-auth-btn sign-in"
            onClick={() => authenticate()}
          >
            {wallet && <Image width={24} height={24} src={wallet.icon} />} Sign
            in with{" "}
            {!walletNotSelected
              ? publicKey?.toString().slice(0, 2) +
                "..." +
                publicKey?.toString().slice(publicKey.toString().length - 2)
              : "Solana"}
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
      {!walletNotSelected && (
        <button
          className="solana-auth-btn change-wallet"
          onClick={() => openWalletModal()}
        >
          Change wallet
        </button>
      )}
    </>
  );
};
