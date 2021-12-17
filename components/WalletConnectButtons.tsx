import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import styles from "../styles/Home.module.css";
export const WalletConnectButtons = () => {
  const { publicKey } = useWallet();

  return (
    <div className={styles.walletButtons}>
      <WalletMultiButton />
      {publicKey && <WalletDisconnectButton />}
    </div>
  );
};
