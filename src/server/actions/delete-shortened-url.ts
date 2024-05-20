'use server'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { parseWithZod } from '@conform-to/zod'
import auth from '@/utils/functools/auth'
import { deleteShortenedURLSchema } from '@/server/actions/schemas/delete-shortened-url'

export async function deleteShortenedURL(_state: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: deleteShortenedURLSchema,
    })

    const session = await auth()

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
