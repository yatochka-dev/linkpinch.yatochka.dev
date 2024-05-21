import CheckIsPathValid from '@/utils/functools/check-is-path-valid'

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams
    const alias = searchParams.get('alias')
    const ignoreID = searchParams.get('ignoreID')

    console.log('alias', alias)
    console.log('ignoreID', ignoreID)

    const data = {
        ok: !!alias
            ? await CheckIsPathValid(alias, ignoreID ?? undefined)
            : false,
    }

    return Response.json({ ...data })
}
