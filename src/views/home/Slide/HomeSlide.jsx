import React, { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Grid,
    Modal,
    Snackbar,
    TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HOME_ENDPOINT, HOME_SLIDE_ENDPOINT, UPLOAD_FILE } from "../../../api/endpoint";
import API from '../../../api/API';
import {
    host_url,
    RESPONSE_STATUS,
    USER_DEVICE_TOKEN,
    USER_TOKEN
} from '../../../common';
import axios from "axios";
import { useNavigate } from "react-router";
import { actGetHome, actGetHomeSlide } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import Loading from '../../../components/Loading';
import SunEditor from 'suneditor-react';
import SaveIcon from '@mui/icons-material/Save';

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

const HomeSlide = ({ home }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeSlideImage = useSelector(state => state.homeSlide.homeSlide);

    const [title, setTitle] = useState(home.title ? home.title : "");
    const [content, setContent] = useState(home.content ? home.content : "");

    const [largeImageMessageError, setLargeImageMessageError] = useState({ id: -1, message: "" });
    const [smallImageMessageError, setSmallImageMessageError] = useState({ id: -1, message: "" });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchHomeSlide = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_SLIDE_ENDPOINT}/home_id/${home.id}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    const data = fetchData;

                    dispatch(actGetHomeSlide(data));
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

        fetchHomeSlide();
    }, []);

    const handleChangeTitle = title => {
        setTitle(title);
    }

    const onSubmitHome = async () => {
        setLoading(true);

        const data = {
            id: home.id,
            title: title,
            content: content
        };

        const response = await API.put(`${HOME_ENDPOINT}`, data);

        if (response.ok) {
            try {
                const res = await API.get(`${HOME_ENDPOINT}`);
                if (res.ok) {
                    const fetchData = await res.json();
                    const data = fetchData;
                    dispatch(actGetHome(data));
                    setMessage(`Cập nhật nội dung trang chủ thành công!`);
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
            setMessage(`Cập nhật nội dung trang chủ thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    };

    const onSubmitHomeSlide = async (id, homeId, smallImage, largeImage) => {
        setLoading(true);

        const data = {
            id: id,
            homeId: homeId,
            smallImage: smallImage,
            largeImage: largeImage
        };

        const response = await API.put(`${HOME_SLIDE_ENDPOINT}`, data);

        if (response.ok) {
            try {
                const res = await API.get(`${HOME_SLIDE_ENDPOINT}`);
                if (res.ok) {
                    const fetchData = await res.json();
                    const data = fetchData;
                    dispatch(actGetHomeSlide(data));
                    setMessage(`Cập nhật slide trang chủ thành công!`);
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
            setMessage(`Cập nhật slide trang chủ thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    };

    const handleChangeLargeImage = async (event, slideId) => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('file', image);

        axios.post(UPLOAD_FILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=---',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(res => {
            const homeSlide = [...homeSlideImage];
            const result = homeSlide.map(item => {
                if (item.id === slideId) {
                    return { ...item, largeImage: res.data.url };
                }

                return item;
            });

            dispatch(actGetHomeSlide(result));
            setLargeImageMessageError({ id: -1, message: "" });
        }).catch(err => {
            setLargeImageMessageError({ id: slideId, message: 'Tải hình ảnh nền thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!' });
        });
    };

    const handleChangeSmallImage = async (event, slideId) => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('file', image);

        axios.post(UPLOAD_FILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=---',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(res => {
            const homeSlide = [...homeSlideImage];
            const result = homeSlide.map(item => {
                if (item.id === slideId) {
                    return { ...item, smallImage: res.data.url };
                }

                return item;
            });

            dispatch(actGetHomeSlide(result));
            setSmallImageMessageError({ id: -1, message: "" });
        }).catch(err => {
            setSmallImageMessageError({ id: slideId, message: 'Tải hình ảnh slide thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!' });
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Grid container>
            <Grid item sx={12} sm={12}>
                <Box className={classes.container}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 3,
                        }}
                    >
                        <Box className={classes.title}>
                            Nội dung
                        </Box>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Tiêu đề"
                        label="Tiêu đề"
                        name="tiêu đề"
                        value={title}
                        onChange={e => handleChangeTitle(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                        sx={{
                            marginBottom: 3,
                        }}
                    />
                    <Box>
                        <Box className={classes.text}>Cấu Hình</Box>
                        <SunEditor
                            id='cấu hình'
                            autoFocus={true}
                            height='280px'
                            width='100%'
                            setContents={content}
                            onChange={setContent}
                            setOptions={{
                                buttonList: [
                                    [
                                        'undo',
                                        'redo',
                                        "bold",
                                        "underline",
                                        "italic",
                                        "formatBlock",

                                    ]
                                ]
                            }}
                            setDefaultStyle="font-size: 16px; font-family: Manrope, sans-serif; font-weight: 500;"
                        />
                    </Box>
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
                            onClick={() => onSubmitHome()}
                        >
                            Lưu lại
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                <Box className={classes.container}>
                    <Box className={classes.title} sx={{ marginBottom: 3 }}>Hình ảnh</Box>
                    <Grid container spacing={3}>
                        {homeSlideImage.length && homeSlideImage.map((slide, index) => {
                            return <Grid
                                item
                                xs={12}
                                sm={4}
                                key={index}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px dashed #ccc",
                                        color: "#fff",
                                        padding: 2,
                                        backgroundColor: "#fff"
                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                                        <Box className={classes.text} sx={{ fontSize: 14, fontWeight: "bold" }}>
                                            Hình nền {index + 1}
                                        </Box>
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
                                            onClick={() => onSubmitHomeSlide(slide.id, slide.homeId, slide.smallImage, slide.largeImage)}
                                        >
                                            Lưu lại
                                        </Button>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "93%",
                                            backgroundImage: !slide.largeImage && 'url("/image-default.png")',
                                            backgroundRepeat: 'no-repeat, repeat',
                                            backgroundPosition: 'center',
                                            marginBottom: 5
                                        }}
                                    >
                                        <Button
                                            variant="raised"
                                            component="label"
                                            sx={{
                                                background: 'wheat !important',
                                                color: 'black !important'
                                            }}
                                        >
                                            Chọn hình ảnh
                                            <input
                                                accept="image/*"
                                                className='ip'
                                                style={{ display: 'none' }}
                                                id="raised-button-file-small"
                                                onChange={(e) => handleChangeLargeImage(e, slide.id)}
                                                multiple
                                                type="file"
                                            />
                                        </Button>
                                        <Box sx={{ margin: "auto" }}>
                                            <img
                                                src={slide.largeImage ? host_url + slide.largeImage : ""}
                                                style={{ display: 'block', maxWidth: '100%', height: '250px' }}
                                            />
                                            <p style={{ color: 'red' }}>{largeImageMessageError.id === slide.id ? largeImageMessageError.message : ""}</p>
                                        </Box>
                                    </Box>
                                    <Box className={classes.text} sx={{ marginBottom: 1 }}>
                                        Hình slide {index + 1}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "93%",
                                            backgroundImage: !slide.smallImage && 'url("/image-default.png")',
                                            backgroundRepeat: 'no-repeat, repeat',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <Button
                                            variant="raised"
                                            component="label"
                                            sx={{
                                                background: 'wheat !important',
                                                color: 'black !important'
                                            }}
                                        >
                                            Chọn hình ảnh
                                            <input
                                                accept="image/*"
                                                className='ip'
                                                style={{ display: 'none' }}
                                                id="raised-button-file-small"
                                                onChange={(e) => handleChangeSmallImage(e, slide.id)}
                                                multiple
                                                type="file"
                                            />
                                        </Button>
                                        <Box sx={{ margin: "auto" }}>
                                            <img
                                                src={slide.smallImage ? host_url + slide.smallImage : ""}
                                                style={{ display: 'block', maxWidth: '150px', height: '150px' }}
                                            />
                                        </Box>
                                        <p style={{ color: 'red' }}>{smallImageMessageError.id === slide.id ? smallImageMessageError.message : ""}</p>
                                    </Box>
                                </Box>
                            </Grid>
                        })}
                    </Grid>
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
            <Modal open={loading}>
                <Loading />
            </Modal>
        </Grid>
    )
}

export default HomeSlide