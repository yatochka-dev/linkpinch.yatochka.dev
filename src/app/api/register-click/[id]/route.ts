import { db } from '@/server/db'
import { kv } from '@vercel/kv'

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const { searchParams } = new URL(request.url)

    const url = await db.shortenedURL.findUnique({
        where: {
            id: params.id,
        },
    })

    if (!url) {
        return new Response(
            JSON.stringify({
                status: 'not found',
            }),
        )
    }
    const key = searchParams.get('cron') ?? ''
    const metadata = (await kv.get(key)) ?? '{}'
    try {
        await kv.del(key)
    } catch (e) {
        console.log('Failed to delete key', key, e)
    }
    const res = await db.click.create({
        data: {
            metadata,
            url: {
                connect: {
                    id: url.id,
                },
            },
        },
    })

    return new Response(
        JSON.stringify({
            status: res,
        }),
    )
}
