import { getAuth, signInWithCustomToken } from "firebase/auth";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import { SolanaSignInProvider } from "./SolanaSignInProvider";

interface SolanaAuthProviderProps {
  children: ReactNode;
}
const auth = getAuth(firebaseClient);
async function callback(data: Record<string, string>) {
  const userCredential = await signInWithCustomToken(auth, data.token);
  return userCredential;
}

const signOut = () => {
  return auth.signOut();
};

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../Wallet/WalletConnectionProvider").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);
export const SolanaAuthProvider: FC<SolanaAuthProviderProps> = ({
  children,
}) => {
  return (
    <WalletConnectionProvider>
      <SolanaSignInProvider
        domain="deolate.space"
        requestUrl="/api/getauthchallenge"
        callbackUrl="/api/completeauthchallenge"
        onAuthCallback={callback}
        signOut={signOut}
      >
        {children}
      </SolanaSignInProvider>
    </WalletConnectionProvider>
  );
};
