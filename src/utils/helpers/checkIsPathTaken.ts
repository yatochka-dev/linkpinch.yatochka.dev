import { db } from '@/server/db'

export default async function CheckIsPathTaken(
    path: string,
    ignoreID?: string,
): Promise<boolean> {
    console.log('path', path)
    const count = await db.shortenedURL.count({
        where: {
            path,
            id: {
                not: ignoreID ?? '',
            },
        },
    })

    return count !== 0
}
