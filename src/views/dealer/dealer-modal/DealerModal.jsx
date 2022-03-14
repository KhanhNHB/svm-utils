import {Box, Grid, Modal, Button, FormControl, InputLabel, OutlinedInput, NativeSelect, Select, MenuItem } from '@mui/material';
import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import * as Actions from '../redux/dealer.action'

import { UPLOAD_FILE } from '../../../api/endpoint';
import '../css/dealer.css';
import location from './location.json'

const DealerModal = ({ openDealer, handleCloseDealer }) => {

    const dispatch = useDispatch();
    const currentDealerId = useSelector((state)=> state.dealer.currentDealerId )
    const dealer = useSelector((state)=> state.dealer.dealer )
    const dealerModalStatus = useSelector((state)=> state.dealer.dealerModalStatus)




    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [ranks, setRanks] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const [thumbnail, setThumbnail] = useState(image);
    const [thumbnailErr, setThumbnailErr] = useState('');

    const [dist, setDist] = useState([]);// get from list cites of json file

    useEffect(() => {
        const setDealer = () => {
            setName(dealer.name)
            setAddress(dealer.address)
            setPhone(dealer.phone)
            setImage(dealer.image)
            setThumbnail(dealer.image)
            setRanks(dealer.ranks)
            const c = getCityCode(dealer.city)
            setCity(c)
            setDistrictByCity(c)
            setDistrict(getDistCode(dealer.district))

            setLat(dealer.lat)
            setLng(dealer.lng)
        }
        setDealer()
    }, [dealer]);

     useEffect(() => {
            if(dealerModalStatus == 'add'){
                console.log('status: add')
                setName('')
                setAddress('')
                setPhone('')
                setImage('')
                setThumbnail('')
                setRanks('')
                setDistrict('')
                setCity('')
                setLat('')
                setLng('')
            }
    }, [dealerModalStatus]);

    const handleValue = (event, typeValue) => {
        switch (typeValue) {
            case 'name':
                setName(event.target.value);
                break;
            case 'phone':
                setPhone(event.target.value);
                break;
            case 'address':
                setAddress(event.target.value);
                break;
           case 'rank':
                setRanks(event.target.value);
                break;
            case 'city':
                setCity(event.target.value);
                setDistrictByCity(event.target.value)
                break;
            case 'district':
                setDistrict(event.target.value);
                break;
            case 'lat':
                setLat(event.target.value);
                break;
            case 'lng':
                setLng(event.target.value);
                break;
            default:
              break;
          }
    };

    const saveDealer = () => {
        const cityFromCode = getCity(city);
        const distFromCode = getDist(district);
        console.log('cityFromCode ', cityFromCode)
        console.log('distFromCode ', distFromCode)
        const deal = {id: currentDealerId, name, phone, ranks, address, city:cityFromCode , district: distFromCode, lat, lng, image: thumbnail }
        dispatch(Actions.updateDealer(deal))
        handleCloseDealer();

    }
    const handleDeailterThumbnail= (event) => {
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
                setThumbnail(res.data.url)
                setThumbnailErr('')
            })
            .catch(err => {
                setThumbnail('')
                setThumbnailErr('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại! ')
            });
        }

    const getCity = (code) => {
        const cities = [...location]
        const city = cities.filter(c => c.code == code)
        return city[0].name;
    }
    const getDist = (code) => {
        const distTemp = [...dist]
        const dis = distTemp.filter(d => d.code == code)
        return dis[0].name;
    }
    const getCityCode = (name) => {
        if(name == undefined) {
            return 1;
        } else {
            const cities = [...location]
            const city = cities.filter(c => c.name == name)
            return city[0].code;
        }

    }
    const getDistCode = (name) => {
         if(name == undefined) {
            return 1;
        } else {
            const distTemp = [...dist]
            const dis = distTemp.filter(d => d.name == name)
            return dis[0].code;
        }
    }

    const setDistrictByCity = (code) => {
        const cities = [...location]
        const city = cities.filter(c => c.code == code)
        console.log('code', code)
        console.log('city - dis: ', city.districts)
        setDist(city[0].districts)
    }
    return (
        <Box >
            <Modal
                open={openDealer}
                onClose={handleCloseDealer}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-area'
            >
                <Grid container item xs={12} sm={10} md={6} className='modal-content'>
                    <h1 className="modal-modal-title">Hệ thống đại lý</h1>
                  
                        <Grid  container spacing={2} mt={3}>
                            <Grid  item container xs={12} sm={12} >
                                <Grid  item container xs={12} spacing={5} className='flex-reverse' > 

                                    <Grid item container xs={12} sm={12} md={12} spacing={2}>
                                        <Grid  item container xs={12} sm={6} md={6}>
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel>Tên hệ thống đại lý</InputLabel>
                                                <OutlinedInput
                                                    value={name}
                                                    onChange={e => handleValue(e,'name')}
                                                    label="Tên hệ thống đại lý"
                                                />
                                            </FormControl>
                                        </Grid> 
                                        <Grid  item container xs={12} sm={12} md={6} >
                                            <FormControl size='medium' sx={{ width: '100%' }}>
                                                <InputLabel >Số điện thoại liên hệ</InputLabel>
                                                <OutlinedInput
                                                    value={phone}
                                                    onChange={e => handleValue(e,'phone')}
                                                    label="Số điện thoại liên hệ"
                                                />
                                            </FormControl>
                                        </Grid> 
                                    </Grid> 
 
                                </Grid>
                                    
                            </Grid>
                           <Grid item xs={12} sm={6} className="input-container">
                                    <FormControl fullWidth>
                                          <InputLabel id="demo-simple-select-label">Hạng đại lý</InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ranks}
                                            label="Age"
                                            onChange={e => handleValue(e,'rank')}
                                          >

                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>

                                          </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel>Địa chỉ </InputLabel>
                                    <OutlinedInput
                                        value={address}
                                        onChange={e => handleValue(e,'address')}
                                        label="Địa chỉ "
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} className="input-container">
                                    <FormControl fullWidth  id="city-control">
                                      <InputLabel id="city-select-label">Tỉnh/Tp</InputLabel>
                                      <Select
                                        labelId="city-select-label"
                                        id="city-select"
                                        value={city}
                                        label="Tỉnh/Tp"
                                        onChange={e => handleValue(e,'city')}
                                      >
                                          {
                                            location.map(loc => {
                                                return (
                                                 <MenuItem value={loc.code} key={loc.code}>{loc.name}</MenuItem>
                                                )
                                            })
                                          }
                                      </Select>
                                    </FormControl>
  
                            </Grid>
                            <Grid item xs={12} sm={6} className="input-container">
                                    <FormControl fullWidth>
                                      <InputLabel id="district-select-label">Quận/huyện</InputLabel>
                                      <Select
                                        labelId="district-select-label"
                                        id="district-select"
                                        value={district}
                                        label="Quận/huyện"
                                        onChange={e => handleValue(e,'district')}
                                      >
                                        {
                                            dist !=undefined  &&  dist.map(dis => {
                                                return (
                                                 <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                                )
                                            })
                                          }
                                      </Select>
                                    </FormControl>

                            </Grid>

                            <Grid item xs={12} sm={6} className="input-container">

                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel>Tọa độ lat</InputLabel>
                                    <OutlinedInput
                                        value={lat}
                                        onChange={e => handleValue(e,'lat')}
                                        label="lat"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} className="input-container">
                                <FormControl size='medium' sx={{ width: '100%' }}>
                                    <InputLabel>Tọa độ lng</InputLabel>
                                    <OutlinedInput
                                        value={lng}
                                        onChange={e => handleValue(e,'lng')}
                                        label="lng"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid container item xs={12} sm={6} className="input-container">
                                <Grid item xs={12} sm={6} className="input-container">
                                    <input
                                        accept="image/*"
                                        className='ip'
                                        style={{ display: 'none' }}
                                        id="raised-button-file-dealer"
                                        onChange={(e)=> handleDeailterThumbnail(e)}
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="raised-button-file-dealer" >
                                        <Button variant="raised" component="span" className='button-choose-image'>
                                            Chọn thumbnail
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={6} className="border-container">
                                    <img src={thumbnail} style={{display:'block',maxWidth:'300px', height:'120px'}} id="thumbnailDealer"/>
                                     <p style={{color: 'red'}}>{thumbnailErr}</p>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sm={12} md={12} mt={3}className='grid-inner-center'>
                                <Button
                                    className='button-dealer'
                                    background='info'
                                    variant='contained'
                                    onClick={saveDealer}

                                 >Lưu</Button>
                            </Grid>
                        </Grid>               
                </Grid>
            </Modal>
        </Box>
    )
}

export default DealerModal;