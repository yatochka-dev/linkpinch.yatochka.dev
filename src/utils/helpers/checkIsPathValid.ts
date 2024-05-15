import CheckIsPathTaken from '@/utils/helpers/checkIsPathTaken'

export default async function CheckIsPathValid(path: string): Promise<boolean> {
    if (path.length < 3) {
        return false
    }

    if (path.length > 30) {
        return false
    }

    if (!path.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
        return false
    }

    return !(await CheckIsPathTaken(path))
}
