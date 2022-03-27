import React from 'react';
import { Container, Box } from '@mui/material';
import ProductNewList from "./ProductNewList";

const ProductNewListView = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Tin Tức Sản Phẩm</h1>
      </Box>

      <ProductNewList />
    </Container>
  );
};

export default ProductNewListView;