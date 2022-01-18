# `@crossmint/solana-auth`

CrossMint's solana-auth provides developers with the tools to configure their applications to allow users to authenticate with their Solana wallets.

This package currently provides support for Firebase out of the box but allows developers to configure it to work with any backend/database.

## 🚀 Quick Setup (Next.js Example)

### Install

```sh
npx create-next-app crossmint-solana-auth --example "https://github.com/crossmint/solana-auth/packages/examples/nextjs-starter"

cd crossmint-solana-auth && yarn install
yarn dev
```

## 🛠 Setup (React + Firebase)

## Install

```sh
yarn add @crossmint/solana-auth-base@beta  \
         @crossmint/solana-auth-react-ui@beta
```

### Configure domain

You will need to define a environment variable to use when checking the payload send from the client. This has to be the same that is passed to `SolanaAuthProvider` on the client.

```sh
export AUTH_DOMAIN=example.xyz
```

## Define auth functions

Define what happens when a user is signed in and signed out by implementing `signIn` and `signOut`.

Here we use those events to handle a session using firebase-auth by using [custom auth](https://firebase.google.com/docs/auth/web/custom-auth).

```ts
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

```tsx
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
```

Use the `SolanaAuthButtonFirebase` component to render the signin button in your app.

```tsx
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

> **These functions must be used on the api routes defined in above in the `SolanaAuthProvider`**

# Custom Configuration

## Defining a database adapter

Database adapters are needed in order to store transient log-in attempt information. We provide a built-in adapter for Firebase Firestore, or you can implement your own.

**If you are using Firebase, we have built a database adapter for you, accesible with `@crossmint/solana-auth-base`**

Database adapters must fit the `Adapter` interface

```ts
type SignInAttempt = {
  nonce: string;
  ttl: number;
  pubkey: string;
};

interface Adapter {
  saveSigninAttempt(attempt: SignInAttempt): Promise<void>;
  getNonce(pubkey: string): Promise<any>;
  generateToken(pubkey: string): Promise<string>;
  getTLL(pubkey: string): Promise<number>;
}
```

### Custom Adapter Template

```ts
const CustomAdapter = (): Adapter => ({
  saveSigninAttempt(attempt: SignInAttempt): Promise<void> {
    // TODO: save attempt object into persistent storage. Use the as primary key
    // and replace any existing entry with the same key
  },
  getNonce(pubkey: string): Promise<any> {
    // TODO: retrieve the nonce of the most recent sign-in attempt for a public key and return the nonce or undefined
  },
  generateToken(pubkey: string): Promise<string> {
    // TODO: create an authentication token for the user and return the token
  },
  getTLL(pubkey: string): Promise<number> {
    // TODO: get the Time To Live from a SignInAttempt from the database
  },
});
```

A custom database adapter can be passed to the `SolanaAuth` constructor like so:

```js
SolanaAuth({ adapter: CustomAdapter() });
```
