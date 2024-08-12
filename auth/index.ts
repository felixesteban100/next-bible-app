import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    pages: {
        signIn: "/(en|es)/sign-in",
    }
}

export const { signIn, signOut, auth, handlers/* : { GET, POST } */ } = NextAuth(authOptions)
