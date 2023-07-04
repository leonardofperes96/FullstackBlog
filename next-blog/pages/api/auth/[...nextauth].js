import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase, getUser } from "@/utils/db";
import { checkPassword } from "@/utils/password-utils";
import NextAuth from "next-auth";

const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        console.log(credentials);
        const client = await connectDatabase();
        const registeredUser = await getUser(
          client,
          "blog",
          "users",
          credentials.email
        );

        if (!registeredUser) {
          throw new Error("User not found.");
        }

        const isValid = await checkPassword(
          credentials.password,
          registeredUser.password
        );
        if (!isValid) {
          throw new Error("Invalid Credentials.");
        }

        return { email: registeredUser.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
