import { randomBytes, secretbox } from "tweetnacl";
import { db, auth } from "./firebase";

// TAKEN FROM: https://github.com/dchest/tweetnacl-js/wiki/Examples
const newNonce = () => randomBytes(secretbox.nonceLength);

export const getNonce = async (pk: string) => {
  /**
   * If there is NO nonce, create the user profile with a new nonce
   * if there is a nonce, update it.
   */

  let nonce = await checkNonce(pk);

  if (!nonce) {
    nonce = await createProfile(pk);
  } else {
    nonce = await updateNonce(pk);
  }
  return nonce;
};

export const checkNonce = async (pk: string) => {
  const docRef = db.doc(`profiles/${pk}`);
  const doc = await docRef.get();

  if (doc.exists) {
    return doc.data()?.nonce;
  }
  return undefined;
};

export const verifyTTL = async (pk: string) => {
  const docRef = db.doc(`profiles/${pk}`);
  const doc = await docRef.get();
  const tll = doc.data()?.tll;
  if (tll < +new Date()) {
    return false;
  }
  return true;
};

const createProfile = async (pk: string) => {
  const docRef = db.doc(`profiles/${pk}`);
  const nonce = newNonce().toString();
  await docRef.set({
    pubkey: pk, // redundant
    nonce,
    ttl: +new Date() + 3600000, // now + 1 hour
  });
  return nonce;
};

const updateNonce = async (pk: string) => {
  const docRef = db.doc(`profiles/${pk}`);
  const nonce = newNonce().toString();
  await docRef.set({
    nonce,
    ttl: +new Date() + 3600000,
  });
  return nonce;
};

export const generateToken = (pk: string) => {
  return auth.createCustomToken(pk);
};
