'use client'
import React from 'react'
import { DialogContent, DialogTitle } from '@mui/material'
import EditShortenedURLForm from '@/components/forms/EditShortenedURLForm'
import { type ShortenedLinkWithClickCount } from '@/utils/types/dbHelper'
import { PageDialog } from '@/components/ui/PageDialog'

interface ClientModalProps {
    data: ShortenedLinkWithClickCount
}

export default function ClientModal({ data }: ClientModalProps) {
    return (
        <>
            <PageDialog
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
            </PageDialog>
        </>
    )
}
