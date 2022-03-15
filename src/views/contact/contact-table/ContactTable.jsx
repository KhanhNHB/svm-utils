import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/contact.action'

const columns = [
{ id: 'no', label: 'No.', minWidth: 50 },
{
    id: 'dealer',
    label: 'Loại',
    minWidth: 170,
    align: 'center'
},
{
  id: 'name',
  label: 'Tên',
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
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center'
},
{
    id: 'message',
    label: 'Tin nhắn',
    minWidth: 170,
    align: 'center'
}

];

export default function ContactTable() {
  const dispatch = useDispatch();

  const contacts = useSelector((state)=> state.contact.contacts)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
        dispatch(Actions.loadContacts())
  }, [dispatch]);

  const mappingContacts = (contacts) => {
  console.log(contacts)
    let newContacts = [...contacts]
    let contactNew = newContacts.map((contact, index)=> {
      return {
        no: index+1,
        dealer: contact.dealer,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        message: contact.message
    }
    })
    return contactNew;
  }

  const rows = mappingContacts(contacts)

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

                        if(column.id == 'dealer') {
                        let valueMapping = value ? 'Khách hàng Đại lý' : 'Khách hàng cá nhân'
                          return (
                            <TableCell align={column.align} key={column.id+index}>
                                {valueMapping}
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



    </Paper>

  );
}
