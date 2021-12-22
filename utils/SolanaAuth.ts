import base58 from "bs58";
import util from "tweetnacl-util";
import { sign } from "tweetnacl";
import { signInMessage } from "../config";

export interface SolanaAuthBase {
  updateNonce(pubkey: string): Promise<string>;
  createProfile(pubkey: string): Promise<string>;
  checkNonce(pubkey: string): Promise<string>;
  generateToken(pubkey: string): Promise<string>;
  verifyTTL(pubkey: string): Promise<boolean>;
}

export class SolanaAuth implements SolanaAuthBase {
  config: SolanaAuthBase = {} as SolanaAuthBase;
  constructor(config: SolanaAuthBase) {
    Object.assign(this.config, config);
  }
  updateNonce(pubkey: string): Promise<string> {
    return this.config.updateNonce(pubkey);
  }
  createProfile(pubkey: string): Promise<string> {
    return this.config.createProfile(pubkey);
  }
  checkNonce(pubkey: string): Promise<string> {
    return this.config.checkNonce(pubkey);
  }
  generateToken(pubkey: string): Promise<string> {
    return this.config.generateToken(pubkey);
  }
  verifyTTL(pubkey: string): Promise<boolean> {
    return this.config.verifyTTL(pubkey);
  }

  getNonce = async (pubkey: string) => {
    /**
     * If there is NO nonce, create the user profile with a new nonce
     * if there is a nonce, update it.
     */

    let nonce = await this.checkNonce(pubkey);

    if (!nonce) {
      nonce = await this.createProfile(pubkey);
    } else {
      nonce = await this.updateNonce(pubkey);
    }
    return nonce;
  };

  getSolanaAuth = async (req: any, res: any) => {
    // get pubkey form req
    const pubkey = req.query.pubkey;
    if (pubkey) {
      let nonce = await this.getNonce(pubkey.toString());

      res.status(200).json({ nonce });
    } else {
      res.status(400).json("No public key specified");
    }
  };

  completeSolanaAuth = async (req: any, res: any) => {
    try {
      // parse the query parameters
      let { pubkey, payload, signature } = req.query;
      payload = payload.toString();
      pubkey = pubkey.toString();

      // verify the TLL
      const ttlVerified = this.verifyTTL(pubkey);
      if (!ttlVerified) throw new Error("Nonce is expired");

      // get the nonce from the database
      let dbNonce = await this.checkNonce(pubkey);
      if (!dbNonce) throw new Error("Public Key not in DB");

      const { nonce, domain } = parsePayload(payload);

      // verify the payload
      const constructedMessage = signInMessage(nonce, domain);

      if (constructedMessage !== payload) throw new Error("Invalid payload");

      // TODO: verify the domain (dynamically)
      // check nonce against nonce in db
      if (nonce !== dbNonce) throw new Error("Nonce is invalid");

      payload = util.decodeUTF8(payload);
      const publicKey = base58.decode(pubkey);
      signature = qptua(signature);

      // verify that the bytes were signed witht the private key
      if (!sign.detached.verify(payload, signature, publicKey))
        throw new Error("invalid signature");

      // TODO: Create the JWT token with Firebase and send to client
      let token = await this.generateToken(pubkey);
      // send the sign in state back to the client
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ token: undefined, message: err.toString() });
    }
  };
}

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
