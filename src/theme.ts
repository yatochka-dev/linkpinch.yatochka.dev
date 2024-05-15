'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',

        background: {
            default: 'hsl(240, 10%, 4%)',
            paper: 'hsl(240, 10%, 8%)',
        },
        primary: {
            main: 'hsl(0, 0%, 98%)',
        },
        text: {
            primary: '#FAFAFA',
            secondary: 'hsl(0, 0%, 60%)',
            disabled: 'hsl(0, 0%, 40%)',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
        },
    },
    breakpoints: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        keys: ['zero', 'xs', 'xsm', 'sm', 'md', 'lg', 'xl'],
        values: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            zero: 0,
            xs: 400,
            xsm: 450,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
})

export default theme
