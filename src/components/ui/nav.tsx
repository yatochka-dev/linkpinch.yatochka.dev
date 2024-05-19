'use client'
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import {
    Avatar,
    type ButtonProps,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material'
import useResponsive from '@/utils/hooks/useResponsive'
import Link from 'next/link'
import { type Session } from 'next-auth'
import { getDefaultAvatar } from '@/utils/functools/getDefaultAvatar'
import Logo from '@/components/icons/Logo'
import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from 'material-ui-popup-state/hooks'
import React, { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'

function NavLink({
    last = false,
    icon,
    href,
    newTab,
    children,
    profile,
    buttonProps,
}: {
    last?: boolean
    icon?: React.ReactNode
    href?: string
    newTab?: boolean
    children?: React.ReactNode
    profile?: boolean
    buttonProps?: ButtonProps
}) {
    return (
        <>
            <Button
                {...buttonProps}
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
    const type = useResponsive<'persistent' | 'temporary'>(
        {
            zero: 'temporary',
            xsm: 'temporary',
            xs: 'temporary',
            sm: 'temporary',
        },
        'persistent',
    )

    const [drawerOpen, setDrawerOpen] = useState(false)

    const open = useResponsive(
        {
            md: true,
            lg: true,
            xl: true,
        },
        drawerOpen,
    )

    const loggedIn = !!session
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    })
    const handleLogout = useCallback(() => {
        void signOut()
    }, [])
    const handleDrawerToggle = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setDrawerOpen((prev) => !prev)
        },
        [],
    )
    const onDrawerClose = useCallback(() => {
        setDrawerOpen(false)
    }, [])

    return (
        <>
            <IconButton
                sx={{
                    mt: 2,
                    ml: 0.8,
                }}
                onClick={handleDrawerToggle}
            >
                <MenuIcon
                    sx={{
                        fontSize: '2.5rem',
                    }}
                />
            </IconButton>
            <Drawer
                variant={type}
                open={open}
                PaperProps={{
                    sx: {
                        width: width,
                        pt: 2,
                        maxHeight: '100dvh',
                        // transform: "translateY(10dvh) translateX(1dvw)",
                    },
                }}
                onClose={onDrawerClose}
            >
                <Box
                    sx={{
                        mx: 2,
                    }}
                >
                    <Typography
                        variant={'h5'}
                        component={Link}
                        href={'/'}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            flexDirection: 'column',
                            gap: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Logo />
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
                        height: '81.8%',
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
                        <>
                            <NavLink
                                buttonProps={bindTrigger(popupState)}
                                profile
                                last
                                // href={'/profile'}
                                icon={
                                    <Avatar
                                        src={
                                            session.user.image ??
                                            getDefaultAvatar()
                                        }
                                    >
                                        {session.user.name}
                                    </Avatar>
                                }
                            >
                                Profile
                            </NavLink>
                            <Menu
                                {...bindMenu(popupState)}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem component={Link} href={'/profile'}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    )
}
