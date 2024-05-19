'use server'
import auth from '@/utils/functools/auth'
import { parseWithZod } from '@conform-to/zod'
import { shortenUrlSchema } from '@/server/actions/schemas/shorten-url'
import generateURLPath from '@/utils/helpers/generateURLPath'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'

export default async function Action_ShortenUrl(
    _state: unknown,
    formData: FormData,
) {
    const session = await auth()

    const submission = parseWithZod(formData, {
        schema: shortenUrlSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }

    const path =
        submission.value.alias === ''
            ? await generateURLPath()
            : submission.value.alias

    await db.shortenedURL.create({
        data: {
            originalURL: submission.value.url,
            path,
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    })

    revalidatePath('/dashboard')
}
