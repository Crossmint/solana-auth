import { App as FirebaseApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { Adapter } from "../SolanaAuth";

/**
 * A SolanaAuth Adapter to connect with Firebase using Firestore
 * @param {import("firebase-admin/app").App} firebase - A firebase app
 * @returns {Adapter} Adapter
 */
export const FirebaseAdapter = (firebase: FirebaseApp): Adapter => {
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  return {
    getNonce: async (pubkey: string) => {
      const docRef = db.doc(`signinattempts/${pubkey}`);
      const doc = await docRef.get();

      if (doc.exists) {
        return doc.data()?.nonce;
      }
      return undefined;
    },

    getTLL: async (pubkey: string) => {
      const docRef = db.doc(`signinattempts/${pubkey}`);
      const doc = await docRef.get();
      const tll = doc.data()?.tll;
      return tll;
    },

    saveSigninAttempt: async (attempt) => {
      const docRef = db.doc(`signinattempts/${attempt.pubkey}`);

      await docRef.set(attempt);
      return;
    },

    generateToken: (pubkey: string) => {
      return auth.createCustomToken(pubkey);
    },
  };
};
