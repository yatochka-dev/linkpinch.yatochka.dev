import { db } from '@/server/db'
import { ShortenedLinkWithClickCount } from '@/utils/types/dbHelper'

export default async function getShortenedLinkByID(id: string, clicks: true) {
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
