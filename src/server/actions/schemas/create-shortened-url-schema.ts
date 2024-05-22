import { z } from 'zod'
import { AliasZodString, UrlZodString } from '@/utils/zod'

export const createShortenedURLSchema = z.object({
    url: UrlZodString,
    alias: AliasZodString.optional(),
})
