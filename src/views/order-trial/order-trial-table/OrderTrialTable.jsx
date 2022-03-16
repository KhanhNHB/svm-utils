import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/order-trial.action'

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
}
];
export default function OrderTable() {
  const dispatch = useDispatch();

  const orderTrials = useSelector((state)=> state.orderTrial.orderTrials)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
        dispatch(Actions.loadOrderTrials())
  }, [dispatch]);

  const mappingOrderTrials = (orderTrials) => {
    let newOrderTrials = [...orderTrials]
    let orderTrialNew = newOrderTrials.map((order, index)=> {
      return {
            no: index+1,
            name: order.name,
            phone: order.phone,
            manufacturerCar: order.manufacturerCar,
            productName: order.productName
    }
    })
    return orderTrialNew;
  }

  const rows = mappingOrderTrials(orderTrials)

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