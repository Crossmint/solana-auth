import base58 from "bs58";
import { sign } from "tweetnacl";
import util from "tweetnacl-util";
import { signInMessage } from "../config";
import { checkNonce, generateToken, verifyTTL } from "../utils/auth";

/**
 * This function completes the authentication
 * @param req A request object
 * @param res The response object
 */
export const completeSolanaAuth = async (req: any, res: any) => {
  try {
    // parse the query parameters
    let { pubkey, payload, signature } = req.query;
    payload = payload.toString();
    pubkey = pubkey.toString();

    // verify the TLL
    const ttlVerified = verifyTTL(pubkey);
    if (!ttlVerified) throw new Error("Nonce is expired");

    // get the nonce from the database
    let dbNonce = await checkNonce(pubkey);
    if (!dbNonce) throw new Error("Public Key not in DB");

    const { nonce, domain } = parsePayload(payload);

    // verify the payload
    const constructedMessage = signInMessage(nonce, domain);

    if (constructedMessage !== payload) throw new Error("Invalid payload");

    // check nonce against nonce in db
    if (nonce !== dbNonce) throw new Error("Nonce is invalid");

    payload = util.decodeUTF8(payload);
    const publicKey = base58.decode(pubkey);
    signature = qptua(signature);

    // verify that the bytes were signed witht the private key
    if (!sign.detached.verify(payload, signature, publicKey))
      throw new Error("invalid signature");

    let token = await generateToken(pubkey);
    // send the sign in state back to the client
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ token: undefined, message: err.toString() });
  }
};

/**
 * Fucntion to take a query param to a Uint8Array
 * @param qp
 * @returns Uint8Array to pass to tweetnacl functions
 */
const qptua = (qp: string | string[]) =>
  Uint8Array.from(
    qp
      .toString()
      .split(",")
      .map((e) => parseInt(e))
  );

/**
 * Function to parse the payload (msg) from the client and return the nonce and domain used to sign in
 * @param pl payload sent from the client
 * @returns Object -> the nonce and domain to check against the DB
 */
const parsePayload = (pl: string): { nonce: string; domain: string } => {
  const nonce = pl.substring(pl.indexOf("id=") + 3);
  let msg = "Sign this message to sign into ";
  let domain = pl
    .substring(pl.indexOf(msg) + msg.length, pl.indexOf("||"))
    .trim();

  return { nonce, domain };
};