'use client'
import React, { useCallback, useState } from 'react'
import { Dialog, type DialogProps } from '@mui/material'
import { useRouter } from 'next/navigation'

export const PageDialog = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & Omit<Omit<DialogProps, 'onClose'>, 'open'>) => {
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
            <Dialog open={open} onClose={handleClose} {...props}>
                {children}
            </Dialog>
        </>
    )
}
