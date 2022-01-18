import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const WalletConnectButtons = () => {
  const { publicKey } = useWallet();

  return (
    <div>
      <WalletMultiButton />
      {publicKey && <WalletDisconnectButton />}
    </div>
  );
};
