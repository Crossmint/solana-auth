import { NextPage } from "next";
import Head from "next/head";
import SolanaFirebaseAuth from "../../../src/components/SolanaFirebaseAuth";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sign in with Solana</title>
        <meta name="description" content="Sign in with Solana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SolanaFirebaseAuth />
      </main>
    </div>
  );
};

export default Index;
