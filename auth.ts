import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "./utils/password";
import { login } from "./services/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = await hashPassword(credentials.password as string);

        // logic to verify if the user exists
        const dbUser = await login({
          email: credentials.email as string,
          password: pwHash,
        });

        if (!dbUser) {
          throw new Error("Invalid credentials.");
        }

        // Convert user to match NextAuth User type
        user = {
          id: dbUser.id.toString(),
          fullName: dbUser.fullName,
          email: dbUser.email,
          userName: dbUser.userName,
          roleName: dbUser.roleName,
          createdAt: dbUser.createdAt,
          updatedAt: dbUser.updatedAt,
        };

        return user;
      },
    }),
  ],
});
