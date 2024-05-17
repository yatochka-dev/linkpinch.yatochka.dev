'use server'
import auth from '@/utils/functools/auth'
import generateURLPath from '@/utils/helpers/generateURLPath'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import parseEditShortenedUrl from '@/utils/forms/parse-editShortenedUrl'

export default async function Action_EditShortenedUrl(
    _state: NonNullable<unknown>,
    formData: FormData,
) {
    const session = await auth()

    const { success, data, error } = await parseEditShortenedUrl(formData)

    // simulate 5000ms delay
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!success) {
        return {
            error: {
                url: error?.errors.find((e) => e.path[0] === 'url')?.message,
                alias: error?.errors.find((e) => e.path[0] === 'alias')
                    ?.message,
            },
        }
    }

    const updateData: {
        originalURL?: string
        path?: string
    } = {}

    if (data.url) {
        updateData.originalURL = data.url
    }
    if (data.alias) {
        updateData.path = data.alias
    }

    console.log('updateData', updateData)

    await db.shortenedURL.update({
        where: {
            id: data.id,
        },

        data: updateData,
    })

    revalidatePath('/dashboard/[id]')

    return {
        error: {
            url: '',
            alias: '',
        },
    }
}
