/**
 * Fucntion test the singed payload and return if the auth challenge was successful
 * @param {*} req
 * @param {*} res
 * @returns
 */
function completeAuthChallenge(req, res) {
  res.send("Hello from completeAuthChallenge");
}

module.exports = completeAuthChallenge;
