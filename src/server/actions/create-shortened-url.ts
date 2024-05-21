'use server'
import auth from '@/utils/functools/auth'
import { parseWithZod } from '@conform-to/zod'
import { createShortenedURLSchema } from '@/server/actions/schemas/create-shortened-url-schema'
import generateURLPath from '@/utils/helpers/generateURLPath'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import CheckIsPathTaken from '@/utils/helpers/checkIsPathTaken'
import getPageTitleFromURL from '@/utils/helpers/getPageTitleFromURL'

export default async function Action_CreateShortenedURL(
    _state: unknown,
    formData: FormData,
) {
    const session = await auth()

    const submission = parseWithZod(formData, {
        schema: createShortenedURLSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }

    const isPathTaken = await CheckIsPathTaken(submission.value.alias ?? '')

    if (isPathTaken) {
        return submission.reply({
            formErrors: [
                "The alias you've chosen is already taken. Please choose another.",
            ],
            fieldErrors: {
                alias: ['This alias is already taken.'],
            },
        })
    }

    const path =
        submission.value.alias === ''
            ? await generateURLPath()
            : submission.value.alias

    const title = await getPageTitleFromURL(submission.value.url)

    await db.shortenedURL.create({
        data: {
            originalURL: submission.value.url,
            path,
            title: title,
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    })

    revalidatePath('/dashboard')

    return submission.reply({
        resetForm: true,
    })
}
