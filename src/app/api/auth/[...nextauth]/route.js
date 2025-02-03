import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

const handler = NextAuth({
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

  ]
})
export {handler as GET, handler as POST}