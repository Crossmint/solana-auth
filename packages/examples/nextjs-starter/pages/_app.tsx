import { AppProps } from "next/app";
import { FC } from "react";
import { SolanaAuthProvider } from "@crossmint/solana-auth-react-ui";
import { signIn, signOut } from "../utils/firebaseClient";

// Use require instead of import, and order matters
require("../styles/globals.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaAuthProvider
      authDomain="example.xyz"
      requestUrl="/api/solana-auth/getauthchallenge"
      callbackUrl="/api/solana-auth/completeauthchallenge"
      onAuthCallback={signIn}
      signOut={signOut}
    >
      <Component {...pageProps} />
    </SolanaAuthProvider>
  );
};

export default App;
