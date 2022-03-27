import React, { useEffect, useState } from 'react';
import { Grid, Modal, Container } from '@mui/material';
import { INSURANCE_ENDPOINT } from '../../../api/endpoint';
import Cookies from 'js-cookie';
import API from '../../../api/API';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import { actGetAllDealerInsurance } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../../components/Loading';
import { handleInsuranceCategoryId } from "../../../utils/handleInsuranceCategoryId";
import DealerList from './DealerList';

const DealerView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingModal, setLoadingModal] = useState(false);
  const data = useSelector(state => state.insurance.insurances);
  const location = useLocation();

  useEffect(() => {

    const fetchInsurances = async () => {
      setLoadingModal(true);
      try {
        const pathVariable = `category_id/` + handleInsuranceCategoryId(location.pathname);
        const response = await API.get(`${INSURANCE_ENDPOINT}/${pathVariable}`);
        if (response.ok) {
          const fetchData = await response.json();
          const data = fetchData[0];

          dispatch(actGetAllDealerInsurance(data));
        } else {
          if (response.status === RESPONSE_STATUS.FORBIDDEN) {
            Cookies.remove(USER_TOKEN);
            Cookies.remove(USER_DEVICE_TOKEN);
            navigate('/', { replace: true });
          }
        }
      } catch (err) {

      }

      setLoadingModal(false);
    }

    fetchInsurances();
  }, [dispatch, navigate]);

  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DealerList data={data} />
        </Grid>
        <Modal open={loadingModal}>
          <Loading />
        </Modal>
      </Grid>
    </Container>
  );
};

export default DealerView;