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
import SaveIcon from '@mui/icons-material/Save';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    container: {
        display: "flex",
        flexDirection: "column",
        border: "1px dashed #ccc",
        color: "#fff",
        padding: "18px",
        backgroundColor: "#fff"
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
        fontSize: 13,
        fontFamily: "Manrope, sans-serif",
        color: "black"
    },
    title: {
        fontSize: 16,
        fontFamily: "Manrope, sans-serif",
        color: "black",
        fontWeight: "bold"
    },
    content: {
        fontSize: 15,
        color: "black",
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
        <Grid container>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                <Box className={classes.container}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 3
                        }}
                    >
                        <Box className={classes.title}>
                            Trải nghiệm
                        </Box>
                    </Box>
                    {
                        !homeOffer
                            ? <Loading />
                            : <TextField
                                fullWidth
                                placeholder="Tiêu đề"
                                label="tiêu đề"
                                name="tiêu để"
                                value={homeOffer.title}
                                onChange={e => handleChangeTitle(e.target.value)}
                                variant="outlined"
                                className={classes.title}
                                InputLabelProps={{ shrink: true }} F
                            />
                    }
                    <Box sx={{ marginTop: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon size={14} />}
                            style={{
                                dispaly: "flex",
                                alignItems: "center",
                                maxWidth: 130,
                                maxHeight: 35,
                                minWidth: 130,
                                minHeight: 35,
                                display: "flex",
                                textTransform: 'none',
                                background: 'linear-gradient(#00AFEC, #005FBE)',
                                fontSize: 14
                            }}
                            onClick={() => onSubmit()}
                        >
                            Lưu lại
                        </Button>
                    </Box>
                </Box>
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
        </Grid>
    )
}

export default HomeOffer;