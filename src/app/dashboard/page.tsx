import { Box } from '@mui/material'
import CreateShortenedURLForm from '@/components/forms/create-shortened-url-form'
import auth from '@/utils/functools/auth'
import { db } from '@/server/db'
import Dashboard_ShortenedURL from '@/components/ui/dashboard/shortened-url'
import { revalidatePath } from 'next/cache'
import PendingButton from '@/components/ui/pending-button'
import RefreshIcon from '@mui/icons-material/Refresh'

export default async function DashboardPage() {
    // das a workaround so the page dynamically renders every time, I need no caching for a damn dashboard
    const session = await auth()
    const items = await db.shortenedURL.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            _count: {
                select: {
                    clicks: true,
                },
            },
        },
        orderBy: {
            // clicks: {
            //     _count: "desc"
            //
            // }
            createdAt: 'desc',
        },
    })

    const revalidatePage = async () => {
        'use server'
        revalidatePath('/dashboard', 'page')
    }

    return (
        <Box>
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        visibility: 'hidden',*/}
            {/*        display: 'none',*/}
            {/*        opacity: 0,*/}
            {/*    }}*/}
            {/*    id={'opt-out-of-caching'}*/}
            {/*></Box>*/}
            <CreateShortenedURLForm />
            <Box
                component={'form'}
                action={revalidatePage}
                sx={{
                    mt: 8,
                    px: 1,
                }}
            >
                <PendingButton type={'submit'} startIcon={<RefreshIcon />}>
                    Refresh
                </PendingButton>
            </Box>
            <Box
                sx={{
                    py: 4,
                }}
            >
                {items.map((item) => (
                    <Dashboard_ShortenedURL
                        key={`${item.id}-dashboard-shortened-url-item`}
                        data={item}
                    />
                ))}
            </Box>
        </Box>
    )
}
