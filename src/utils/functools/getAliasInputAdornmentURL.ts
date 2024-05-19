import { env } from '@/env'

export default function getAliasInputAdornmentURL(): string {
    return new URL(env.NEXT_PUBLIC_BASE_URL).toString()
}
