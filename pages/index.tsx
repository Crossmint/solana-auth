import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { WalletConnectButtons } from "../components/WalletConnectButtons";
import styles from "../styles/Home.module.css";

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in with Solana</title>
        <meta name="description" content="Sign in with Solana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <WalletConnectButtons />
      </main>
    </div>
  );
};

export default Index;
