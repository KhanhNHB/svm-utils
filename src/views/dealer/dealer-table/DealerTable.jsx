import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/dealer.action'
import DealerModal from '../dealer-modal/DealerModal';
import DealerModalDelete from '../dealer-modal/DealerModalDelete';

const columns = [
{ id: 'no', label: 'No.', minWidth: 50 },
{
    id: 'name',
    label: 'Tên đại lý',
    minWidth: 170,
    align: 'center'
},
{
  id: 'phone',
  label: 'Số điện thoại',
  minWidth: 170,
  align: 'center'
},
{
  id: 'ranks',
  label: 'Hạng',
  minWidth: 170,
  align: 'center'
},
{
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 170,
    align: 'center'
},
{
    id: 'city',
    label: 'Tỉnh/TP',
    minWidth: 170,
    align: 'center'
},
{
    id: 'district',
    label: 'Quận/huyện',
    minWidth: 170,
    align: 'center'
},
{
    id: 'image',
    label: 'Thumbnail',
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

export default function DealerTable() {
  const dispatch = useDispatch();
  
  const currentDealerId = useSelector((state)=> state.dealer.currentDealerId)
  const dealer = useSelector((state)=> state.dealer.dealer)
  const dealers = useSelector((state)=> state.dealer.dealers)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDealer, setOpenDealer] = useState(false);
  
  

  useEffect(() => {
        dispatch(Actions.loadDealers())
  }, [dispatch]);

  const mappingDealers = (dealers) => {
    let newDealers = [...dealers]
    let dealerNew = newDealers.map((dealer, index)=> {
      return {
        no: index+1,
        name: dealer.name,
        phone: dealer.phone,
        address: dealer.address,
        ranks: dealer.ranks,
        city: dealer.city,
        district: dealer.district,
        lat: dealer.lat,
        lng: dealer.lng,
        image: dealer.image,
        action: dealer.id
    }
    })
    return dealerNew;
  }
  
  const rows = mappingDealers(dealers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (event, id) => {
       dispatch(Actions.setDealerId(id));
       setOpenDelete(!openDelete);
  }
  
  const handleEdit = (event, id) => {
       dispatch(Actions.setStatusModal('edit'))
       dispatch(Actions.setDealerId(id));
       dispatch(Actions.loadDealer(id));
       setOpenDealer(!openDealer)
    
  }

  const handleClose = (typeModal, id) => {
    switch(typeModal) {
    case 'delete':
        setOpenDelete(!openDelete)
        break;
     case 'dealer':
        setOpenDealer(!openDealer)
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
                              <Button onClick={(e)=> {handleEdit(e, value)}} color='success'>Sửa</Button>

                          </TableCell>
                        );
                      } if(column.id == 'image') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                              <img src={value} style={{maxWidth:'150px'}}/>
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

    
    <DealerModal
        openDealer={openDealer}
        handleCloseDealer={() => { handleClose('dealer')}}
    />

    <DealerModalDelete
            openDelete={openDelete}
            handleCloseDelete={() => { handleClose('delete')}}
        />
    </Paper>
    
  );
}
