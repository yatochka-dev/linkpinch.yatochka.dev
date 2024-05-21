'use server'

import { parseWithZod } from '@conform-to/zod'
import { logErrorSchema } from '@/server/actions/schemas/log-error'

export default async function Action_LogError(
    _state: unknown,
    formData: FormData,
) {
    const submission = parseWithZod(formData, {
        schema: logErrorSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }

    // console.log(submission.value.error)
    await LogErrorToService(submission.value.error)

    return submission.reply()
}

async function LogErrorToService(error: string) {
    console.error(error)
}
