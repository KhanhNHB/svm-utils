import React, {useEffect, useRef, useState} from 'react';
import {Container, Box, Grid, Button, TableRow, TableCell} from '@mui/material';
import './mail.css'
import {useSelector} from "react-redux";


const MailResult = () => {
    const successCurrent = useSelector((state) => state.email.success)
    const failedCurrent = useSelector((state) => state.email.failed)
    return (
        <Container>
            <Grid container item xs={12} sm={12} md={12} spacing={5}>
                <Grid item xs={12} sm={12} md={6} p={1}>
                    <h3 className='list-success'>Danh sách thành công</h3>
                    {
                        successCurrent.length > 0 &&
                        successCurrent.map((row, index) => {
                            return (
                                <p className='item-success'> {row}</p>
                            );
                        })
                    }

                </Grid>
                <Grid container item xs={12} sm={12} md={6} p={1}>
                    <h3 className='list-failed'>Danh sách thất bại</h3>
                    {
                        failedCurrent.length > 0 &&
                        failedCurrent.map((row, index) => {
                            return (
                                <p className='item-failed'> {row}</p>
                            );
                        })
                    }
                </Grid>

            </Grid>

        </Container>
    );
}

export default MailResult;