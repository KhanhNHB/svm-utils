import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    )
}

export default Loading