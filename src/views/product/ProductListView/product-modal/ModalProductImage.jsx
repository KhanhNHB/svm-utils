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

const ModalProductImage = ({ openImage, handleCloseImage }) => {
    const dispatch = useDispatch();
    const currentProductId = useSelector((state)=> state.product.currentProductId)
    const currentImageId = useSelector((state)=> state.product.currentImageId)
    const image = useSelector((state)=> state.product.image)

    const imageButtonStatus = useSelector((state)=> state.product.imageButtonStatus)

    const [smallImageUrl, setSmalImagelUrl] = useState(image.smallImage);
    const [largeImageUrl, setLargeImageUrl] = useState(image.largeImage);

    const [smallErr, setSmallErr] = useState('');
    const [largeErr, setLargeErr] = useState('');

    const [labelAddButton, setLabelAddButton] = useState('Thêm ảnh hiển thị');

    useEffect(() => {
     
        const setImage = () => {
            if(image.productId == currentProductId) {
              
                setSmalImagelUrl(image.smallImage)
                setLargeImageUrl(image.largeImage)
                
            } else {              
                setSmalImagelUrl('')
                setLargeImageUrl('')            
            }
           
        }
        setImage()
    }, [image]);

    useEffect(() => {
        setSmalImagelUrl('')
        setLargeImageUrl('')    
    }, [currentProductId]);

    useEffect(() => {
        if(imageButtonStatus == 'edit') {
            setLabelAddButton('Cập nhật')
        } else {
            setLabelAddButton('Thêm ảnh hiển thị')
        }
        
    }, [imageButtonStatus]);

    const handleSmallImage = (event) => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('file', image);

        axios.post(UPLOAD_FILE, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data;boundary=---',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(res => {
            setSmalImagelUrl(res.data.url)
            setSmallErr('')
        })
        .catch(err => {
            setSmalImagelUrl('')
            setSmallErr('Tải hình ảnh thất bại, mời thử lại!')
        });
        

    }

    const handleLargeImage = (event) => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('file', image);

        axios.post(UPLOAD_FILE, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data;boundary=---',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(res => {
            setLargeImageUrl(res.data.url)
            setLargeErr('')
        })
        .catch(err => {
            setLargeImageUrl('')
            setLargeErr('Tải hình ảnh thất bại, mời thử lại!')
        });
    }
    const reset = () => {
        dispatch(Actions.setImageButtonStatus('add'));
        dispatch(Actions.setImage({}));
        dispatch(Actions.setImageId(0))
    }
    const addImage = (event) => {
        event.preventDefault();
        const image = {
            id: currentImageId,
            productId: currentProductId,
            smallImage: smallImageUrl,
            largeImage: largeImageUrl
        }
        dispatch(Actions.updateImage(image))
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
                        <Grid container item xs={12} sm={12} md={5}>
                            <Grid item xs={12} sm={12} md={12} mt={1} p={2}> 
                                <Button 
                                    className='button-detail-image' 
                                    background='info' 
                                    variant='contained'
                                    onClick={addImage}
                                    
                                >{labelAddButton}</Button>
                                <Button 
                                    className='button-reset-image' 
                                    background='primary' 
                                    variant='contained'
                                    onClick={reset}
                                
                                >Đặt lại</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} mt={1} p={2}>
                                    <input
                                        accept="image/*"
                                        className='ip'
                                        style={{ display: 'none' }}
                                        id="raised-button-file-large-image"
                                        onChange={(e)=> handleLargeImage(e)}
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="raised-button-file-large-image" >
                                        <Button variant="raised" component="span" className='button-choose-image'>
                                            Chọn hình lớn
                                        </Button>
                                    </label> 
                                    <img src={largeImageUrl} style={{display:'block',maxWidth:'150px', height:'150px'}} id="lgImage"/>
                                    <p color='error'>{largeErr}</p>
                                </Grid>
                            <Grid item xs={12} sm={12} md={6} mt={1} p={2}>
                                <input
                                    accept="image/*"
                                    className='ip'
                                    style={{ display: 'none' }}
                                    id="raised-button-file-small-image"
                                    onChange={(e)=> handleSmallImage(e)}
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file-small-image" >
                                    <Button variant="raised" component="span" className='button-choose-image'>
                                        Chọn hình nhỏ
                                    </Button>
                                </label> 
                                <img src={smallImageUrl} style={{display:'block',maxWidth:'150px', height:'150px'}} id="smImage"/>
                                <p color='error'>{smallErr}</p>
                            </Grid>
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