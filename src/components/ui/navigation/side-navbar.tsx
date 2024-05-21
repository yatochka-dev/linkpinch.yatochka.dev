'use client'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import {
    Avatar,
    Container,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import useResponsive from '@/utils/hooks/useResponsive'
import Link from 'next/link'
import { type Session } from 'next-auth'
import { getDefaultAvatar } from '@/utils/functools/get-default-avatar'
import Logo from '@/components/icons/logo'
import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from 'material-ui-popup-state/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { signOut } from 'next-auth/react'
import { NavLink } from '@/components/ui/SideNavbarLink'

export default function SideNavbar({ session }: { session: Session | null }) {
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

    const isDrawerMobile = useMemo(() => {
        return type === 'temporary'
    }, [type])

    const loggedIn = !!session
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    })
    const handleLogout = useCallback(() => {
        void signOut()
    }, [])
    const handleDrawerToggle = useCallback(() => {
        setDrawerOpen((prev) => !prev)
    }, [])
    const onDrawerClose = useCallback(() => {
        setDrawerOpen(false)
    }, [])

    return (
        <>
            {isDrawerMobile && (
                <Container
                    sx={{
                        pt: 4,
                    }}
                >
                    <IconButton sx={{}} onClick={handleDrawerToggle}>
                        <MenuIcon
                            sx={{
                                fontSize: '2.5rem',
                            }}
                        />
                    </IconButton>
                </Container>
            )}
            <Drawer
                variant={type}
                open={open}
                PaperProps={{
                    sx: {
                        width: width,
                        maxHeight: '100dvh',
                        // transform: "translateY(10dvh) translateX(1dvw)",
                    },
                    variant: 'outlined',
                }}
                onClose={onDrawerClose}
            >
                <Box
                    sx={{
                        mx: 2,
                        pt: 2,
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
