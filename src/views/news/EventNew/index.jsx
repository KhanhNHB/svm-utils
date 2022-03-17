import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box
} from '@mui/material';
import { NEWS_ENDPOINT } from '../../../api/endpoint';
import Cookies from 'js-cookie';
import API from '../../../api/API';
import {
  RESPONSE_STATUS,
  USER_DEVICE_TOKEN,
  USER_TOKEN
} from '../../../common';
import { actGetAllEventNewsByCategoryId } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import DiscountNewList from './EventNewList';
import Loading from '../../../components/Loading';
import { handleNewCategoryId } from '../../../utils/handleNewCategoryId';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  boundary: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  container: {
    maxHeight: 700,
  },
  modal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiCircularProgress-root': {
      outline: 'none'
    },
  },
}));

const Copyright = () => {
  return (
    <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
      {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
    </p>
  );
}

const EventNewListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.news);
  const location = useLocation();

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      setLoading(true);

      const pathVariable = `category_id/` + handleNewCategoryId(location.pathname);

      const response = await API.get(`${NEWS_ENDPOINT}/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        const data = { news: fetchData };
        dispatch(actGetAllEventNewsByCategoryId(data));
      } else {
        if (response.status === RESPONSE_STATUS.FORBIDDEN) {
          Cookies.remove(USER_TOKEN);
          Cookies.remove(USER_DEVICE_TOKEN);
          navigate('/', { replace: true });
        }
      }

      setLoading(false);
    }

    fetchNewsByCategory();

    // const readCookie = async () => {
    //   const user = Cookies.get(USER_TOKEN);
    //   if (user) {
    //     const response = await API.post(`${PROFILE_ENDPOINT}`, {
    //       "access_token": user
    //     });

    //     if (response.ok) {
    //       const fetchData = await response.json();
    //       setUser(fetchData.data);
    //       fetchShipper(fetchData.data);
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
          <Box sx={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Manrope, sans-serif",
            textAlign: "center"
          }}>
            Tin Tức Khuyến Mại
          </Box>
        </Grid>
        <Grid item xs={12}>
          {loading
            ? <Loading />
            : <DiscountNewList data={data} />
          }
        </Grid>
        <Grid item xs={12}>
          <Copyright sx={{ pt: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventNewListView;