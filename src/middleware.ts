import { withAuth } from 'next-auth/middleware'

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    callbacks: {
        authorized: async ({ req }) => {
            // const session = getServerAuthSession();
            // console.log('session', session);
            const tokenCookie = 'next-auth.session-token'
            const token =
                req.cookies.get(tokenCookie) ??
                req.cookies.get('__Host-next-auth.csrf-token')
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
