import { NextApiRequest, NextApiResponse } from "next";
import { completeAuth } from "../../functions/completeAuth";

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
  await completeAuth(req, res);
}
