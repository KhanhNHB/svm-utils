import React, { useEffect, useState } from 'react';
import {Grid, Button, Paper, Box} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import OrderTable from './order-table/OrderTable';
import * as Actions from './redux/order.action';

import './css/order.css'

const Order = () => {
  const dispatch = useDispatch();

  const [openDealer, setOpenDealer] = useState(false);


  return (
    <Box>
      <Grid  container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 1000
            }}
          >
          <Grid item xs={12} md={12} lg={12}>

          </Grid>
           <Grid item xs={12} md={12} lg={12} mt={5}>
            <OrderTable/>
          </Grid>

          </Paper>
        </Grid>
        </Grid>

    </Box>
  );
};

export default Order;