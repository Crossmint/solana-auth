import { App as FirebaseApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { randomBytes, secretbox } from "tweetnacl";
import SolanaAuth, { Adapter } from "../SolanaAuth";

/** FROM: https://github.com/dchest/tweetnacl-js/wiki/Examples */
const newNonce = () => randomBytes(secretbox.nonceLength);

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
      const docRef = db.doc(`profiles/${pubkey}`);
      const doc = await docRef.get();

      if (doc.exists) {
        return doc.data()?.nonce;
      }
      return undefined;
    },

    verifyTTL: async (pubkey: string) => {
      const docRef = db.doc(`profiles/${pubkey}`);
      const doc = await docRef.get();
      const tll = doc.data()?.tll;
      if (tll < +new Date()) {
        return false;
      }
      return true;
    },

    createProfile: async (pubkey: string) => {
      const docRef = db.doc(`profiles/${pubkey}`);
      const nonce = newNonce().toString();
      await docRef.set({
        pubkey: pubkey, // redundant
        nonce,
        ttl: +new Date() + 300000, // now + 5min
      });
      return nonce;
    },

    updateNonce: async (pubkey: string) => {
      const docRef = db.doc(`profiles/${pubkey}`);
      const nonce = newNonce().toString();
      await docRef.set({
        nonce,
        ttl: +new Date() + 300000,
      });
      return nonce;
    },

    generateToken: (pubkey: string) => {
      return auth.createCustomToken(pubkey);
    },
  };
};
