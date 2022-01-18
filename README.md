# `@crossmint/solana-auth`

> Implement passwordless sign-in to your app using Solana wallets (Phantom, sollet, etc.), so you can authenticate and authorize access within your app based on a Solana address. For example, allow customers to access a protected website only if they're whitelisted or if they possess an NFT of yours.

This project has been implemented following best practices for sign-in security (following the OAuth spec) and user experience. It implements persistent sessions using refresh and access tokens, so your customers don't need to sign-in with their wallet each time they visit your site.

It uses Firebase Auth for persistent sessions and user DB as it's free and battle tested by millions of apps, but it's built in a modular way so other auth backends coudl be plugged in.

> **Project status**: this project is functionally complete but not yet nicely packaged with NPM and so on and is lacking docs.
> We estimate to have that complete by Jan 23rd 202

CrossMint's solana-auth provides developers with the tools to configure their applications to allow users to authenticate with their Solana wallets.

This package currently provides support for Firebase out of the box but allows developers to configure it to work with any backend/database.

## 🚀 Quick Setup (Next.js Example)

### Install

```shell
npx create-next-app crossmint-solana-auth --example "https://github.com/crossmint/solana-auth/packages/examples/nextjs-starter"

cd crossmint-solana-auth && yarn install
yarn dev
```

## 🛠 Setup (React + Firebase)

## Install

```sh
yarn add @crossmint/solana-auth-base@beta  \
         @crossmint/ solana-auth-react-ui@beta
```

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

Wrap your app in `SolanaAuthProvider`. Make sure to pass it a domain, your auth fucntions, and your serverless endpoints.

```javascript
// _app.tsx
import { AppProps } from "next/app";
import { FC } from "react";
import { SolanaAuthProvider } from "../src";
import { signIn, signOut } from "../utils/firebaseClient";

import { SolanaAuthProvider } from "@crossmint/solana-auth-react-ui";

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

Use the `SolanaFirebaseAuth` component to render the signin button in your app.

```js
import { SolanaAuthButtonFirebase } from "@crossmint/solana-auth-react-ui";
import { auth } from "../utils/firebaseClient";
const Index = () => {
  return (
    <div>
      <head>
        <title>Sign in with Solana</title>
        <meta name="description" content="Sign in with Solana" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        <SolanaAuthButtonFirebase auth={auth} />
      </main>
    </div>
  );
};

export default Index;
```

## Use the serverless functions.

```js
import { FirebaseAdapter, SolanaAuth } from "@crossmint/solana-auth-base";
import firebaseApp from "../../../utils/firebase";

export default SolanaAuth({ adapter: FirebaseAdapter(firebaseApp) });
```

This object exposes `getAuthChallenge` and `completeAuthChallenge`. These functions take a request and response like vercel or firebase functions and return `Promise<void>`.

## Client Usage

export default Index;

````

# Custom Configuration

## Defining an adapter

**If you are using Firebase, we have built a database adapter for you, accesible with `@crossmint/solana-auth-base`**

Database adapters must fit the `Adapter` shape

```js
type SignInAttempt = {
  nonce: string,
  ttl: number,
  pubkey: string,
};

interface Adapter {
  saveSigninAttempt(attempt: SignInAttempt): Promise<void>;
  getNonce(pubkey: string): Promise<any>;
  generateToken(pubkey: string): Promise<string>;
  getTLL(pubkey: string): Promise<number>;
}
````

A custom database adapter can be passed to the `SolanaAuth` constructor like so:

```js
SolanaAuth({ adapter: CustomAdapter() });
```
