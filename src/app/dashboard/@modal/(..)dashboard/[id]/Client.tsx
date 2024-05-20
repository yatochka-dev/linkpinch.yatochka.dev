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
                sx={
                    {
                        // width: 'clamp(100%, 40vw, 600px)',
                    }
                }
            >
                <DialogTitle>Edit Shortened URL</DialogTitle>
                <DialogContent
                    sx={
                        {
                            // width: 'clamp(100%, 40vw, 600px)',
                        }
                    }
                >
                    <EditShortenedURLForm data={data} page={false} />
                </DialogContent>
            </PageDialog>
        </>
    )
}
