import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/prisma"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    // adapter: MongoDBAdapter(clientPromise),
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),

    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            account.name = profile.name;
            console.log(profile);
            return true
        },
    }
})

export { handler as GET, handler as POST }