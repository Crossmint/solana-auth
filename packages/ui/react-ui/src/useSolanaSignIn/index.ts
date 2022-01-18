import React from "react";
import { Wallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { createContext, useCallback, useContext, useState } from "react";

export interface SolanaAuthState {
  isAuthenticated: boolean;
  isSigningIn: boolean;
  data: Record<string, string>;
  // TODO: possibily remove these form the Auth Context
  publicKey: PublicKey | null;
  wallet: Wallet | null;
  walletNotSelected: boolean;
  authenticate(): void;
  signout(): Promise<void>;
  openWalletModal(): void;
  disconnectWallet(): void;
}

export const SolanaAuthContext = createContext<SolanaAuthState>(
  {} as SolanaAuthState
);

export const useSolanaSignIn = () => {
  return useContext(SolanaAuthContext);
};
