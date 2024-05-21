'use client' // Error components must be Client Components

import Button from '@mui/material/Button'
import React, { useCallback } from 'react'
import copyToClipboard from '@/utils/helpers/copyToClipboard'
import { toast } from 'react-hot-toast'
import { Box, Typography } from '@mui/material'
import LogError from '@/components/logging/log-error'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    //useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error)
    // }, [error])

    const totalString = `
    MSG: ${error.message}
    STACK: ${error.stack}
    NAME: ${error.name}
    TO STRING: ${error.toString()}
    CAUSE: ${JSON.stringify(error.cause)}
    DIGEST: ${error.digest}
    `

    const handleCopy = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            void copyToClipboard(totalString)
            toast.success('Copied to clipboard')
        },
        [],
    )

    return (
        <div>
            {/*<h2>{JSON.stringify(error)}</h2>*/}
            <Box
                sx={{
                    width: '100%',
                    // p: 4,
                    px: 2,
                    pt: '15dvh',
                    pb: 2,
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant={'h4'}>
                    Something went wrong. Please try again.
                </Typography>
                <Typography variant={'body1'} color={'text.secondary'}>
                    The error has already been reported to our team. And you can
                    be sure that we are working hard to fix it. (nah {"we're"}{' '}
                    not)
                </Typography>
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </Box>

            <LogError error={error} />
        </div>
    )
}
