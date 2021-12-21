import { NextApiRequest, NextApiResponse } from "next";
import { completeSolanaAuth } from "../../functions/completeSolanaAuth";

type AuthResponse = {
  token: string | undefined;
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
  await completeSolanaAuth(req, res);
}
