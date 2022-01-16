import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
const styles = require("./Wallet.module.css");

export const WalletConnectButtons = () => {
  const { publicKey } = useWallet();

  return (
    <div className={styles.walletButtons}>
      <WalletMultiButton />
      {publicKey && <WalletDisconnectButton />}
    </div>
  );
};
