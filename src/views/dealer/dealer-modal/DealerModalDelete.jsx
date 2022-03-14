import {Box,
    Grid,
    Modal,
    Button,
    Input,
    FormControl,
    InputLabel,
    OutlinedInput,
    Checkbox} from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_FILE } from '../../../api/endpoint';
import '../css/dealer.css';
import axios from 'axios'
import * as Actions from '../redux/dealer.action'

const DealerModalDelete = ({ openDelete, handleCloseDelete }) => {
    const dispatch = useDispatch();

    const currentDealerId = useSelector((state)=> state.dealer.currentDealerId)


    const handleCancel = () => {
        handleCloseDelete()
    }

    const handleDelete = () => {
         dispatch(Actions.deleteDealer(currentDealerId));

    }


    return (
        <Box >
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='modal-area-delete'
            >
                <Grid container item xs={12} sm={10} md={10} className='modal-content'>
                    <h1 className='modal-modal-title'>Xóa đại lý</h1>
                    <Grid container item xs={12} sm={12} md={12} mt={5} className='modal-modal-table'>
                        <Grid container item xs={12} sm={12} md={12} >
                            <h2 className='modal-modal-title'>Bạn có chắc chắn xóa Hệ thống đại lý này ra khỏi hệ thống?</h2>
                        </Grid>
                        <Grid  item xs={12} sm={12} md={12} mt={5} className='modal-modal-title'>
                            <Button
                                className='button-cancel'
                                variant='contained'
                                onClick={()=> handleCancel()}>
                                    Hủy
                            </Button>
                            <Button
                                className='button-delete'
                                variant='contained'
                                onClick={()=> handleDelete()}>
                                    Xóa
                            </Button>
                        </Grid>


                    </Grid>

                </Grid>
            </Modal>
        </Box>
    )
}

export default DealerModalDelete;