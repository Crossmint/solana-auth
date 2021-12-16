var { secretbox, randomBytes } = require("tweetnacl");

/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
function getAuthChallenge(req, res) {
  // get pubkey form req
  const pubkey = req.query.pubkey;
  if (pubkey) {
    // TODO: add nonce, pubkey combo to firestore.

    res.json({ nonce: newNonce() });
  } else {
    res.send("No public key specified");
  }
}

// TAKEN FROM: https://github.com/dchest/tweetnacl-js/wiki/Examples
const newNonce = () => randomBytes(secretbox.nonceLength);

module.exports = getAuthChallenge;
