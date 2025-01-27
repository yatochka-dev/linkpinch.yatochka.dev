import { z } from 'zod'
import { AliasZodString, UrlZodString } from '@/utils/zod'

export const createShortenedURLSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    url: UrlZodString,
    alias: AliasZodString.optional(),
})
