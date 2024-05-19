import { z } from 'zod'

export const matcher = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$|^([a-zA-Z0-9]+)$/

export const AliasZodString = z.string().min(3).max(30).regex(matcher, 'regex')
