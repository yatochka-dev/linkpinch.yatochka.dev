import {db} from "@/server/db";

export async function GET(_request: Request, {params}: { params: { id: string } }) {

    const url = await db.shortenedURL.findUnique({
        where: {
            id: params.id
        }
    })

    if (!url) {
        return new Response(JSON.stringify({
            "status": "not found",
        }))
    }

    const res = await db.click.create({
        data: {
            url: {
                connect: {
                    id: url.id
                }
            }
        }
    })

    return new Response(JSON.stringify({
        "status": res,
    }))
}