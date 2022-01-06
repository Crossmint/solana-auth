import { WalletConnectButtons } from "../Wallet/WalletConnectButtons";
import { useSolanaSignIn } from "../useSolanaSignIn";
import Image from "next/image";

export const SolanaAuthButton = () => {
  const {
    isAuthenticated,
    isSigningIn,
    authenticate,
    wallet,
    walletNotSelected,
    signout,
    openWalletModal,
    publicKey,
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
