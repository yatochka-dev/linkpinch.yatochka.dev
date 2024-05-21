import React from 'react'
import { PageDialog } from '@/components/ui/page-dialog'
import { Box, Typography } from '@mui/material'
import { db } from '@/server/db'

export default async function EditModal({
    params,
}: {
    params: {
        id: string
    }
}) {
    // simulate loading
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    // const data = (await getShortenedUrl(
    //     params.id,
    //     true,
    // )) as ShortenedLinkWithClickCount
    const url = await db.shortenedURL.findUnique({
        where: {
            id: params.id,
        },
        include: {
            clicks: true,
        },
    })

    if (!url) {
        return (
            <PageDialog>
                <h1>Not found</h1>
            </PageDialog>
        )
    }
    const devices = url.clicks.map((c) => c?.metadata ?? {})
    return (
        <>
            <PageDialog>
                <Box
                    sx={{
                        p: 20,
                    }}
                >
                    <Typography>WOOOOW ANALYTICS</Typography>
                    {devices.map((d) => (
                        <>
                            <pre>{JSON.stringify(d)}</pre>
                            <br />
                        </>
                    ))}
                </Box>
            </PageDialog>
        </>
    )
}
