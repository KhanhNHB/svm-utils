import React from 'react';
import Dashboard from '../reports/DashboardView';
import Box from '@mui/material/Box';

const Copyright = () => {
    return (
        <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
            {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
        </p>
    );
}

const Home = () => {
    return (
        <Box>
            <Dashboard />
            <Copyright sx={{ pt: 4 }} />
        </Box>
    )
}

export default Home;