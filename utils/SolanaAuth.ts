import base58 from "bs58";
import util from "tweetnacl-util";
import { sign } from "tweetnacl";
import { signInMessage } from "../config";
import { randomBytes, secretbox } from "tweetnacl";

/** FROM: https://github.com/dchest/tweetnacl-js/wiki/Examples */
const newNonce = () => randomBytes(secretbox.nonceLength);

type SignInAttempt = {
  nonce: string;
  ttl: number;
  pubkey: string;
};

export interface Adapter {
  saveSigninAttempt(attempt: SignInAttempt): Promise<void>;
  getNonce(pubkey: string): Promise<any>;
  generateToken(pubkey: string): Promise<string>;
  getTLL(pubkey: string): Promise<number>;
}

interface SolanaAuth {
  getSolanaAuth: (req: any, res: any) => Promise<void>;
  completeSolanaAuth: (req: any, res: any) => Promise<void>;
}
type SolanaAuthOptions = {
  adapter: Adapter;
};

// TODO: Turn this into a function that can be used as the defualt export on a Next.JS Auth page.
const SolanaAuth = (options: SolanaAuthOptions): SolanaAuth => {
  const getNonce = async (pubkey: string) => {
    /**
 * With current Firebase application, it is not needed to check if the profile exists in the DB.
 * I the future, we could use a line (below) to check wether the profile exists.  
  let nonce = await options.adapter.getNonce(pubkey);
 */

    // generate an updated nonce
    let nonce = newNonce().toString();
    let ttl = +new Date() + 300000;

    await options.adapter.saveSigninAttempt({ pubkey, nonce, ttl });
    return nonce;
  };

  const verifyTTL = async (pubkey: string) => {
    // get the TLL from the adapter
    let ttl = await options.adapter.getTLL(pubkey);

    if (ttl < +new Date()) {
      return false;
    }
    return true;
  };

  const getSolanaAuth = async (req: any, res: any) => {
    // get pubkey form req
    const pubkey = req.query.pubkey;
    if (pubkey) {
      let nonce = await getNonce(pubkey.toString());

      res.status(200).json({ nonce });
    } else {
      res.status(400).json("No public key specified");
    }
  };

  const completeSolanaAuth = async (req: any, res: any) => {
    try {
      // parse the query parameters
      let { pubkey, payload, signature } = req.query;
      payload = payload.toString();
      pubkey = pubkey.toString();

      // verify the TLL
      const ttlVerified = verifyTTL(pubkey);
      if (!ttlVerified) throw new Error("Nonce is expired");

      // get the nonce from the database
      let dbNonce = await options.adapter.getNonce(pubkey);
      if (!dbNonce) throw new Error("Public Key not in DB");

      const { nonce, domain } = parsePayload(payload);

      // verify the payload
      const constructedMessage = signInMessage(nonce, domain);

      if (constructedMessage !== payload) throw new Error("Invalid payload");

      // check nonce against nonce in db
      if (nonce !== dbNonce) throw new Error("Nonce is invalid");

      payload = util.decodeUTF8(payload);
      const publicKey = base58.decode(pubkey);
      signature = qptua(signature);

      // verify that the bytes were signed witht the private key
      if (!sign.detached.verify(payload, signature, publicKey))
        throw new Error("invalid signature");

      let token = await options.adapter.generateToken(pubkey);
      // send the sign in state back to the client
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ token: undefined, message: err.toString() });
    }
  };

  return { completeSolanaAuth, getSolanaAuth };
};

export default SolanaAuth;

/**
 * Fucntion to take a query param to a Uint8Array
 * @param qp
 * @returns Uint8Array to pass to tweetnacl functions
 */
const qptua = (qp: string | string[]) =>
  Uint8Array.from(
    qp
      .toString()
      .split(",")
      .map((e) => parseInt(e))
  );

/**
 * Function to parse the payload (msg) from the client and return the nonce and domain used to sign in
 * @param pl payload sent from the client
 * @returns Object -> the nonce and domain to check against the DB
 */
const parsePayload = (pl: string): { nonce: string; domain: string } => {
  const nonce = pl.substring(pl.indexOf("id=") + 3);
  // TODO: Parse the domain and verify that it is correct, else reject
  let msg = "Sign this message to sign into ";
  let domain = pl
    .substring(pl.indexOf(msg) + msg.length, pl.indexOf("||"))
    .trim();

  return { nonce, domain };
};
