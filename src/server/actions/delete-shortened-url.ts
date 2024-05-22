'use server'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { parseWithZod } from '@conform-to/zod'
import auth from '@/utils/functools/auth'
import { deleteShortenedURLSchema } from '@/server/actions/schemas/delete-shortened-url-schema'

export async function Action_DeleteShortenedURL(
    _state: unknown,
    formData: FormData,
) {
    await auth()
    const submission = parseWithZod(formData, {
        schema: deleteShortenedURLSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }
    await db.shortenedURL.delete({
        where: {
            id: submission.value.id,
        },
    })

    revalidatePath('/dashboard')
}
