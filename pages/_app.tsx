import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { SolanaAuthProvider } from "../components/context/SolanaAuthProvider";
import { SolanaSignInProvider } from "../components/context/SolanaSignInProvider";
import { firebaseClient } from "../utils/firebaseClient";

// Use require instead of import, and order matters
require("../styles/globals.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const auth = getAuth(firebaseClient);
async function callback(data: Record<string, string>) {
  const userCredential = await signInWithCustomToken(auth, data.token);
  return userCredential;
}

const signOut = () => {
  return auth.signOut();
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaAuthProvider
      domain="desolate.space"
      requestUrl="/api/getauthchallenge"
      callbackUrl="/api/completeauthchallenge"
      onAuthCallback={callback}
      signOut={signOut}
    >
      <Component {...pageProps} />
    </SolanaAuthProvider>
  );
};

export default App;
