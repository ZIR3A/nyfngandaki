import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/services/AuthService";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const user = await AuthService.validateCredentials(
            credentials.email,
            credentials.password
          );
          if (user) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
