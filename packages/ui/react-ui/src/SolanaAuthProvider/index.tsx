import React from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { FC, ReactNode } from "react";
import { SolanaSignInProvider } from "./SolanaSignInProvider";
import { WalletConnectionProvider } from "../Wallet/WalletConnectionProvider";

interface SolanaAuthProviderProps {
  requestUrl: string;
  callbackUrl: string;
  domain: string;
  children: ReactNode;
  onAuthCallback(data: Record<string, string>): Promise<any>;
  signOut(): Promise<void>;
}

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
