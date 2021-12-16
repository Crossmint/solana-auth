/**
 * Fucntion to take a public key from the client and return an auth challenge
 * @param {*} req
 * @param {*} res
 */
function getAuthChallenge(req, res) {
  // get pubkey form req
  const pubkey = req.query.pubkey;
  if (pubkey) {
    res.end(`Hello from getAuthChallenge \n The PubKey is: ${pubkey}`);
  } else {
    res.error("No public key specified");
  }
}

module.exports = getAuthChallenge;
