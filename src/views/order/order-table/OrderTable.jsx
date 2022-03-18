import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/order.action'

const columns = [
{ id: 'no', label: 'No.', minWidth: 50 },
{
    id: 'name',
    label: 'Tên người đặt hàng',
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
  id: 'city',
  label: 'Tỉnh/TP',
  minWidth: 170,
  align: 'center'
},
{
  id: 'district',
  label: 'Quận/Huyện',
  minWidth: 170,
  align: 'center'
},
{
  id: 'ranks',
  label: 'Hạng đại lý',
  minWidth: 170,
  align: 'center'
},
{
  id: 'manufacturerCar',
  label: 'Hãng xe',
  minWidth: 170,
  align: 'center'
},
{
    id: 'productName',
    label: 'Tên sản phẩm',
    minWidth: 170,
    align: 'center'
},
{
    id: 'date',
    label: 'Ngày tạo',
    minWidth: 170,
    align: 'center'
}
];

export default function OrderTable() {
  const dispatch = useDispatch();

  const orders = useSelector((state)=> state.order.orders)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
        dispatch(Actions.loadOrders())
  }, [dispatch]);

  const mappingOrders = (orders) => {
    let newOrders = [...orders]
    let orderNew = newOrders.map((order, index)=> {
      let newDate = new Date(order.createdDate);
      return {
           no: index+1,
           name: order.name,
           phone: order.phone,
           city: order.city,
           district: order.district,
           ranks: order.ranks,
           manufacturerCar: order.manufacturerCar,
           productName: order.productName,
           date: newDate!=undefined ? newDate.toLocaleString() : ''

    }
    })
    return orderNew;
  }

  const rows = mappingOrders(orders)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                            {value}
                          </TableCell>
                        );
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



    </Paper>

  );
}
