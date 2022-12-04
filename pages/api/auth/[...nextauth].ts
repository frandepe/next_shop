import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CreadentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";
import { IUser } from "../../../interfaces";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// import jwt from 'jsonwebtoken';
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    CreadentialsProvider({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "*******",
        },
      },

      async authorize(credentials): Promise<any> {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Custom pages

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  // Callbacks
  jwt: {},
  session: {
    maxAge: 2592999, // 30dias
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({ token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          //* oauth es un usuario que se identifico con una red social
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
