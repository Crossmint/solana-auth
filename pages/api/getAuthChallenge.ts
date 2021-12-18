import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, getNonce } from "../../utils/auth";
/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
export default async function getAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get pubkey form req
  const pubkey = req.query.pubkey;
  if (pubkey) {
    let nonce = await getAuth(pubkey.toString());

    res.status(200).json({ nonce });
  } else {
    res.status(400).json("No public key specified");
  }
}
