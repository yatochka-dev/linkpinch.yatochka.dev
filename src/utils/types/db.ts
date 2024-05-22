import type { ShortenedURL } from '@prisma/client'

type ShortenedLinkWithClickCount = ShortenedURL & {
    _count: {
        clicks: number
    }
}

export type { ShortenedLinkWithClickCount }
