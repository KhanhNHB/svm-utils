import React, {useEffect} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import * as Actions from './redux/mail.action';

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center'
    }
];

export default function MailTable() {
    const dispatch = useDispatch();

    const emails = useSelector((state) => state.email.emails)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        dispatch(Actions.loadEmails())
    }, []);

    const mappingEmails = (emails) => {
        let newEmails = [...emails]
        return newEmails.map((email, index) => {
            return {
                no: index + 1,
                email: email.email
            }
        });
    }

    const rows = mappingEmails(emails)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={Math.random()}
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell align={column.align} key={Math.random()}>
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
                rowsPerPageOptions={[10, 25, 100, { value: -1, label: 'Tất cả' }]}
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
