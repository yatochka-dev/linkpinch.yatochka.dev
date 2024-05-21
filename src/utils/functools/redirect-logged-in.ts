import { Session } from 'next-auth'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function redirectLoggedIn(session?: Session | null) {
    if (typeof session === 'undefined') {
        session = await getServerAuthSession()
    }

    if (session) {
        redirect('/dashboard')
    }
}
