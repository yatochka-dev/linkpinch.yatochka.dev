import { db } from '@/server/db'

export default async function CheckIsPathTaken(path: string): Promise<boolean> {
    const count = await db.shortenedURL.count({
        where: {
            path,
        },
    })

    return count !== 0
}
