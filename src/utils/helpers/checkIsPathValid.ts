import CheckIsPathTaken from '@/utils/helpers/checkIsPathTaken'

export const matcher = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$|^([a-zA-Z0-9]+)$/
export default async function CheckIsPathValid(
    path: string,
    ignoreID?: string,
): Promise<boolean> {
    if (path.length < 3) {
        return false
    }

    if (path.length > 30) {
        return false
    }
    console.log('path', path)

    if (!path.match(matcher)) {
        return false
    }

    console.log('path', path)

    return !(await CheckIsPathTaken(path, ignoreID))
}
