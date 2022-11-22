import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

console.log(
  "issuer: process.env.AUTH0_ISSUER",
  process.env.AUTH0_ISSUER_BASE_URL
);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID, //process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET, //process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL // process.env.AUTH0_ISSUER
    })

    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    }
  }
};
export default NextAuth(authOptions);
