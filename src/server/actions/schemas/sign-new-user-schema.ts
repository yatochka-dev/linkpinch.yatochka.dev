import { z } from 'zod'

export const signNewUserSchema = z.object({
    url: z.string().url(),
})
