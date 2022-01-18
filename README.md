# solana-auth

Implement passwordless sign-in to your app using Solana wallets (Phantom, sollet, etc.), so you can authenticate and authorize access within your app based on a Solana address. For example, allow customers to access a protected website only if they're whitelisted or if they possess an NFT of yours.

This project has been implemented following best practices for sign-in security (following the OAuth spec) and user experience. It implements persistent sessions using refresh and access tokens, so your customers don't need to sign-in with their wallet each time they visit your site.

It uses Firebase Auth for persistent sessions and user DB as it's free and battle tested by millions of apps, but it's built in a modular way so other auth backends coudl be plugged in. 

**Project status**: this project is functionally complete but not yet nicely packaged with NPM and so on and is lacking docs. 
We estimate to have that complete by Jan 23rd 2022
