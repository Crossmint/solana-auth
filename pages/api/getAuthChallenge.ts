import { NextApiRequest, NextApiResponse } from "next";
import { secretbox, randomBytes } from "tweetnacl";

/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
export default function getAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get pubkey form req
  const pubkey = req.query.pubkey;
  if (pubkey) {
    // TODO: add nonce, pubkey combo to firestore.
    res.status(200).json({ nonce: newNonce() });
  } else {
    res.status(403).json("No public key specified");
  }
}

// TAKEN FROM: https://github.com/dchest/tweetnacl-js/wiki/Examples
const newNonce = () => randomBytes(secretbox.nonceLength);
