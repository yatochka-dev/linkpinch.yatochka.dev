import { z } from 'zod'

export const deleteShortenedURLSchema = z.object({
    id: z.string(),
})
