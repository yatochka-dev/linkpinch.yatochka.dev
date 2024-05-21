import { db } from '@/server/db'
import { ShortenedLinkWithClickCount } from '@/utils/types/db'

export default async function getShortenedUrl(id: string, clicks: true) {
    return !clicks
        ? db.shortenedURL.findUnique({
              where: {
                  id,
              },
          })
        : (db.shortenedURL.findUnique({
              where: {
                  id,
              },
              include: {
                  _count: {
                      select: {
                          clicks: true,
                      },
                  },
              },
          }) as Promise<ShortenedLinkWithClickCount>)
}
