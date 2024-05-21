import { z } from 'zod'

export const logErrorSchema = z.object({
    error: z.string(),
})
