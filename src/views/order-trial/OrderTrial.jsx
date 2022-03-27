import React from 'react';
import { Container, Box } from '@mui/material';
import OrderTrialTable from './order-trial-table/OrderTrialTable';
import './css/order-trial.css'

const OrderTrial = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Dữ Liệu Đăng kí dùng thử</h1>
      </Box>

      <OrderTrialTable />
    </Container>
  );
};

export default OrderTrial;