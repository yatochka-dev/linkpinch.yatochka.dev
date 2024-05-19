import CheckIsPathTaken from '@/utils/helpers/checkIsPathTaken'
import { AliasZodString } from '@/utils/zod'

export default async function CheckIsPathValid(
    path: string,
    ignoreID?: string,
): Promise<boolean> {
    const { success, data } = await AliasZodString.safeParseAsync(path)

    if (!success) {
        return false
    }

    return !(await CheckIsPathTaken(data, ignoreID))
}
