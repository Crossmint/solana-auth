var signInButton = document.createElement("BUTTON");
signInButton.innerHTML = "Sign In";

function signIn() {
  console.log("Signing In");
}

signInButton.addEventListener("click", signIn);

document.body.appendChild(signInButton);
