import { NextApiRequest, NextApiResponse } from "next";
import SolanaAuth, { SolanaAuthOptions } from "./SolanaAuth";

/**
 * This function should be used on a catch-all Next API route
 * It's a wrapper for the SolanaAuth Constructor
 * /api/auth/[...solanaAuth].ts
 */
const SolanaNextAuth = (options: SolanaAuthOptions) => {
  let handler = SolanaAuth(options);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { solana } = req.query;

    switch (solana) {
      case "getauthchallenge":
        console.log("getting auth");
        await handler.getSolanaAuth(req, res);
        break;
      case "completeauthchallenge":
        console.log("completing");
        await handler.completeSolanaAuth(req, res);
        break;
      default:
        break;
    }
  };
};

export default SolanaNextAuth;
