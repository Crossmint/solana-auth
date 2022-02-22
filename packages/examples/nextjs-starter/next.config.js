// /* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@crossmint/solana-auth-react-ui",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
});
