import {Box, Grid, Modal, Button, TextField, FormControl, InputLabel, OutlinedInput, FormHelperText} from '@mui/material';
import React, {  useState } from 'react';
import TextEditorProduct from '../product-input/TextEditorProduct';
import '../css/product.css';


const ModalProductDetail = ({ openDetail, handleCloseDetail }) => {

    
    const [name, setName] = useState('');
    const [info1, setInfo1] = useState('');
    const [info2, setInfo2] = useState('');
    const [description, setDescription] = useState('');
    const [gift, setGift] = useState('');

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
                                        <Button className='button-detail' background='info' variant='contained'>Lưu</Button>
                                    </Grid>
                                    <Grid item container xs={12} sm={12} md={9} spacing={5}>
                                        <Grid  item container xs={12} sm={6} md={6}>
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel>Tên sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    value={name}
                                                    onChange={setName}
                                                    label="Tên sản phẩm"
                                                />
                                            </FormControl>
                                        </Grid> 
                                        <Grid  item container xs={12} sm={12} md={6} >
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel >Giá sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    value={name}
                                                    onChange={setName}
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
                                    content={info1}
                                    setContent={setInfo1}                                
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                            <TextEditorProduct
                                    title='Cấu hình 2'
                                    content={info2}
                                    setContent={setInfo2}                                
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                <TextEditorProduct
                                 title='Thông tin sản phẩm'
                                    content={description}
                                    setContent={setDescription}                                
                                />
                                
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                <TextEditorProduct
                                    title='Quà tặng'
                                    content={gift}
                                    setContent={setGift}                                
                                />
                            
                            </Grid>
                        </Grid>               
                </Grid>
            </Modal>
        </Box>
    )
}

export default ModalProductDetail;