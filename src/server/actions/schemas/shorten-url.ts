import { z } from 'zod'
import { AliasZodString } from '@/utils/zod'

export const shortenUrlSchema = z.object({
    url: z
        .string({ message: 'This field is required' })
        .url("This doesn't look like a valid URL. Please try again."),
    alias: AliasZodString.optional(),
})
