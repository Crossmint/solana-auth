import { NextApiRequest, NextApiResponse } from "next";

/**
 * Fucntion test the singed payload and return if the auth challenge was successful
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @returns
 */
export default function completeAuthChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send("Hello from completeAuthChallenge");
}
