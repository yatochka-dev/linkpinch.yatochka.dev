import { PrismaAdapter } from '@auth/prisma-adapter'
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import DiscordProvider from 'next-auth/providers/discord'
// import CredentialsProvider from "next-auth/providers/credentials";

import { env } from '@/env'
import { db } from '@/server/db'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            // ...other properties
            // role: UserRole;
        } & DefaultSession['user']
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
        // CredentialsProvider({
        //     name: "cred",
        //     credentials: {
        //         email: {label: "Email", type: "email", placeholder: "youremail@example.com"},
        //         password: {label: "Password", type: "password"}
        //     },
        //     async authorize(credentials, req) {
        //         // Add logic here to look up the user from the credentials supplied
        //         const user = await db.user.findUnique({
        //             where: {
        //                 email: credentials.email,
        //             },
        //         })
        //
        //         if (user) {
        //             // Any object returned will be saved in `user` property of the JWT
        //             return user
        //         } else {
        //             // If you return null then an error will be displayed advising the user to check their details.
        //             return null
        //
        //             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //         }
        //     }
        // })
    ],

    pages: {
        signIn: '/login',
        newUser: '/new',
        error: '/error',
    },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
