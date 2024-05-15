'use client'
import * as React from 'react'
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import { Avatar, Paper, Typography } from '@mui/material'
import useResponsive from '@/utils/hooks/useResponsive'
import Link from 'next/link'
import { type Session } from 'next-auth'
import { getDefaultAvatar } from '@/utils/functools/getDefaultAvatar'

function NavLink({
    last = false,
    icon,
    href,
    newTab,
    children,
    profile,
}: {
    last?: boolean
    icon?: React.ReactNode
    href?: string
    newTab?: boolean
    children?: React.ReactNode
    profile?: boolean
}) {
    return (
        <>
            <Button
                sx={{
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
                            top: profile ? '50%' : '56%',
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

export default function Nav({ session }: { session: Session | null }) {
    const width = useResponsive({}, '220px')

    const loggedIn = !!session?.user
    return (
        <Paper
            sx={{
                width: width,
                height: '100dvh',
                py: 2,
                // transform: "translateY(10dvh) translateX(1dvw)",
                position: 'fixed',
            }}
        >
            <Box
                sx={{
                    mx: 2,
                }}
            >
                <Typography variant={'h5'} component={Link} href={'/'}>
                    LinkPinch
                </Typography>
            </Box>
            <Divider
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '94.5%',
                }}
            >
                {loggedIn && (
                    <NavLink
                        href={'/dashboard'}
                        last
                        icon={<FeaturedPlayListIcon />}
                    >
                        Dashboard
                    </NavLink>
                )}
                <Box flexGrow={0.5} />
                {!loggedIn && (
                    <Typography
                        sx={{
                            px: 2,
                        }}
                    >
                        Log In to access more features
                    </Typography>
                )}
                <Box flexGrow={1} />
                {!loggedIn && <NavLink href={'/login'}>Login</NavLink>}
                {loggedIn && (
                    <NavLink
                        profile
                        last
                        href={'/profile'}
                        icon={
                            <Avatar
                                src={session.user.image ?? getDefaultAvatar()}
                            >
                                {session.user.name}
                            </Avatar>
                        }
                    >
                        Profile
                    </NavLink>
                )}
            </Box>
        </Paper>
    )
}
