import { getNonce, checkNonce } from "../utils/auth";
export const getSolanaAuth = async (req: any, res: any) => {
  // get pubkey form req
  const pubkey = req.query.pubkey;
  if (pubkey) {
    let nonce = await getNonce(pubkey.toString());

    res.status(200).json({ nonce });
  } else {
    res.status(400).json("No public key specified");
  }
};
