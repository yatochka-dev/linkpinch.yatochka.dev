import { type ShortenedURL } from '@prisma/client'
import { env } from '@/env'

export default async function registerClickInBackground(
    item: ShortenedURL,
    meta?: string,
): Promise<boolean> {
    const url = new URL(
        `${env.BACKGROUND_API_URL}register-click/${encodeURIComponent(item.id)}?meta=${encodeURIComponent(meta ?? '')}`,
    )

    const resp = await fetch(url, {
        method: 'GET',
    })

    const json = (await resp.json()) as {
        ok: boolean
        error?: string
    }

    if (!json.ok) {
        console.error('Failed to register click in background', json.error)
        return false
    }

    console.log('Successfully registered click in background', json)

    return true
}
