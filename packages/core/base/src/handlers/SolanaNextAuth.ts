import { NextApiRequest, NextApiResponse } from "next";
import { SolanaAuth, SolanaAuthOptions } from "./SolanaAuth";

/**
 * This function should be used on a catch-all Next API route
 * It's a wrapper for the SolanaAuth Constructor
 * /api/auth/[...solana].ts
 */
export const SolanaNextAuth = (options: SolanaAuthOptions) => {
  let handler = SolanaAuth(options);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { solana } = req.query;

    switch (solana) {
      case "getauthchallenge":
        await handler.getSolanaAuth(req, res);
        break;
      case "completeauthchallenge":
        await handler.completeSolanaAuth(req, res);
        break;
      default:
        break;
    }
  };
};
