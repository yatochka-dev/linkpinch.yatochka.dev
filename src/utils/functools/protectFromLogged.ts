import { Session } from 'next-auth'
import auth from '@/utils/functools/auth'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function protectFromLogged(session?: Session | null) {
    if (typeof session === 'undefined') {
        session = await getServerAuthSession()
    }

    if (session) {
        redirect('/dashboard')
    }
}
