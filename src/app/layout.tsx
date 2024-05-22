import '@/styles/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { Container, CssBaseline } from '@mui/material'
import SideNavbar from '@/components/ui/navigation/side-navbar'
import Box from '@mui/material/Box'
import { getServerAuthSession } from '@/server/auth'

export const metadata = {
    title: 'LinkPinch',
    description:
        'LinkPinch is a URL shortener service that allows you to shorten long URLs and share them easily.',
    icons: [{ rel: 'icon', url: '/LINKPINCH.svg' }],
}

const font = Poppins({
    // weights: ["400", "500", "600", "700"],
    weight: '400',
    subsets: ['latin'],
})

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerAuthSession()

    return (
        <AppRouterCacheProvider
            options={{
                key: 'yatochka',
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <html lang="en">
                    <Box
                        component="body"
                        className={font.className}
                        style={font.style}
                    >
                        <Toaster position={'bottom-right'} toastOptions={{}} />

                        <SideNavbar session={session} />

                        <Container
                            sx={{
                                py: 4,
                            }}
                        >
                            {children}
                        </Container>
                    </Box>
                </html>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
