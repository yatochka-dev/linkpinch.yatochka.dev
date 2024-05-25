import { geolocation } from '@vercel/edge'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/server/db'
import { RedirectType } from 'next/dist/client/components/redirect'
import getDeviceFromHeaders from '@/utils/functools/get-device-from-headers'
import { type ClickEvent } from '@/utils/types/cron'
import { unstable_after as after } from 'next/server'
import { type ShortenedURL } from '@prisma/client'
import { cache } from 'react'

function getClickEventMetadata(req: Request, url: ShortenedURL) {
    const ip = req.headers.get('x-forwarded-for') ?? '::1'
    const location = geolocation(req)
    const device = getDeviceFromHeaders(req.headers)

    return {
        id: url.id,
        ip,
        geo: JSON.parse(JSON.stringify(location)) as object,
        device,
        timestamp: new Date().toISOString(),
    } satisfies ClickEvent
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

    after(
        cache(async () => {
            if (url) {
                console.debug('Registering click')
                const m = getClickEventMetadata(req, url)
                await db.click.create({
                    data: {
                        urlId: url.id,
                        metadata: m,
                        // ip,
                        // geo: location,
                        // device,
                        // timestamp,
                    },
                })
            }
        }),
    )

    if (url) {
        redirect(url.originalURL, RedirectType.push)
    }

    notFound()
}

export { GET }
