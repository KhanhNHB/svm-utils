import {Box, 
    Grid, 
    Modal, 
    Input, 
    FormControl, 
    InputLabel, 
    OutlinedInput,
    Checkbox} from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ImageTable from './../product-table/ImageTable';
import * as Actions from '../redux/product.action'

import '../css/product.css';


const ModalProductImage = ({ openImage, handleCloseImage }) => {
    const dispatch = useDispatch();
    const currentId = useSelector((state)=> state.product.currentProductId)

    
    const [smallImage, setSmallImage] = useState('');
    const [largeImage, setLargeImage] = useState('');

    const addFeature = (event) => {
        event.preventDefault();
        // console.log(feature);
        // console.log(icon);
        // console.log(content);
        // console.log(smallImage);
        // console.log(largeImage);

        
    }

   

    return (
        <Box >
            <Modal
                open={openImage}
                onClose={handleCloseImage}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='modal-area'
            >
                <Grid container item xs={12} sm={10} md={10} className='modal-content'>
                    <h1 className='modal-modal-title'>Thêm hình của sản phẩm</h1>
                    <Grid container item xs={12} sm={12} md={12} mt={5} className='modal-modal-table'>
                        {/* left-box to choose file from devide */}
                        <Grid item xs={12} sm={12} md={5}>
                            <Input type='file'>Chọn Hình lớn</Input>
                            <Input type='file'>Chọn Hình lớn</Input>
                        </Grid>
                        {/* right-box to show image has uploaded */}      
                        <Grid item xs={12} sm={12} md={6} ml={5}>
                            <ImageTable></ImageTable>
                        </Grid>
                    </Grid>
                                          
                </Grid>
            </Modal>
        </Box>
    )
}

export default ModalProductImage;