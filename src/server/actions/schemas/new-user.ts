import { z } from 'zod'

export const newUserSchema = z.object({
    url: z.string().url(),
})
