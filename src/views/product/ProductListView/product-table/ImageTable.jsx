import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow   } from '@mui/material';
import * as Actions from '../redux/product.action'
import ModalProductDelete from './../product-modal/ModalProductDelete';

const columns = [
  { id: 'no', label: 'No.', minWidth: 50 },
  { id: 'id', label: 'Id', minWidth: 50 },
  
  {
    id: 'smallImage',
    label: 'Hình lớn',
    maxWidth: 100,
    align: 'center'
  },
  {
    id: 'largeImage',
    label: 'Hình nhỏ',
    maxWidth: 150,
    align: 'center'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
  
];

export default function ImageTable() {
  const dispatch = useDispatch();

  const currentProductId = useSelector((state)=> state.product.currentProductId)

  const images = useSelector((state)=> state.product.images)


  const [openDelete, setOpenDelete] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(Actions.loadProductImages(currentProductId))
  
  }, [dispatch, currentProductId]);

  const mappingImage = (images) => {
    let newImgs = [...images]
    let imgsTable = newImgs.map((image, index)=> {
      return {
        no: index+1,
        id: image.id,        
        smallImage: image.smallImage,
        largeImage: image.largeImage,
        action: image.id,
    }
    })
    return imgsTable;
  }
  const rows = mappingImage(images)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditImage = (event, id) => {
    dispatch(Actions.setImageButtonStatus('edit'))
    dispatch(Actions.setImageId(id))
    dispatch(Actions.loadImage(id))
  }

  const handleDeleteImage = (value, id) => {
    dispatch(Actions.setDeleteType('product-image'))
    dispatch(Actions.setImageId(id))

    handleClose();

  }
  const handleClose = () => {
      setOpenDelete(!openDelete)
  }

  return (
    <Paper sx={{  overflow: 'hidden' }}>
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
                              <Button onClick={(e)=> {handleDeleteImage(e,value)}} color='error'>Ẩn</Button>
                              <Button onClick={(e)=> {handleEditImage(e,value)}} color='success'>Sửa</Button>                              
                          </TableCell>
                        );
                      } if(column.id == 'smallImage' || column.id == 'largeImage') {
                        return (
                          <TableCell align={column.align} key={column.id+index} style={{width:column.maxWidth}}>
                              <img src={value} style={{width:'100%'}}/>                                     
                          </TableCell>
                        );
                      }else {
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

    <ModalProductDelete
        openDelete={openDelete}
        handleCloseDelete={() => { handleClose('delete')}}
    />
    </Paper>
    
  );
}
