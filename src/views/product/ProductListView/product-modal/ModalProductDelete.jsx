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
import ImageTable from './../product-table/ImageTable';
import { UPLOAD_FILE } from './../../../../api/endpoint';
import '../css/product.css';
import axios from 'axios'
import * as Actions from '../redux/product.action'

const ModalProductDelete = ({ openDelete, handleCloseDelete }) => {
    const dispatch = useDispatch();
    
    const currentProductId = useSelector((state)=> state.product.currentProductId)
    const currentImageId = useSelector((state)=> state.product.currentImageId)
    const currentFeatureId = useSelector((state)=> state.product.currentFeatureId)
    const deleteType = useSelector((state)=> state.product.deleteType)
    const deleteStatus = useSelector((state)=> state.product.deleteStatus)

    const handleCancel = () => {
        handleCloseDelete()
    }

    const handleDelete = () => {
        switch (deleteType) {
            case 'product':
                 dispatch(Actions.deleteProduct(currentProductId));
                 if(deleteStatus) {
                    handleCloseDelete();
                } else {
                    handleCloseDelete();
                 }
                 
                break;
            case 'product-feature':
                dispatch(Actions.deleteProductFeature(currentFeatureId, currentProductId));
                if(deleteStatus) {
                    handleCloseDelete();
                } else {
                    handleCloseDelete();
                 }
                break;
            case 'product-image':
                dispatch(Actions.deleteProductImage(currentImageId, currentProductId));
                if(deleteStatus) {
                    handleCloseDelete();
                 } else {
                    handleCloseDelete();
                 }
                break;
            default:
                handleCloseDelete()
                break;
        }
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
                    <h1 className='modal-modal-title'>Xóa sản phẩm</h1>
                    <Grid container item xs={12} sm={12} md={12} mt={5} className='modal-modal-table'>
                        <Grid container item xs={12} sm={12} md={12} >
                            <h2 className='modal-modal-title'>Bạn có chắc chắn xóa sản phẩm này?</h2>
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

export default ModalProductDelete;