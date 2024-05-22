import React from 'react'
import type { ButtonProps } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Divider from '@mui/material/Divider'

interface NavLinkProps {
    last?: boolean
    icon?: React.ReactNode
    href?: string
    newTab?: boolean
    children?: React.ReactNode
    profile?: boolean
    buttonProps?: ButtonProps
}

export default function SideNavbarLink({
    last = false,
    icon,
    href,
    newTab,
    children,
    profile,
    buttonProps,
}: NavLinkProps) {
    return (
        <>
            <Button
                {...buttonProps}
                sx={{
                    mb: profile ? 0.3 : 0,
                    borderRadius: 0,
                    py: 1.8,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textAlign: 'center',
                    position: 'relative',
                }}
                variant={'text'}
                startIcon={
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: profile ? '50%' : '57%',
                            transform: 'translateY(-50%)',
                            ml: 2,
                        }}
                    >
                        {icon}
                    </Box>
                }
                component={href ? Link : 'button'}
                target={newTab ? '_blank' : undefined}
                href={href ? href : undefined}
            >
                <Box component={'span'} sx={{}}>
                    {children ? children : 'Link'}
                </Box>
            </Button>
            {!last && <Divider />}
        </>
    )
}
