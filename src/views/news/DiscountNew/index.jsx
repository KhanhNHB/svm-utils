import React from 'react';
import { Box, Container } from '@mui/material';
import DiscountNewList from './DiscountNewList';

const DiscountNewListView = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50}}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Tin Tức Khuyến Mại</h1>
      </Box>

      <DiscountNewList />
    </Container>
  );
};

export default DiscountNewListView;