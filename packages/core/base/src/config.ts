export const AUTH_DOMAIN = process.env.AUTH_DOMAIN || "";

const nonceStr = (nonce: string) => `|| id=${nonce}`;
export const signInMessage = (nonce: string, domain: string) =>
  "Sign this message to sign into " + domain + nonceStr(nonce);
