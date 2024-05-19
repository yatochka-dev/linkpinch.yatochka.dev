'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'react-hot-toast'

const Button = dynamic(() => import('@mui/material/Button'))
const RefreshIcon = dynamic(() => import('@mui/icons-material/Refresh'))
export default function RefreshPage({ ui }: { ui?: boolean }) {
    const router = useRouter()
    // const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        // toast('Data refreshed')
        router.refresh()
    }, [])

    if (!ui) return null

    return (
        <Button
            onClick={
                () => {
                    router.refresh()
                }
                // void dispatch(() => {
                //     router.refresh()
                // })
            }
            sx={{}}
            startIcon={<RefreshIcon />}
        >
            Refresh Data
        </Button>
    )
}
