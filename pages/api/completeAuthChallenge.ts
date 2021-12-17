import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "tweetnacl";

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
  // TODO: Get nonce from DB
  // TODO: Parse the nonce and verify that it is correct, else reject
  try {
    const { pk, pl, pls } = req.query;
    const payload = qptua(pl);
    const publicKey = qptua(pk);
    const signature = qptua(pls);

    // verify that the bytes were signed witht the private key
    if (!sign.detached.verify(payload, signature, publicKey))
      throw new Error("invalid signature");
    res.json({ authed: true });
  } catch (err: any) {
    res.status(400).json({ authed: false, message: err });
  }
}

/**
 * Fucntion to take a query param to a Uint8Array
 * @param qp
 * @returns array
 */
const qptua = (qp: string | string[]) =>
  Uint8Array.from(
    qp
      .toString()
      .split(",")
      .map((e) => parseInt(e))
  );
