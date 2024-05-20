import { PageDialog } from '@/components/ui/PageDialog'
import { Box, CircularProgress } from '@mui/material'

export default function EditURLLoading() {
    return (
        <PageDialog
            sx={{
                p: 4,
            }}
        >
            <Box
                sx={{
                    p: 4,
                }}
            >
                <CircularProgress />
            </Box>
        </PageDialog>
    )
}
