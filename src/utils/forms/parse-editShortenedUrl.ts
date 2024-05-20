import { z } from 'zod'
import { AliasZodString } from '@/utils/zod'

export const shortenUrlSchema = z.object({
    id: z.string(),
    url: z.string().url().optional(),
    alias: AliasZodString.optional(),
})
export default async function parseEditShortenedUrl(
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
