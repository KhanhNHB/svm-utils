import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useState } from 'react';
import ModalProductDetail from '../product-modal/ModalProductDetail';
import ModalProductFeature from '../product-modal/ModalProductFeature';

const columns = [
  { id: 'no', label: 'No.', minWidth: 50 },
  { id: 'id', label: 'Id', minWidth: 50 },
  {
    id: 'name',
    label: 'Name',
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

function createData(no, id, name, action) {
  return { no, id, name, action};
}

const rows = [
  createData(1, 1, 'NextG RT650', 1),
  createData(2, 2, 'NextG RT750', 2),
  createData(2, 2, 'NextG RT750', 2),
  createData(2, 2, 'NextG RT750', 2),
  createData(2, 2, 'NextG RT750', 2)
  
 
];

export default function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDetail, setOpenDetail] = useState(false);
  const [openFeature, setOpenFeature] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (event, id) => {
    console.log('delete: ', id);
    handleClose('delete');
  }
  const handleEdit = (event, id) => {
    console.log('handleEdit: ', id);
    handleClose('detail');
  }
  const handleFeature = (event, id) => {
    console.log('handleFeature: ', id);
    handleClose('feature');
  
  }
  const handleImage = (event, id) => {
    console.log('handleImage: ', id);
    handleClose('image');
  }
  
  const handleClose = (typeModal) => {
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
    <Paper sx={{ width: '80%', height:'100%', overflow: 'hidden' }}>
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
                              <Button onClick={(e)=> {handleDelete(e,value)}} color='error'>Ẩn</Button>
                              <Button onClick={(e)=> {handleEdit(e,value)}} color='success'>Chỉnh sửa chi tiết</Button>
                              <Button onClick={(e)=> {handleFeature(e,value)}} color='info'>Thêm tính năng</Button>
                              <Button onClick={(e)=> {handleImage(e,value)}} color='secondary'>Thêm hình hiển thị</Button>
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
    </Paper>
    
  );
}
