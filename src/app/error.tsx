'use client' // Error components must be Client Components

import Button from '@mui/material/Button'
import React, { useCallback } from 'react'
import copyToClipboard from '@/utils/helpers/copyToClipboard'
import { toast } from 'react-hot-toast'
import { Box } from '@mui/material'

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
                    display: 'flex',
                    p: 4,
                    gap: 2,
                }}
            >
                <Button onClick={handleCopy} variant={'outlined'}>
                    COPY TO CLIPBOARD
                </Button>
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </Box>

            <h2>MSG: {error.message}</h2>
            <h2>STACK: {error.stack}</h2>
            <h2>NAME: {error.name}</h2>
            <h2>TO STRING: {error.toString()}</h2>
            <h2>CAUSE: {JSON.stringify(error.cause)}</h2>
            <h2>DIGEST: {error.digest}</h2>
        </div>
    )
}
