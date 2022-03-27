import React from 'react';
import { Box, Container } from '@mui/material';
import FeatureList from './FeatureList';

const FeatureView = () => {

  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Hướng Dẫn Tính Năng</h1>
      </Box>

      <FeatureList />
    </Container>
  );
};

export default FeatureView;