import { Wallet } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { createContext, useCallback, useContext, useState } from "react";

export interface SolanaAuthState {
  isAuthenticated: boolean;
  isSigningIn: boolean;
  data: Record<string, string>;
  authenticate(): void;
  publicKey: PublicKey | null;
  connect(): Promise<void>;
  signout(): Promise<void>;
  wallet: Wallet | null;
  walletNotSelected: boolean;
  openWalletModal(): void;
  disconnectWallet(): void;
}

export const SolanaAuthContext = createContext<SolanaAuthState>(
  {} as SolanaAuthState
);

export const useSolanaSignIn = () => {
  return useContext(SolanaAuthContext);
};
