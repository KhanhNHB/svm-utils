import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import ModalProductDetail from '../product-modal/ModalProductDetail';
import ModalProductFeature from '../product-modal/ModalProductFeature';
import ModalProductImage from '../product-modal/ModalProductImage';
import ModalProductDelete from '../product-modal/ModalProductDelete';

import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/product.action'

const columns = [
  { id: 'no', label: 'STT.', minWidth: 50 },
  { id: 'id', label: 'ID', minWidth: 50 },
  {
    id: 'name',
    label: 'Tên Sản Phẩm',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
  
];

export default function ProductTable() {
  const dispatch = useDispatch();
  const currentId = useSelector((state)=> state.product.currentProductId)
  const product = useSelector((state)=> state.product.product)
  const products = useSelector((state)=> state.product.products)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDetail, setOpenDetail] = useState(false);
  const [openFeature, setOpenFeature] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  
  

  useEffect(() => {
    dispatch(Actions.loadProducts())
  
  }, [dispatch]);

  const mappingProducts = (products) => {
    let newProds = [...products]
    let productNames = newProds.map((product, index)=> {
      return {
        no: index+1,
        id: product.id,
        name: product.name,
        action: product.id
    }
    })
    return productNames;
  }
  
  const rows = mappingProducts(products)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (event, id) => {
    dispatch(Actions.setDeleteType('product'))
    dispatch(Actions.setProductId(id))
    handleClose('delete', id);
  }
  
  const handleEdit = (event, id) => {
    const curentProd = {...product}
    dispatch(Actions.loadProduct(id))
    dispatch(Actions.setProductId(id))
    if(curentProd === product){
      handleClose('detail', id);
    } else {
      setTimeout(() => {
        handleClose('detail', id);
      }, 100);
    }
    
  }
  const handleFeature = (event, id) => {
    dispatch(Actions.loadProductFeatures(id))
    dispatch(Actions.setProductId(id))

    handleClose('feature', id);
  
  }
  const handleImage = (event, id) => {
    dispatch(Actions.loadProductImages(id))
    dispatch(Actions.setProductId(id))
    handleClose('image', id);
  }
  
  const handleClose = (typeModal, id) => {
    switch (typeModal) {
      case 'delete':
        setOpenDelete(!openDelete);
        break;
      case 'detail':
        setOpenDetail(!openDetail);
        break;
      case 'feature':
        setOpenFeature(!openFeature);
        break;
      case 'image':
        setOpenImage(!openImage);
        break;
      default:
        break;
    }
  };

  return (
    <Paper sx={{ width: '100%', height:'100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index+column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id+index}>
                    {columns.map((column, index) => {
                      const value = row[column.id]                    
                      if(column.id == 'action') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                              <Button onClick={(e)=> {handleDelete(e, value)}} color='error'>Ẩn</Button>
                              <Button onClick={(e)=> {handleEdit(e, value)}} color='success'>Chỉnh sửa chi tiết</Button>
                              <Button onClick={(e)=> {handleFeature(e, value)}} color='info'>Thêm tính năng</Button>
                              <Button onClick={(e)=> {handleImage(e, value)}} color='secondary'>Thêm hình hiển thị</Button>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                            {value}
                          </TableCell>
                        );
                      }                   
                      
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    <ModalProductDetail
        openDetail={openDetail}
        handleCloseDetail={() => { handleClose('detail')}}
    />
    <ModalProductFeature
        openFeature={openFeature}
        handleCloseFeature={() => { handleClose('feature')}}
    />
     <ModalProductImage
        openImage={openImage}
        handleCloseImage={() => { handleClose('image')}}
    />

    <ModalProductDelete
        openDelete={openDelete}
        handleCloseDelete={() => { handleClose('delete')}}
    />
    </Paper>
    
  );
}
