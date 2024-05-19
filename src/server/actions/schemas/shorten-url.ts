import { z } from 'zod'
import { AliasZodString } from '@/utils/zod'

export const shortenUrlSchema = z.object({
    url: z.string().url(),
    alias: AliasZodString.optional(),
})
