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

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaAuthProvider>
      <Component {...pageProps} />
    </SolanaAuthProvider>
  );
};

export default App;
