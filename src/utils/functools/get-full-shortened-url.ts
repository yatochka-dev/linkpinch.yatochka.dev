import { type ShortenedURL } from '@prisma/client'
import { env } from '@/env'

export default function getFullShortenedUrl(
    item: ShortenedURL,
    http = false,
): string {
    const url = new URL(env.NEXT_PUBLIC_BASE_URL)

    const domain = !http ? url.host : url.origin

    return `${domain}/${item.path}`
}
