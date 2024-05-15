'use client'
import EditShortenedURLForm from '@/components/forms/EditShortenedURLForm'
import React, { useCallback, useState } from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function EditModal({
    params,
}: {
    params: {
        id: string
    }
}) {
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lorem ipsum dolor.</DialogTitle>
            </Dialog>
        </>
    )
}
