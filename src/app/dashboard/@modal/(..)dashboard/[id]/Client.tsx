'use client'
import React, { useCallback, useState } from 'react'
import { type ShortenedURL } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import EditShortenedURLForm from '@/components/forms/EditShortenedURLForm'
import { type ShortenedLinkWithClickCount } from '@/utils/types/dbHelper'

interface ClientModalProps {
    data: ShortenedLinkWithClickCount
}

export default function ClientModal({ data }: ClientModalProps) {
    const router = useRouter()
    const [open, setOpen] = useState(true)
    const handleClose = useCallback(() => {
        setOpen(false)

        const timeoutId = setTimeout(() => {
            router.back()
        }, 200)

        return () => clearTimeout(timeoutId)
    }, [router])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        width: '45dvw',
                        maxWidth: '45dvw',
                    },
                }}
            >
                <DialogTitle>Edit Shortened URL</DialogTitle>
                <DialogContent
                    sx={{
                        minWidth: '45dvw',
                        maxWidth: '45dvw',
                    }}
                >
                    <EditShortenedURLForm data={data} page={false} />
                </DialogContent>
            </Dialog>
        </>
    )
}
