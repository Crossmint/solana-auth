# `@crossmint/solana-auth`

Implement passwordless sign-in to your app using Solana wallets (Phantom, sollet, etc.), so you can authenticate and authorize access within your app based on a Solana address. For example, allow customers to access a protected website only if they're whitelisted or if they possess an NFT of yours.

This project has been implemented following best practices for sign-in security (following the OAuth spec) and user experience. It implements persistent sessions using refresh and access tokens, so your customers don't need to sign-in with their wallet each time they visit your site.

It uses Firebase Auth for persistent sessions and user DB as it's free and battle tested by millions of apps, but it's built in a modular way so other auth backends coudl be plugged in.

**Project status**: this project is functionally complete but not yet nicely packaged with NPM and so on and is lacking docs.
We estimate to have that complete by Jan 23rd 2022

CrossMint's solana-auth provides developers with the tools to configure their applications to allow users to authenticate with their Solana wallets.

This package currently provides support for Firebase out of the box but allows developers to configure it to work with any backend/database.

## Quick Setup (Next.js and Firebase)

### Install

```sh
yarn add @crossmint/solana-auth
```

### Setup

Define `signIn` and `signOut`. Here we use firebase utils and `signInWithCustomToken`.

```js
// utils/firebaseClient.ts
export async function signIn(data: Record<string, string>) {
  const userCredential = await signInWithCustomToken(auth, data.token);
  return userCredential;
}

export const signOut = () => {
  return auth.signOut();
};
```

Wrap your app in `SolanaAuthProvider`

```javascript
// _app.tsx
import { AppProps } from "next/app";
import { FC } from "react";
import { SolanaAuthProvider } from "../src";
import { signIn, signOut } from "../utils/firebaseClient";

// Use require instead of import, and order matters
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaAuthProvider
      domain="example.xyz"
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
```

Add the serverless functions.

1. Create a file `pages/api/solana-auth/[solana].ts`
2. Import the `FirebaseAdapter` and the `SolanaNextAuth` handler.
3. Add them to `[solana.ts]`

```js
export default SolanaNextAuth({ adapter: FirebaseAdapter(firebaseApp) });
```

### Usage

Use the `SolanaFirebaseAuth` component to render the signin button in your app.

```js
import { NextPage } from "next";
import Head from "next/head";
import SolanaFirebaseAuth from "../src/components/SolanaFirebaseAuth";

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
```

## Configuration
