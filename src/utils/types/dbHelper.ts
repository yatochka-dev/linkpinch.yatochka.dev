import { ShortenedURL } from '@prisma/client'

interface LinkSettings {
    active: boolean
}

type ShortenedLinkWithClickCount = ShortenedURL & {
    _count: {
        clicks: number
    }
}

export type { LinkSettings, ShortenedLinkWithClickCount }
