import { db } from '@/server/db'
import { redirect } from 'next/navigation'
import registerClickInBackground from '@/utils/functools/registerClickInBackground'
import { Box, Typography } from '@mui/material'

export default async function ShortenedPage({
    params,
}: {
    params: {
        path: string
    }
}) {
    const path = params.path

    const url = await db.shortenedURL.findUnique({
        where: {
            path,
        },
    })

    if (url) {
        await registerClickInBackground(url)

        redirect(url.originalURL)
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
