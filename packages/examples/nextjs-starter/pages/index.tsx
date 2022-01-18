import { NextPage } from "next";
import Head from "next/head";
import { SolanaAuthButtonFirebase } from "@crossmint/solana-auth-react-ui";
import { auth } from "../utils/firebaseClient";
const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sign in with Solana</title>
        <meta name="description" content="Sign in with Solana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SolanaAuthButtonFirebase auth={auth} />
      </main>
    </div>
  );
};

export default Index;
