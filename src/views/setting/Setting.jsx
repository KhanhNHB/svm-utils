import React, { useEffect, useState } from 'react';
import { Paper, Box, Grid, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { SETTING_LOAD, SETTING_UPDATE  } from '../../api/endpoint';
import api from '../../api/API'



export default function Setting() {
  const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFaceBook] = useState('');
    const [youtube, setYouTube] = useState('');
    const [setting, setSetting] = useState({});

  useEffect(() => {
    const request = api.get(SETTING_LOAD)
    console.log(request)
         request.then(response => {
             if (response.ok) {
               const fetchData = response.json();
               fetchData.then(data => {
                    const setting = data
                   setAddress(setting.address)
                   setPhone(setting.phone)
                   setEmail(setting.email)
                   setFaceBook(setting.facebook)
                   setYouTube(setting.youtube)
                    setSetting(data)
               })
             }else {
                console.log('Có lỗi hệ thống, mời thử lại!', response)
                alert('Có lỗi hệ thống, Không thể load thông tin!', response)
             }

         });
  }, []);


  const saveSetting = () => {
    const setting = { address, phone, email, facebook, youtube}
     const request = api.post(SETTING_UPDATE, setting)
      request.then(response => {
        if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {
           const setting = data
           setAddress(setting.address)
           setPhone(setting.phone)
           setEmail(setting.email)
           setFaceBook(setting.facebook)
           setYouTube(setting.youtube)
           setSetting(data)
           alert('Cập nhật thông tin thành công!')
        })
      }
      })
  };

  const handleValue = (event, typeValue) => {
        const value = event.target.value
          switch (typeValue) {
              case 'address':
                  setAddress(value)
                  break;
              case 'phone':
                  setPhone(value)
                  break;
              case 'email':
                  setEmail(value)
                  break;
             case 'facebook':
                 setFaceBook(value)
                  break;
              case 'youtube':
                  setYouTube(value)
                  break;
              default:
                break;
            }
      };


  return (
    <Paper sx={{ width: '100%', height:'100%', overflow: 'hidden' }}>
    <Grid item container xs={12} sm={12} md={12} spacing={2} p={5}>

        <Grid item container xs={12} sm={12} md={6} spacing={2} p={5}>
            <h1>Thông tin chung</h1>
            <Grid  item  xs={12} sm={6} md={12}>
                <FormControl size='medium' sx={{ width: '100%' }}>
                    <InputLabel>Địa chỉ</InputLabel>
                    <OutlinedInput
                        value={address}
                        onChange={e => handleValue(e,'address')}
                        label="Địa chỉ"
                    />
                </FormControl>
            </Grid>
            <Grid  item  xs={12} sm={12} md={12} >
                <FormControl size='medium' sx={{ width: '100%' }}>
                    <InputLabel >Số điện thoại</InputLabel>
                    <OutlinedInput
                        value={phone}
                        onChange={e => handleValue(e,'phone')}
                        label="Số điện thoại"
                    />
                </FormControl>
            </Grid>
            <Grid  item  xs={12} sm={12} md={12} >
                <FormControl size='medium' sx={{ width: '100%' }}>
                    <InputLabel >Email</InputLabel>
                    <OutlinedInput
                        value={email}
                        onChange={e => handleValue(e,'email')}
                        label="Email"
                    />
                </FormControl>
            </Grid>
            <Grid  item container xs={12} sm={12} md={12} >
                <FormControl size='medium' sx={{ width: '100%' }}>
                    <InputLabel >Facebook</InputLabel>
                    <OutlinedInput
                        value={facebook}
                        onChange={e => handleValue(e,'facebook')}
                        label="Facebook"
                    />
                </FormControl>
            </Grid>
            <Grid  item container xs={12} sm={12} md={12} >
                <FormControl size='medium' sx={{ width: '100%' }}>
                    <InputLabel >Youtube</InputLabel>
                    <OutlinedInput
                        value={youtube}
                        onChange={e => handleValue(e,'youtube')}
                        label="Youtube"
                    />
                </FormControl>
            </Grid>
             <Grid  item xs={12} sm={12} md={6} >
                <Button
                    className='button-dealer'
                    background='info'
                    variant='contained'
                    onClick={saveSetting}
                 >Cập nhật </Button>
            </Grid>

        </Grid>

        <Grid item  xs={12} sm={12} md={3} spacing={2} p={5} mt={5}>
              <p>Địa chỉ: {setting? setting.address: ''}</p>
              <p>Số điện thoại: {setting? setting.phone: ''}</p>
              <p>Email: {setting? setting.email: ''}</p>
              <p>Facebook: {setting? setting.facebook: ''}</p>
              <p>Youtube: {setting? setting.youtube: ''}</p>
        </Grid>
</Grid>
   </Paper>

  );
}
