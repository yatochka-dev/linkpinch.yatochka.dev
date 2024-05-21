import { geolocation } from '@vercel/edge'
import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import registerAnalyticsUrlClick from '@/utils/functools/register-analytics-url-click'
import { RedirectType } from 'next/dist/client/components/redirect'
import { generateID } from '@/utils/functools/generate-path-for-shortened-url'
import { kv } from '@vercel/kv'
import getDeviceFromHeaders from '@/utils/functools/get-device-from-headers'

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
            const device = getDeviceFromHeaders(req.headers)
            const m = { path, ip, location, device }
            console.log('cronjob-linkpinch', generatedID, m)

            await kv.set(key, JSON.stringify(m))
            await registerAnalyticsUrlClick(url, key)
        } catch (e) {
            console.error('Error registering click', e)
        }

        redirect(url.originalURL, RedirectType.push)
    }

    redirectToError(404)
}

export { GET }
