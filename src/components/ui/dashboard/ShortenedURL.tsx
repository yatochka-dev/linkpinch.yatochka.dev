'use client'
import React, { useCallback } from 'react'
import { type ShortenedURL } from '@prisma/client'
import {
    Avatar,
    Box,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import getFaviconFromURL from '@/utils/helpers/getFaviconFromURL'
import getFullShortenedURL from '@/utils/helpers/getFullShortenedURL'
import Button from '@mui/material/Button'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import BarChartIcon from '@mui/icons-material/BarChart'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import copyToClipboard from '@/utils/helpers/copyToClipboard'
import { toast } from 'react-hot-toast'

interface ShortenedURLProps {
    data: ShortenedURL & {
        _count: {
            clicks: number
        }
    }
}

export default function Dashboard_ShortenedURL({ data }: ShortenedURLProps) {
    const handleCopy = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            void copyToClipboard(getFullShortenedURL(data, true)).then(() => {
                toast.success('Copied to clipboard', {})
            })
        },
        [data],
    )

    return (
        <Paper
            sx={{
                p: 4,
                width: '100%',
                mt: 4,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
            }}
        >
            <Box>
                <Avatar
                    src={getFaviconFromURL(data.originalURL)}
                    sx={{
                        bgcolor: 'white',
                        p: 1,
                    }}
                    alt={`Favicon for ${new URL(data.originalURL).host}`}
                >
                    {data.originalURL}
                </Avatar>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                }}
            >
                <Typography
                    variant={'h6'}
                    sx={{
                        mt: -1,
                    }}
                >
                    {data.webPageTitle ??
                        "Some random title until I manage to fetch page's titles"}
                </Typography>
                <Typography
                    color={'info.main'}
                    component={Link}
                    href={getFullShortenedURL(data, true)}
                    target={'_blank'}
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {getFullShortenedURL(data)}
                </Typography>
                <Typography
                    color={'text.secondary'}
                    component={Link}
                    href={data.originalURL}
                    target={'_blank'}
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                        display: 'flex',
                    }}
                >
                    <Box
                        component={'span'}
                        sx={{
                            display: 'inline-block',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-all',
                            maxHeight: '1.5em',
                            overflow: 'hidden',
                            '-webkit-line-clamp': '1',
                            '-webkit-box-orient': 'vertical',
                        }}
                    >
                        {data.originalURL}
                    </Box>
                    <Box
                        component={'span'}
                        sx={{
                            display: 'inline-block',
                            transform: 'translateX(-0.29em)',
                        }}
                    >
                        {data.originalURL.length > 50 ? '...' : ''}
                    </Box>
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        //  position at the bottom
                        mt: 2,
                        gap: 2,
                    }}
                >
                    <Tooltip
                        title={
                            'Engagements are the number of times the shortened URL has been clicked.'
                        }
                    >
                        <Box
                            sx={{
                                cursor: 'help',
                            }}
                        >
                            <Typography
                                variant={'caption'}
                                sx={{
                                    display: 'flex',

                                    alignItems: 'center',
                                }}
                            >
                                <BarChartIcon fontSize={'small'} />
                                <Box
                                    sx={{
                                        mt: 0.7,
                                        ml: 0.5,
                                    }}
                                >
                                    {data._count.clicks} engagements
                                </Box>
                            </Typography>
                        </Box>
                    </Tooltip>
                    <Box>
                        <Typography
                            variant={'caption'}
                            sx={{
                                display: 'flex',

                                alignItems: 'center',
                            }}
                        >
                            <CalendarTodayIcon fontSize={'small'} />
                            <Box
                                sx={{
                                    mt: 0.7,
                                    ml: 0.5,
                                }}
                            >
                                {data.createdAt.toLocaleDateString()}
                            </Box>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box flexGrow={1} />
            <Box
                sx={{
                    mt: -2,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                }}
            >
                <Button
                    startIcon={<ContentCopyIcon />}
                    size={'small'}
                    variant={'outlined'}
                    onClick={handleCopy}
                >
                    <Box
                        component={'span'}
                        sx={{
                            mt: 0.2,
                        }}
                    >
                        Copy
                    </Box>
                </Button>
                <Button
                    size={'small'}
                    variant={'text'}
                    sx={{
                        minWidth: 32,
                    }}
                    component={Link}
                    href={`/dashboard/${data.id}`}
                >
                    <EditIcon />
                </Button>
            </Box>
        </Paper>
    )
}
