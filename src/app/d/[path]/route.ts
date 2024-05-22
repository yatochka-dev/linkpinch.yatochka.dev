import { geolocation } from '@vercel/edge'
import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import registerAnalyticsUrlClick from '@/utils/functools/register-analytics-url-click'
import { RedirectType } from 'next/dist/client/components/redirect'
import { generateID } from '@/utils/functools/generate-path-for-shortened-url'
import { kv } from '@vercel/kv'
import getDeviceFromHeaders from '@/utils/functools/get-device-from-headers'
import { clickEventCronJobListName } from '@/utils/const'
import { ClickEvent } from '@/utils/types/cron'

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
            const ip = req.headers.get('x-forwarded-for') ?? '::1'
            const location = geolocation(req)
            const generatedID = await generateID(22)
            const device = getDeviceFromHeaders(req.headers)

            const key = `cronjob-linkpinch-${generatedID}`
            const m = {
                id: url.id,
                ip,
                geo: location,
                device,
                timestamp: new Date().toISOString(),
            } satisfies ClickEvent
            console.log('cronjob-linkpinch', generatedID, m)

            await kv.lpush(clickEventCronJobListName, JSON.stringify(m))

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
