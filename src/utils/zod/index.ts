import { z } from 'zod'
import { env } from '@/env'

export const matcher = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$|^([a-zA-Z0-9]+)$/

export const AliasZodString = z.string().min(3).max(30).regex(matcher, 'regex')
export const UrlZodString = z
    .string({ message: 'This field is required' })
    .url("This doesn't look like a valid URL. Please try again.")
    .refine(
        (u) => {
            try {
                const isHttp =
                    u.startsWith('http://') || u.startsWith('https://')

                if (!isHttp) {
                    return false
                }

                const uo = new URL(u)
                const nuo = new URL(env.NEXT_PUBLIC_BASE_URL)
                return uo.host !== nuo.host
            } catch (e) {
                return false
            }
        },
        { message: 'This URL is already shortened.' },
    )
