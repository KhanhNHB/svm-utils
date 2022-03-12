import {Box, 
    Grid, 
    Modal, 
    Button, 
    FormControl, 
    InputLabel, 
    OutlinedInput,
    Checkbox} from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ImageEditorProduct from '../product-input/ImageEditorProduct';
import TextEditorProduct from '../product-input/TextEditorProduct';
import FeatureCheckbox from '../product-input/FeatureCheckbox';
import PositionRadioButton from '../product-input/PositionRadioButton';
import FeatureTable from './../product-table/FeatureTable';
import * as Actions from '../redux/product.action'

import '../css/product.css';



const ModalProductFeature = ({ openFeature, handleCloseFeature }) => {

    const dispatch = useDispatch();
    const currentId = useSelector((state)=> state.product.currentProductId)

    const [feature, setFeature] = useState('');
    const [icon, setIcon] = useState('');
    const [content, setContent] = useState('');
    const [smallImage, setSmallImage] = useState('');
    const [largeImage, setLargeImage] = useState('');

    const addFeature = (event) => {
        event.preventDefault();
        console.log(feature);
        console.log(icon);
        console.log(content);
        console.log(smallImage);
        console.log(largeImage);

        
    }

    const handleFeature = (event) => {
        setFeature(event.target.value);
    }


    return (
        <Box >
            <Modal
                open={openFeature}
                onClose={handleCloseFeature}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='modal-area'
            >
                <Grid container item xs={12} sm={10} md={10} className='modal-content'>
                    <h1 className='modal-modal-title'>Thêm tính năng sản phẩm</h1>
                    <Grid container item xs={12} sm={12} md={12} mt={5} className='modal-modal-table'>
                        <Grid item xs={12} sm={12} md={6} mt={5} className='modal-modal-table'>
                            {/* icon */}
                            <Grid  item xs={12} sm={12} md={12} mt={1}>
                                <Button 
                                    className='button-detail' 
                                    background='info' 
                                    variant='contained'
                                    onClick={addFeature}
                                
                                >Thêm tính năng</Button>
                            </Grid>
                            <Grid  item xs={12} sm={6} md={6} mt={1}>
                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel >Tên tính năng</InputLabel>
                                    <OutlinedInput
                                        value={feature}
                                        onChange={handleFeature}
                                        label="Tên tính năng"
                                    />
                                
                                </FormControl>
                            </Grid>
                        
                            <Grid  item xs={12} sm={6} md={6} mt={1}>
                                <FeatureCheckbox></FeatureCheckbox>
                            </Grid>
                            <Grid  item xs={12} sm={6} md={6} mt={1}>
                                <PositionRadioButton></PositionRadioButton>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mt={2}>
                                <ImageEditorProduct
                                    title='Icon'
                                    content={icon}
                                    setContent={setIcon}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mt={2}>
                                <TextEditorProduct
                                    title='Nội dung'
                                    content={content}
                                    setContent={setContent}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mt={5}>
                                <ImageEditorProduct
                                    title='Hình lớn'
                                    content={largeImage}
                                    setContent={setLargeImage}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mt={5}>
                                <ImageEditorProduct
                                    title='Hình nhỏ'
                                    content={smallImage}
                                    setContent={setSmallImage}
                                />
                            </Grid>
                            {/* title */}      
                            {/* text */}  
                            {/* small image */}
                            {/* large image */}
                            {/* size full */}
                            {/* size small or not */}
                            {/* right or lef */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} mt={5} ml={5}>
                            <FeatureTable></FeatureTable>
                        </Grid>     
                    </Grid>
                                      
                </Grid>
            </Modal>
        </Box>
    )
}

export default ModalProductFeature;