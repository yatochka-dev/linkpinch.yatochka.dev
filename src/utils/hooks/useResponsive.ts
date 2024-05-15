import { type Breakpoint } from '@mui/material/styles'
import { useWidth } from '@/utils/hooks/useWidth'

type useResponsiveType<Type> = Partial<
    Record<Breakpoint | 'zero' | 'xsm', Type>
>

export default function useResponsive<Type>(
    _: useResponsiveType<Type>,
    defaultValue?: Type,
) {
    const width = useWidth()
    console.log(width)

    return _[width] ?? defaultValue
}
