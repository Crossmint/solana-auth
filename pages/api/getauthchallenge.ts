import { NextApiRequest, NextApiResponse } from "next";
import { SolanaFirebaseAuth } from "../../utils/SolanaAuth_Firebase";
/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
export default async function getAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await SolanaFirebaseAuth.getSolanaAuth(req, res);
}
