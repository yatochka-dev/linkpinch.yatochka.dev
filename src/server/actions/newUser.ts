'use server'

import { parseWithZod } from '@conform-to/zod'
import { db } from '@/server/db'
import generateURLPath from '@/utils/helpers/generateURLPath'
import auth from '@/utils/functools/auth'
import { redirect } from 'next/navigation'
import { newUserSchema } from '@/server/actions/schemas/new-user'

export default async function Action_NewUser(
    _state: unknown,
    formData: FormData,
) {
    const submission = parseWithZod(formData, {
        schema: newUserSchema,
    })

    const session = await auth()

    if (submission.status !== 'success') {
        return submission.reply()
    }

    await db.shortenedURL.create({
        data: {
            originalURL: submission.value.url,
            path: await generateURLPath(),
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    })

    redirect('/dashboard')
}
