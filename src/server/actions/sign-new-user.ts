'use server'

import { parseWithZod } from '@conform-to/zod'
import { db } from '@/server/db'
import generateURLPath from '@/utils/functools/generate-path-for-shortened-url'
import auth from '@/utils/functools/auth'
import { redirect } from 'next/navigation'
import { signNewUserSchema } from '@/server/actions/schemas/sign-new-user-schema'

export default async function Action_SignNewUser(
    _state: unknown,
    formData: FormData,
) {
    const submission = parseWithZod(formData, {
        schema: signNewUserSchema,
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
