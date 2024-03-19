import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prisma";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "USER",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, isNewUser }) {
      if (account?.provider === "google" && isNewUser) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: true,
          },
        });
      }
      return true;
    },
    jwt({ token, user, account }) {
      if (user) token.role = user.role;
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      if (token && token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
