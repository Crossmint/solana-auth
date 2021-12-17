import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "tweetnacl";
import util from "tweetnacl-util";

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
export default function completeAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  try {
    let { pk, pl, pls } = req.query;
    pl = pl.toString();
    const { nonce, domain } = parsePayload(pl);
    // TODO: Get nonce from DB and check against nonce from payload

    const payload = util.decodeUTF8(pl);
    const publicKey = qptua(pk);
    const signature = qptua(pls);

    // verify that the bytes were signed witht the private key
    if (!sign.detached.verify(payload, signature, publicKey))
      throw new Error("invalid signature");

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
