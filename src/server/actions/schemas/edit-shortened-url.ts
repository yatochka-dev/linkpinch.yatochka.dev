import { z } from 'zod'
import { AliasZodString } from '@/utils/zod'

export const editShortenedURLSchema = z.object({
    id: z.string(),
    url: z.string().url().optional(),
    alias: AliasZodString.optional(),
})
