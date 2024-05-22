import Button from '@mui/material/Button'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React from 'react'

export default function GoBackToDashboardButton() {
    return (
        <Button
            component={Link}
            href={'/dashboard'}
            sx={{
                alignSelf: 'flex-start',
                mb: 2,
            }}
            startIcon={<ArrowBackIcon />}
        >
            Go Back To Dashboard
        </Button>
    )
}
