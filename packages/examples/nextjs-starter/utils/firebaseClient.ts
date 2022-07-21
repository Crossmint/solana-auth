import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
// ADD YOUR CONFIG HERE
};

// Initialize Firebase
export const firebaseClient = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseClient);
export async function signIn(data: Record<string, string>) {
  const userCredential = await signInWithCustomToken(auth, data.token);
  return userCredential;
}

export const signOut = () => {
  return auth.signOut();
};
