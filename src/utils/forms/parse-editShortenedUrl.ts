import { z } from 'zod'

export const shortenUrlSchema = z.object({
    id: z.string(),
    url: z.string().url().optional(),
    alias: z
        .string()
        .min(3)
        .max(30)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
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
