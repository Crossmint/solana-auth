import { NextPage } from "next";
import Head from "next/head";
import { SignInWithSolana } from "../components/SignIn";
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
        <SignInWithSolana />
      </main>
    </div>
  );
};

export default Index;
