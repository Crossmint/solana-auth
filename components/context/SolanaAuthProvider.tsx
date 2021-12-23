import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import { SolanaSignInProvider } from "./SolanaSignInProvider";

interface SolanaAuthProviderProps {
  requestUrl: string;
  callbackUrl: string;
  domain: string;
  children: ReactNode;
  onAuthCallback(data: Record<string, string>): Promise<any>;
  signOut(): Promise<void>;
}

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
  ...props
}) => {
  return (
    <WalletConnectionProvider>
      <WalletModalProvider>
        <SolanaSignInProvider {...props}>{children}</SolanaSignInProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
};
