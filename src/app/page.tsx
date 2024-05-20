import { Box, Typography } from '@mui/material'

export default function Home() {
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant={'h1'}>Hello World</Typography>
        </Box>
    )
}
