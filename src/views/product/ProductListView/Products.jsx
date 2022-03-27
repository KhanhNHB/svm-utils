import React, { useState } from 'react';
import { Button, Box, Container } from '@mui/material';
import { useDispatch } from "react-redux";
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
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center" }}>
        <h1>Quản lý sản phẩm</h1>
      </Box>

      <Button
        className='button-add-product'
        background='info'
        variant='contained'
        onClick={(e) => handleAdd(e)}
      >Thêm mới sản phẩm
      </Button>

      <ProductTable />

      <ModalProductDetail
        openDetail={openDetail}
        handleCloseDetail={(e) => { handleAdd(e) }}
      />

    </Container >
  );
};

export default Products;