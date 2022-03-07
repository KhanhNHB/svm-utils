import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import ProductsList from './ProductsList';
import axios from 'axios';
import {
  PRODUCT_ENDPOINT,
  PROVIDER_ENDPOINT
} from '../../../api/endpoint';
import Cookies from 'js-cookie';
import API from '../../../api/API';
import {
  RESPONSE_STATUS,
  USER_DEVICE_TOKEN,
  USER_TOKEN
} from '../../../common';
import { actLoadProducts, actLoadProvider, actLoadProviderName } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation, useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import Chart from '../../chart/Chart';
import Deposits from '../../deposit/Deposits';
import Orders from '../../order/Orders';
import TextEditor from '../../../components/TextEditor';

const Copyright = () => {
  return (
    <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
      {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
    </p>
  );
}

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialContent = "Hello World";

  const onSubmit = (content) => {
    console.log("Submitted Content", content);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            initialContent={initialContent}
            onSubmit={onSubmit}
            title="Trình soạn thảo"
          />
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Box>
  );
};

export default Products;