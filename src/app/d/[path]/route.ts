import { geolocation } from '@vercel/edge'
import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import registerClickInBackground from '@/utils/functools/registerClickInBackground'
import { RedirectType } from 'next/dist/client/components/redirect'
import { generateID } from '@/utils/helpers/generateURLPath'
import { kv } from '@vercel/kv'

function redirectToError(code: number) {
    redirect(`/not-found-page/${code}`)
}

async function GET(
    req: Request,
    {
        params: { path },
    }: {
        params: {
            path: string
        }
    },
) {
    const url = await db.shortenedURL.findUnique({
        where: {
            path,
        },
    })

    if (url) {
        try {
            const location = geolocation(req)
            const generatedID = await generateID(22)

            const ip = req.headers.get('x-forwarded-for')
            const key = `cronjob-linkpinch-${generatedID}`
            console.log('cronjob-linkpinch', generatedID, {
                path,
                ip,
                location,
            })
            await kv.set(key, JSON.stringify({ path, ip, location }))
            await registerClickInBackground(url, key)
        } catch (e) {
            console.error('Error registering click', e)
        }

        redirect(url.originalURL, RedirectType.push)
    }

    redirectToError(404)
}

export { GET }
