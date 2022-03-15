import React, { useEffect, useState } from 'react';
import {Grid, Button, Paper, Box} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import ProductTable from './product-table/ProductTable';
import ModalProductDetail from './product-modal/ModalProductDetail';
import * as Actions from './redux/product.action';

import './css/product.css'

const Products = () => {
  const dispatch = useDispatch();

  const [openDetail, setOpenDetail] = useState(false);

  const handleAdd = (event) => {
    dispatch(Actions.setProduct({}))
    dispatch(Actions.setProductId(0))
    setOpenDetail(!openDetail)
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
              >Thêm mới sản phẩm</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12} mt={5}>
            <ProductTable/>
          </Grid>
          
          <ModalProductDetail
              openDetail={openDetail}
              handleCloseDetail={(e) => {handleAdd(e)}}
          />
          </Paper>
        </Grid>
        </Grid>
       
    </Box>
  );
};

export default Products;