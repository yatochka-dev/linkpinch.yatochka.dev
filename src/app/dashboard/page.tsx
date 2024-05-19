import { Box } from '@mui/material'
import CreateShortenedURLForm from '@/components/forms/CreateShortenedURLForm'
import auth from '@/utils/functools/auth'
import { db } from '@/server/db'
import Dashboard_ShortenedURL from '@/components/ui/dashboard/ShortenedURL'
import RefreshPage from '@/components/NextJSPleaseFixThat/refresh-page'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
                sx={{
                    py: 4,
                }}
            >
                <RefreshPage />
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
