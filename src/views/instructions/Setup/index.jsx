import React from 'react';
import { Box, Container } from '@mui/material';
import SetupList from './SetupList';

const FeatureView = () => {

  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Hướng Dẫn Lắp Đặt</h1>
      </Box>

      <SetupList />
    </Container>
  );
};

export default FeatureView;