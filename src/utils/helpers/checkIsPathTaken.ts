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

    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)
    console.log('count', count)

    return count !== 0
}
