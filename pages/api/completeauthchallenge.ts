import base58 from "bs58";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "tweetnacl";
import util from "tweetnacl-util";
import { getNonce, verifyTTL } from "../../utils/auth";

type AuthResponse = {
  authed: boolean;
  message?: any;
};

/**
 * Fucntion test the singed payload and return if the auth challenge was successful
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @returns
 */
export default async function completeAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  try {
    // parse the query parameters
    let { pk, pl, pls } = req.query;
    pl = pl.toString();
    pk = pk.toString();

    // verify the TLL
    const ttlVerified = verifyTTL(pk);
    if (!ttlVerified) throw new Error("Nonce is expired");

    // get the nonce from the database
    let dbNonce = await getNonce(pk);
    if (!dbNonce) throw new Error("Public Key not in DB");

    const { nonce, domain } = parsePayload(pl);

    // TODO: verify the domain (dynamically)

    // check nonce against nonce in db
    if (nonce !== dbNonce) throw new Error("Nonce is invalid");

    const payload = util.decodeUTF8(pl);
    const publicKey = base58.decode(pk);
    const signature = qptua(pls);

    // verify that the bytes were signed witht the private key
    if (!sign.detached.verify(payload, signature, publicKey))
      throw new Error("invalid signature");

    // TODO: Create the JWT token with Firebase and send to client

    // send the sign in state back to the client
    res.json({ authed: true });
  } catch (err: any) {
    res.status(400).json({ authed: false, message: err.toString() });
  }
}

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
  // TODO: Parse the domain and verify that it is correct, else reject
  let msg = "Sign this message to sign into ";
  let domain = pl
    .substring(pl.indexOf(msg) + msg.length, pl.indexOf("||"))
    .trim();

  return { nonce, domain };
};