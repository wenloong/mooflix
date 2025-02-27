import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default (req, res) =>
   NextAuth(req, res, {
      providers: [
         Providers.GitHub({
               clientId: process.env.GITHUB_CLIENT_ID,
               clientSecret: process.env.GITHUB_CLIENT_SECRET
         }),
      ],
      debug: process.env.NODE_ENV === 'development',
      secret: process.env.AUTH_SECRET,
      jwt: {
         secret: process.env.JWT_SECRET,
      },
      database: process.env.MONGO_URI,
   });