import React, { useEffect, useState } from 'react';
import {
    Box,
    Alert,
    Snackbar,
    TextField,
    Button,
    Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { actGetHomeOffer } from '../../../actions';
import API from '../../../api/API';
import { HOME_OFFER_ENDPOINT } from '../../../api/endpoint';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import Loading from '../../../components/Loading';

const useStyles = makeStyles((theme) => ({
    root: {},
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
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Manrope, sans-serif"
    }
}));

const HomeOffer = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const homeOffer = useSelector(state => state.homeOffer.homeOffer);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHomeOffer = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_OFFER_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    dispatch(actGetHomeOffer(fetchData[0]))
                } else {
                    if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                        Cookies.remove(USER_TOKEN);
                        Cookies.remove(USER_DEVICE_TOKEN);
                        navigate('/', { replace: true });
                    }
                }
            } catch (err) {

            }

            setLoading(false);
        };

        fetchHomeOffer();
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChangeTitle = title => {
        const dataHomeOffer = { ...homeOffer, title: title };
        dispatch(actGetHomeOffer(dataHomeOffer));
    }

    const onSubmit = async () => {
        setLoading(true);

        const data = {
            id: homeOffer.id,
            title: homeOffer.title,
        };

        const response = await API.put(`${HOME_OFFER_ENDPOINT}`, data);

        if (response.ok) {
            try {
                const res = await API.get(`${HOME_OFFER_ENDPOINT}/home_id/${homeId}`);
                if (res.ok) {
                    const fetchData = await res.json();
                    dispatch(actGetHomeOffer(fetchData[0]));
                    setMessage(`Cập nhật trải nghiệm thành công!`);
                    setOpenSnackbar(true);
                } else {
                    if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                        Cookies.remove(USER_TOKEN);
                        Cookies.remove(USER_DEVICE_TOKEN);
                        navigate('/', { replace: true });
                    }
                }
            } catch (err) {

            }
        } else {
            setMessage(`Cập nhật trải nghiệm thất bại!`);
            setOpenSnackbar(true);
            setOpenSnackbar(true);
        }

        setLoading(false);
    }

    return (
        <>
            <Grid item sx={12} sm={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <Box className={classes.text} sx={{ fontSize: 24 }}>Trải nghiệm</Box>
                    <Button
                        variant="contained"
                        style={{
                            maxWidth: 160,
                            maxHeight: 40,
                            minWidth: 160,
                            minHeight: 40,
                            display: "flex",
                            textTransform: 'none',
                            background: 'linear-gradient(#00AFEC, #005FBE)',
                            fontSize: 16
                        }}
                        onClick={() => onSubmit()}
                    >
                        Lưu lại
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Box className={classes.text}>Tiêu đề</Box>
                {
                    !homeOffer
                        ? <Loading />
                        : <TextField
                            fullWidth
                            placeholder="Tiêu đề"
                            name="tiêu để"
                            value={homeOffer.title}
                            onChange={e => handleChangeTitle(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                        />
                }
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={`Import Sucess!`}
            >
                <Alert onClose={handleCloseSnackbar} severity={message && message.includes('thành công') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default HomeOffer;