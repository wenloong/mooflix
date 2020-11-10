import NextAuth from "next-auth";
import { providers } from "next-auth/client";
import Providers from "next-auth/providers";

providers: [
   Providers.Credentials({
      name: 'Credentials',
      credentials: {
         username: { label: "Username", type: "text", placeholder: "johnsmith" },
         password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
         const user = { id: 1, name: 'John Smith', email: 'jsmith@mooflix.com' }

         if (user) {
            return Promise.resolve(user);
         } else {
            return Promise.resolve(null);
         }
      }
   })
]

export default (req, res) => req.json({ success: true });