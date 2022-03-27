import React, { useState } from 'react';
import { Button, Box, Container } from '@mui/material';
import { useDispatch } from "react-redux";
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
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center" }}>
        <h1>Hệ thống đại lý</h1>
      </Box>

      <Button
        className='button-add-product'
        background='info'
        variant='contained'
        onClick={(e) => handleAdd(e)}
      >Thêm mới Đại lý
      </Button>

      <DealerTable />

      <DealerModal
        openDealer={openDealer}
        handleCloseDealer={(e) => { handleOpenDealer(e) }}
      />

    </Container>
  );
};

export default Dealer;