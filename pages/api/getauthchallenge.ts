import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "../../functions/getAuth";
/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
export default async function getAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await getAuth(req, res);
}
