'use server'
import auth from '@/utils/functools/auth'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { parseWithZod } from '@conform-to/zod'
import { editShortenedURLSchema } from '@/server/actions/schemas/edit-shortened-url'

export default async function Action_EditShortenedUrl(
    _state: unknown,
    formData: FormData,
) {
    await auth()

    const submission = parseWithZod(formData, {
        schema: editShortenedURLSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }
    // simulate 5000ms delay
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    const updateData: {
        originalURL?: string
        path?: string
    } = {}

    if (submission.value.url) {
        updateData.originalURL = submission.value.url
    }
    if (submission.value.alias) {
        updateData.path = submission.value.alias
    }

    await db.shortenedURL.update({
        where: {
            id: submission.value.id,
        },

        data: updateData,
    })

    revalidatePath('/dashboard/[id]')
}
