var signInButton = document.createElement("BUTTON");
signInButton.innerHTML = "Sign In";

/**
 * Connect with the user's wallet through wallet adapter ==> get pubkey
 * send pubkey to serverless fucntion #getauthchallenge/
 *
 * get nonce returned from server
 */
function signIn() {
  console.log("Signing In");
}

signInButton.addEventListener("click", signIn);

document.body.appendChild(signInButton);
