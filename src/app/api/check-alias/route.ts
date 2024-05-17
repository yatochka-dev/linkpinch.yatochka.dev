import CheckIsPathValid from '@/utils/helpers/checkIsPathValid'

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams
    const alias = searchParams.get('alias')
    const ignoreID = searchParams.get('ignoreID')

    const data = {
        ok: !!alias
            ? await CheckIsPathValid(alias, ignoreID ?? undefined)
            : false,
    }

    return Response.json({ ...data })
}
