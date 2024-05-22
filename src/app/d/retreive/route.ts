import { kv } from '@vercel/kv'
import { clickEventCronJobListName } from '@/utils/const'

export async function GET(req: Request) {
    const d = await kv.rpop<string[]>(clickEventCronJobListName, 500)
    console.log('cronjob-linkpinch', d)
    console.log(d?.length)
    const dt = JSON.stringify(d) + '\t\t' + new Date().toISOString()

    return new Response(dt, {})
}

export async function POST(req: Request) {
    const d = await kv.rpop(clickEventCronJobListName, 1000)
    console.log('cronjob-linkpinch', d)
    const dt = JSON.stringify(d) + '\t\t' + new Date().toISOString()

    return new Response(dt, {})
}
