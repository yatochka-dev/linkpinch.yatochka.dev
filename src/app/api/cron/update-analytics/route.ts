import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { clickEventCronJobListName } from '@/utils/const'
import { db } from '@/server/db'
import { type ClickEvent } from '@/utils/types/cron'

export async function POST() {
    const d = await kv.rpop<ClickEvent[]>(clickEventCronJobListName, 5000)
    console.log(d)
    if (!d) {
        return NextResponse.json({ ok: false })
    }
    // const clickEvents = d.map((e) => {
    //     try {
    //         return JSON.parse(e) as ClickEvent
    //     } catch (e) {
    //         console.error('Error parsing click event', e)
    //         return null
    //     }
    // })
    const filtered = d.filter((e) => e !== null)

    const created = await db.click.createMany({
        data: filtered.map((e) => ({
            urlId: e.id,
            createdAt: e.timestamp,
            metadata: JSON.stringify(e),
        })),
    })

    return NextResponse.json({ ok: true, created })
}
