import React, { useEffect, useState } from 'react';
import {Grid, Button, Paper, Box} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import DealerTable from './dealer-table/DealerTable';
import DealerModal from './dealer-modal/DealerModal';
import * as Actions from './redux/dealer.action';

import './css/dealer.css'

const Dealer = () => {
  const dispatch = useDispatch();

  const [openDealer, setOpenDealer] = useState(false);

  const handleOpenDealer = (event) => {
    setOpenDealer(!openDealer)
  }
  const handleAdd = () => {
    dispatch(Actions.setStatusModal('add'))
    handleOpenDealer()
  }

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
            <Button
                  className='button-add-product'            
                  background='info'
                  variant='contained'
                  onClick={(e) => handleAdd(e)}             
              >Thêm mới Đại lý</Button>
          </Grid>
           <Grid item xs={12} md={12} lg={12} mt={5}>
            <DealerTable/>
          </Grid>
          
          <DealerModal
              openDealer={openDealer}
              handleCloseDealer={(e) => {handleOpenDealer(e)}}
          /> */}
          </Paper>
        </Grid>
        </Grid>
       
    </Box>
  );
};

export default Dealer;