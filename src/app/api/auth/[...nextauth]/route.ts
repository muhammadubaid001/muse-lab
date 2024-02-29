import NextAuth, { AuthOptions } from 'next-auth'
import Auth0Provider from "next-auth/providers/auth0";

const options: AuthOptions ={
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID || '',
            clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
            issuer: process.env.AUTH0_ISSUER_BASE_URL
        })
    ],

    callbacks: {

        async redirect(params: { url: string, baseUrl: string }) {
            return params.url.startsWith(params.baseUrl)
                ? params.url
                : params.baseUrl + '/dashboard';
        },

        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }
}
const handler = NextAuth(options)
export { handler as GET, handler as POST}
