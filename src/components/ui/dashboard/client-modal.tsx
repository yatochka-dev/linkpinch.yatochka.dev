'use client'
import React from 'react'
import { DialogContent, DialogTitle } from '@mui/material'
import EditShortenedURLForm from '@/components/forms/edit-shortened-url-form'
import { type ShortenedLinkWithClickCount } from '@/utils/types/db'
import { PageDialog } from '@/components/ui/page-dialog'

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
