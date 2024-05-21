import CheckIsPathTaken from '@/utils/functools/check-is-path-taken'

export default async function generatePathForShortenedUrl(pathLength = 6) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let path = ''
    for (let i = 0; i < pathLength; i++) {
        path += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    if (await CheckIsPathTaken(path)) {
        return await generatePathForShortenedUrl()
    }
    return path
}

// for cronjob ids
export async function generateID(length = 6) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return id
}
