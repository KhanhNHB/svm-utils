import React from 'react';
import { Container, Box } from '@mui/material';
import OrderTable from './order-table/OrderTable';
import './css/order.css'
const Order = () => {

  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Dữ liệu Đặt Hàng</h1>
      </Box>

      <OrderTable />
    </Container>
  );
};

export default Order;