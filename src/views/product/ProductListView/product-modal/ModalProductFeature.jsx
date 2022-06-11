import {Box, 
    Grid, 
    Modal, 
    Button, 
    FormControl, 
    InputLabel, 
    OutlinedInput,
    TextField } from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FeatureCheckbox from '../product-input/FeatureCheckbox';
import PositionRadioButton from '../product-input/PositionRadioButton';
import FeatureTable from './../product-table/FeatureTable';
import { UPLOAD_FILE } from './../../../../api/endpoint';
import API from '../../../../api/API';
import '../css/product.css';
import axios from 'axios'
import * as Actions from '../redux/product.action'
import {host_url} from '../../../../common'

const ModalProductFeature = ({ openFeature, handleCloseFeature }) => {

    const dispatch = useDispatch();
    const currentProductId = useSelector((state)=> state.product.currentProductId)
    const currentFeatureId = useSelector((state)=> state.product.currentFeatureId)
    const featureCheckbox = useSelector((state)=> state.product.featureCheckbox)
    const featureRadio = useSelector((state)=> state.product.featureRadio)
    const featureButtonStatus = useSelector((state)=> state.product.featureButtonStatus)

    const feature = useSelector((state)=> state.product.feature)

    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [content, setContent] = useState('');
    const [smallImage, setSmallImage] = useState('');
    const [largeImage, setLargeImage] = useState('');
    const [right, setRight] = useState(featureRadio)

    const [smallUrl, setSmallUrl] = useState('');
    const [largeUrl, setLargeUrl] = useState('');

    const [smallErr, setSmallErr] = useState('');
    const [largeErr, setLargeErr] = useState('');

    const [labelAddButton, setLabelAddButton] = useState('Thêm tính năng');

    useEffect(() => {
      
        const setFeature = () => {
            if(feature.productId == currentProductId) {
                const checked = checkedByFeature(feature)
                setTitle(feature.featureTitle)
                setIcon(feature.featureIcon)
                setContent(feature.featureContent)
                setSmallImage(feature.smallImage)
                setLargeImage(feature.largeImage)
                setSmallUrl(feature.smallImage)
                setLargeUrl(feature.largeImage)
                dispatch(Actions.setFeatureRight(feature.right))
                dispatch(Actions.setFeatureChecked(checked))  
            } else {
                setSmallErr('');
                setSmallUrl('')
                setLargeErr('');
                setLargeUrl('');
                setTitle('')
                setIcon('')
                setContent('')
                setSmallImage('')
                setLargeImage('')
                setRight(false)
            }
           
        }
        setFeature()
    }, [feature]);

    useEffect(() => {
        setSmallErr('');
        setSmallUrl('')
        setLargeErr('');
        setLargeUrl('');
        setTitle('')
        setIcon('')
        setContent('')
        setSmallImage('')
        setLargeImage('')
        setRight(false)
    }, [openFeature]);

    useEffect(() => {
        setRight(featureRadio)
        
    }, [featureRadio]);
    
    useEffect(() => {
        if(featureButtonStatus =='edit') {
            setLabelAddButton('Cập nhật')
        } else {
            setLabelAddButton('Thêm tính năng')
        }
        
    }, [featureButtonStatus]);

    const addFeature = (event) => {
        event.preventDefault();
    
        const feat = {
            id: currentFeatureId,
            productId: currentProductId,
            featureIcon: icon,
            featureTitle: title,
            featureContent: content,
            smallImage: smallUrl,
            largeImage: largeUrl,
            full: getFull(featureCheckbox),
            small: getSmall(featureCheckbox),
            right : parseRight(right)
        }
            console.log("feat", feat);
            
          dispatch(Actions.updateFeature(feat))

    }

    const getSmall = (checked) => {
        console.log('getSmall checked: ',checked);
        
        const isFull = checked[0];
        const isFullButSmall = checked[1];
        if(isFull && isFullButSmall) {
            return true;
        } else {
            return false;
        }
    }

    const getFull = (checked) => {
        console.log('getFull checked: ',checked);

        const isNotFull = checked[2];
        if(isNotFull) {
           return false
        } else {
            return true;
        }
    }

    const parseRight = (right) => {
        let stringValue = "true"; 
        let boolValue = (right == stringValue); //returns true
        return boolValue;
    }

    const handleValue = (event, typeValue) => {
        switch (typeValue) {
            case 'title':
                setTitle(event.target.value);
                break;
            case 'icon':
                setIcon(event.target.value);
            break;
            case 'content':
                setContent(event.target.value);
            break;
            default:
                break;
        }
    }

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
            setSmallUrl(res.data.url)
            setSmallErr('')
        })
        .catch(err => {
            setSmallUrl('')
            setSmallErr('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 25MB, mời thử lại! ')
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
            setLargeUrl(res.data.url)
            setLargeErr('')
        })
        .catch(err => {
            setLargeUrl('')
            setLargeErr('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 25MB, mời thử lại! ')
        });
    }

    const checkedByFeature = (feature) => {
        if(feature.full && feature.small){
            return [true, true, false];
        } else if (feature.full && !feature.small) {
            return [true, false, false];
        } else {
            return [false, false, true];
        }
    }


    const reset = () => {
        dispatch(Actions.setFeatureButtonStatus('add'));
        dispatch(Actions.setFeature({}));
        dispatch(Actions.setFeatureId(0));
        setSmallErr('');
        setSmallUrl('')
        setLargeErr('');
        setLargeUrl('');
        setTitle('')
        setIcon('')
        setContent('')
        setSmallImage('')
        setLargeImage('')
        setRight(false)
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
                    <Grid container item xs={12} sm={12} md={12} mt={2} className='modal-modal-table'>
                        <Grid container item xs={12} sm={12} md={12} mt={2} className='modal-modal-table'>
                            <Grid  item xs={12} sm={12} md={12} mt={1}>
                                <Button 
                                    className='button-detail' 
                                    background='info' 
                                    variant='contained'
                                    onClick={addFeature}
                                
                                >{labelAddButton}</Button>
                                <Button 
                                    className='button-reset' 
                                    background='primary' 
                                    variant='contained'
                                    onClick={reset}
                                
                                >Đặt lại</Button>
                            </Grid>
                             {/* title */}      
                            <Grid  item xs={12} sm={6} md={3} mt={1}>
                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel >Tên tính năng</InputLabel>
                                    <OutlinedInput
                                        value={title}
                                        onChange={(e)=> {handleValue(e,'title')}}
                                        label="Tên tính năng"
                                    />
                                
                                </FormControl>
                            </Grid>
                             {/* size full */}
                             {/* size small or not */} 

                            <Grid  item xs={12} sm={6} md={4} mt={1} ml={5}>
                                <FeatureCheckbox></FeatureCheckbox>
                            </Grid>
                             {/* right/left */}
                            <Grid  item xs={12} sm={6} md={4} mt={1}>
                                <PositionRadioButton></PositionRadioButton>
                            </Grid>
                            {/* icon */}
                            <Grid item xs={12} sm={12} md={3} mt={5}>
                                <FormControl size='medium' sx={{ width: '100%', padding:'0px 10px' }}>
                                    <TextField 
                                        label="Sgv Icon"
                                        multiline
                                        rows={6}
                                        value={icon}
                                        onChange={(e)=> {handleValue(e,'icon')}}
                                    />                                
                                </FormControl>
                              
                            </Grid>
                            {/* text */}  
                            <Grid item xs={12} sm={12} md={3} mt={5}>
                                <FormControl size='medium' sx={{ width: '100%' , padding:'0px 10px'}}>
                                    <TextField 
                                        label="Nội dung"
                                        multiline
                                        rows={6}
                                        value={content}
                                        onChange={(e)=> {handleValue(e,'content')}}

                                    />                                
                                </FormControl>
                            </Grid>
                             {/* small image */}                            
                            <Grid item xs={12} sm={12} md={3} mt={2} p={2}>
                                <input
                                    accept="image/*"
                                    className='ip'
                                    style={{ display: 'none' }}
                                    id="raised-button-file-small"
                                    onChange={(e)=> handleSmallImage(e)}
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file-small" >
                                    <Button variant="raised" component="span" className='button-choose-image'>
                                        Chọn hình slide
                                    </Button>
                                </label> 
                                <img src={smallUrl != '' ? host_url+smallUrl : '/image-default.png'} style={{display:'block',maxWidth:'150px', height:'150px', padding:'10px'}}/>
                                <p style={{color: 'red'}}>{smallErr}</p>
                            </Grid>
                            {/* large image */}
                            <Grid item xs={12} sm={12} md={3} mt={2} p={2}>
                                {/* <p>Hình lớn</p>
                                <input type='file'></input>
                                <img src=""/> */}
                                <input
                                    accept="image/*"
                                    className='ip'
                                    style={{ display: 'none' }}
                                    id="raised-button-file-large"
                                    onChange={(e)=> handleLargeImage(e)}
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file-large">
                                    <Button variant="raised" component="span" className='button-choose-image'>
                                        Chọn hình nền
                                    </Button>
                                </label> 
                                <img src={largeUrl != '' ? host_url+largeUrl : '/image-default.png'} style={{display:'block',maxWidth:'300px', height:'150px', padding:'10px'}}/>
                                <p style={{color: 'red'}}>{largeErr}</p>
                            </Grid>
                       
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} mt={5}>
                            <FeatureTable></FeatureTable>
                        </Grid>     
                    </Grid>
                                      
                </Grid>
            </Modal>
        </Box>
    )
}

export default ModalProductFeature;