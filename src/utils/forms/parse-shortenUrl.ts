import { z } from 'zod'
import { matcher } from '@/utils/helpers/checkIsPathValid'

export const shortenUrlSchema = z.object({
    url: z.string().url(),
    alias: z.string().min(3).max(30).regex(matcher, 'regex').optional(),
})
export default async function parseNewUser(
    _: FormData,
): Promise<
    z.SafeParseReturnType<
        z.infer<typeof shortenUrlSchema>,
        z.infer<typeof shortenUrlSchema>
    >
> {
    const entries = Object.fromEntries(_)
    return await shortenUrlSchema.safeParseAsync(entries)
}
