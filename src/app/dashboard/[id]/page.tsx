import EditShortenedURLForm from '@/components/forms/edit-shortened-url-form'
import { db } from '@/server/db'

export default async function EditShortenedURLPage({
    params,
}: {
    params: {
        id: string
    }
}) {
    const item = await db.shortenedURL.findUnique({
        where: {
            id: params.id,
        },
        include: {
            _count: {
                select: {
                    clicks: true,
                },
            },
        },
    })

    if (!item) {
        return <h1>Not found</h1>
    }

    return <EditShortenedURLForm page data={item} />
}
