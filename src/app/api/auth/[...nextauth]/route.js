import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import { MongoClient } from "mongodb";
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

const handler = NextAuth({
  debug: true,
  providers: [
    // OAuth authentication providers...

    // GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    //   }),
    GithubProvider({
        clientId: process.env.GITHUB_ID ,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    //   EmailProvider({
    //     clientId: process.env.EMAIL_ID,
    //     clientSecret: process.env.EMAIL_SECRET,
    //   }),

  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          // Store user details in the database
          await db.collection("users").insertOne({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
          });
        }

        await client.close();
      } catch (error) {
        console.error("Error saving user:", error);
      }
      
      return true; // Allow sign-in
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      // console.log('token...',token)
      return token;
    },
  },
})
export {handler as GET, handler as POST}