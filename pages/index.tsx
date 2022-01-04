import { NextPage } from "next";
import Head from "next/head";
import { SignInWithSolana } from "../components/SignIn";
import styles from "../styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./_app";

const Index: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in with Solana</title>
        <meta name="description" content="Sign in with Solana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading && <p>Signing in...</p>}
        {error && <p>Error signing in: {error} </p>}
        <SignInWithSolana />
      </main>
    </div>
  );
};

export default Index;
