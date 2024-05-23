import { withAuth } from 'next-auth/middleware'

export default withAuth({
    // Matches the pages config in `[...nextauth]`

    callbacks: {
        authorized: async ({ req }) => {
            console.log('running authorized callback')
            // const session = getServerAuthSession();
            // console.log('session', session);
            const tokenCookie = 'next-auth.session-token'
            const token =
                req.cookies.get(tokenCookie) ??
                req.cookies.get('__Host-next-auth.csrf-token') ??
                req.cookies.get('next-auth.csrf-token') ??
                req.cookies.get('__Secure-next-auth.session-token')
            console.info('token', token)
            return !!token
        },
    },

    pages: {
        signIn: '/login',
        error: '/error',
    },
})

export const config = {
    matcher: ['/profile/:path', '/dashboard/:path'],
}

// import {
//     default as authMiddleware,
//     type NextRequestWithAuth,
// } from 'next-auth/middleware'
// import { NextResponse } from 'next/server'
//
// export default function middleware(req: NextRequestWithAuth) {
//     if (req.url.includes('/login')) {
//         return NextResponse.next()
//     }
//
//     return authMiddleware(req)
// }
//
// // export default withAuth({
// //     // Matches the pages config in `[...nextauth]`
// //
// //     callbacks: {
// //         authorized: async ({ req }) => {
// //             console.log('running authorized callback')
// //             // const session = getServerAuthSession();
// //             // console.log('session', session);
// //             const tokenCookie = 'next-auth.session-token'
// //             const token =
// //                 req.cookies.get(tokenCookie) ??
// //                 req.cookies.get('__Host-next-auth.csrf-token') ??
// //                 req.cookies.get('next-auth.csrf-token') ??
// //                 req.cookies.get('__Secure-next-auth.session-token')
// //             console.info('token', token)
// //             return !!token
// //         },
// //     },
// //
// //     pages: {
// //         signIn: '/login',
// //         error: '/error',
// //     },
// // })
// //
// export const config = {
//     matcher: ['/profile/:path', '/dashboard/:path'],
// }
