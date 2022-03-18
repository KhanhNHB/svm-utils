import {Box, Grid, Modal, Button, FormControl, InputLabel, OutlinedInput, FormHelperText} from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextEditorProduct from '../product-input/TextEditorProduct';
import * as Actions from '../redux/product.action'
import '../css/product.css';



const ModalProductDetail = ({ openDetail, handleCloseDetail }) => {

    const dispatch = useDispatch();
    const currentId = useSelector((state)=> state.product.currentProductId )
    const product = useSelector((state)=> state.product.product )

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [info1, setInfo1] = useState(product.info1);
    const [info2, setInfo2] = useState(product.info2);
    const [description, setDescription] = useState(product.description);
    const [gift, setGift] = useState(product.gift);
    const [videoUrl, setVideoUrl] = useState(product.videoUrl);

    useEffect(() => {
        const setProduct = () => {
            setName(product.name)
            setPrice(product.price)
            setInfo1(product.info1)
            setInfo2(product.info2)
            setDescription(product.description)
            setGift(product.gift)
            setVideoUrl(product.videoUrl)
        }
        setProduct()
    }, [product]);
    
    const handleValue = (event, typeValue) => {
        switch (typeValue) {
            case 'name':
                setName(event.target.value);
              break;
            case 'price':
                setPrice(event.target.value);
            case 'videoUrl':
                setVideoUrl(event.target.value);
              break;
            default:
              break;
          }
    };

    const saveDetail = () => {
        const productUpdate = {
            id: currentId, name, price, info1, info2, description, gift, videoUrl
        }
        dispatch(Actions.updateProduct(productUpdate))
        handleCloseDetail();
    }

    return (
        <Box >
            <Modal
                open={openDetail}
                onClose={handleCloseDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-area'
            >
                <Grid container item xs={12} sm={10} md={6} className='modal-content'>
                    <h1 className="modal-modal-title">Chi tiết sản phẩm</h1>
                  
                        <Grid  container spacing={2} mt={3}>
                            <Grid  item container xs={12} sm={12} >
                                <Grid  item container xs={12} spacing={5} className='flex-reverse' > 
                                    <Grid  item xs={12} sm={12} md={3}>
                                        <Button 
                                            className='button-detail' 
                                            background='info'
                                            variant='contained'
                                            onClick={saveDetail}
                                         
                                         >Lưu</Button>
                                    </Grid>
                                    <Grid item container xs={12} sm={12} md={9} spacing={5}>
                                        <Grid  item container xs={12} sm={6} md={6}>
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel>Tên sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    value={name}
                                                    onChange={e => handleValue(e,'name')}
                                                    label="Tên sản phẩm"
                                                />
                                            </FormControl>
                                        </Grid> 
                                        <Grid  item container xs={12} sm={12} md={6} >
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel >Giá sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    value={price}
                                                    onChange={e => handleValue(e,'price')}
                                                    label="Giá sản phẩm"
                                                />
                                            </FormControl>
                                        </Grid> 
                                    </Grid> 
 
                                </Grid>
                                    
                            </Grid>                        
                            <Grid item xs={12} sm={6} className="input-container">
                                <TextEditorProduct
                                    title='Cấu hình 1'
                                    content={product.info1}
                                    setContent={setInfo1}                         
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                            <TextEditorProduct
                                    title='Cấu hình 2'
                                    content={product.info2}
                                    setContent={setInfo2}                                   
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                <TextEditorProduct
                                 title='Thông tin sản phẩm'
                                    content={product.description}
                                    setContent={setDescription}                                     
                                />
                                
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                <TextEditorProduct
                                    title='Quà tặng'
                                    content={product.gift}
                                    setContent={setGift}                                 
                                />
                            
                            </Grid>

                            <Grid item xs={12} sm={12} className="input-container">
                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel>Id Video Youtube</InputLabel>
                                    <OutlinedInput
                                        value={videoUrl}
                                        onChange={e => handleValue(e,'videoUrl')}
                                        label="Id Video Youtube"
                                    />
                                </FormControl>
                            
                            </Grid>
                        </Grid>               
                </Grid>
            </Modal>
        </Box>
    )
}

export default ModalProductDetail;