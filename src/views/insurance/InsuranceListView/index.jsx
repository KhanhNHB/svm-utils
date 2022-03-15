import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Box,
  Modal,
  CircularProgress
} from '@mui/material';
import InsurancesList from './InsurancesList';
import { INSURANCE_ENDPOINT } from '../../../api/endpoint';
import Cookies from 'js-cookie';
import API from '../../../api/API';
import {
  RESPONSE_STATUS,
  USER_DEVICE_TOKEN,
  USER_TOKEN
} from '../../../common';
import { actGetAllInsurance } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Copyright = () => {
  return (
    <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
      {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
    </p>
  );
}

const Insurance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingModal, setLoadingModal] = useState(false);
  const data = useSelector(state => state.insurance.insurances);

  useEffect(() => {
    setLoadingModal(true);

    const fetchInsurances = async () => {
      const response = await API.get(`${INSURANCE_ENDPOINT}/all?page=0&size=100`);
      if (response.ok) {
        const fetchData = await response.json();
        const data = { content: fetchData.content, totalPages: fetchData.totalPages };
        dispatch(actGetAllInsurance(data));
      } else {
        if (response.status === RESPONSE_STATUS.FORBIDDEN) {
          Cookies.remove(USER_TOKEN);
          Cookies.remove(USER_DEVICE_TOKEN);
          navigate('/', { replace: true });
        }
      }
    }

    fetchInsurances();

    setLoadingModal(false);

    // const readCookie = async () => {
    //   const token = Cookies.get(USER_TOKEN);
    //   if (token) {
    //     const response = await API.post(`${PROFILE_ENDPOINT}`, {
    //       "access_token": user
    //     });

    //     if (response.ok) {
    //       const fetchData = await response.json();
    //       setUser(fetchData.data);
    //       fetchInsurance(fetchData.data);
    //       dispatch(actLoadProfile(fetchData.data));
    //     }
    //   }
    // };
    // readCookie();
  }, [dispatch, navigate]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InsurancesList data={data} />
        </Grid>
        <Grid item xs={12}>
          <Modal open={loadingModal}>
            <CircularProgress />
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <Copyright sx={{ pt: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insurance;