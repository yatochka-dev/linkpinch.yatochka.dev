'use client'
import React from 'react'
import useResponsive from '@/utils/hooks/useResponsive'
import { Box } from '@mui/material'

export default function RootTemplate({
    children,
}: {
    children: React.ReactNode
}) {
    const pl = useResponsive(
        {
            zero: 0,
            xsm: 0,
            xs: 0,
            sm: 0,
        },
        27.5,
    )

    return (
        <Box
            sx={{
                pl,
            }}
        >
            {children}
        </Box>
    )
}
