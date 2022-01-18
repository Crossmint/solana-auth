export const AUTH_DOMAIN = "desolate.space";

const nonceStr = (nonce: string) => `|| id=${nonce}`;
export const signInMessage = (nonce: string, domain: string) =>
  "Sign this message to sign into " + domain + nonceStr(nonce);
