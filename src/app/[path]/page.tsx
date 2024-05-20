import { db } from '@/server/db'
import { redirect } from 'next/navigation'
import registerClickInBackground from '@/utils/functools/registerClickInBackground'
import { Box, Typography } from '@mui/material'
import { RedirectType } from 'next/dist/client/components/redirect'
import { cookies, headers } from 'next/headers'

export default async function ShortenedPage({
    params,
}: {
    params: {
        path: string
    }
}) {
    const h = headers()
    const c = cookies()
    // console.dir(h)
    // console.dir(c)

    const path = params.path

    const url = await db.shortenedURL.findUnique({
        where: {
            path,
        },
    })

    if (url) {
        try {
            await registerClickInBackground(url, JSON.stringify(h))
        } catch (e) {
            console.error('Error registering click', e)
        }

        redirect(url.originalURL, RedirectType.push)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100dvh - 64px)',
                flexDirection: 'column',
            }}
        >
            <Typography variant={'h3'}>
                This URL does not exist, or has been deleted.
            </Typography>
        </Box>
    )
}
