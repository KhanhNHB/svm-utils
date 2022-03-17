import React, { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Modal,
    Snackbar,
    TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HOME_ENDPOINT, HOME_VISION_ENDPOINT, UPLOAD_FILE } from "../../../api/endpoint";
import API from '../../../api/API';
import {
    RESPONSE_STATUS,
    USER_DEVICE_TOKEN,
    USER_TOKEN
} from '../../../common';
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { actGetHome, actGetHomeVision } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
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

const HomeSlide = ({ home }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(home.title ? home.title : "");
    const [contentRAM, setContentRAM] = useState(home.contentRam ? home.contentRam : "");
    const [contentROM, setContentROM] = useState(home.contentRom ? home.contentRom : "");
    const [contentCPU, setContentCPU] = useState(home.contentCpu ? home.contentCpu : "");
    const [contentGPU, setContentGPU] = useState(home.contentGpu ? home.contentGpu : "");
    const [contentHDH, setContentHDH] = useState(home.contentHdh ? home.contentHdh : "");

    const [smallImageOne, setSmallImageOne] = useState(home.smallImageOne ? home.smallImageOne : "");
    const [smallImageTwo, setSmallImageTwo] = useState(home.smallImageTwo ? home.smallImageTwo : "");
    const [smallImageThree, setSmallImageThree] = useState(home.smallImageThree ? home.smallImageThree : "");

    const [smallImageOneMessageError, setSmallImageOneMessageError] = useState('');
    const [smallImageTwoMessageError, setSmallImageTwoMessageError] = useState('');
    const [smallImageThreeMessageError, setSmallImageThreeMessageError] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChangeTitle = title => {
        setTitle(title);
    };

    const handleChangeContentRAM = (content) => {
        setContentRAM(content);
    };

    const handleChangeContentROM = (content) => {
        setContentROM(content);
    };

    const handleChangeContentCPU = (content) => {
        setContentCPU(content);
    };

    const handleChangeContentGPU = (content) => {
        setContentGPU(content);
    };

    const handleChangeContentHDH = (content) => {
        setContentHDH(content);
    };

    const handleChangeSmallImageOne = (event) => {
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
                setSmallImageOne(res.data.url);
                setSmallImageOneMessageError('');
            })
            .catch(err => {
                setSmallImageOne("");
                setSmallImageOneMessageError('Tải hình ảnh slide 1 thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!');
            });
    }

    const handleChangeSmallImageTwo = (event) => {
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
                setSmallImageTwo(res.data.url);
                setSmallImageTwoMessageError('');
            })
            .catch(err => {
                setSmallImageTwo("");
                setSmallImageTwoMessageError('Tải hình ảnh slide 2 thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!');
            });
    }

    const handleChangeSmallImageThree = (event) => {
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
                setSmallImageThree(res.data.url);
                setSmallImageThreeMessageError('');
            })
            .catch(err => {
                setSmallImageThree("");
                setSmallImageThreeMessageError('Tải hình ảnh slide 3 thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!');
            });
    }

    const onSubmit = async () => {
        setLoading(true);

        const data = {
            id: home.id,
            title: title,
            contentRam: contentRAM,
            contentRom: contentROM,
            contentCpu: contentCPU,
            contentGpu: contentGPU,
            contentHdh: contentHDH,
            smallImageOne: smallImageOne,
            smallImageTwo: smallImageTwo,
            smallImageThree: smallImageThree
        };

        const response = await API.put(`${HOME_ENDPOINT}`, data);

        if (response.ok) {
            try {
                const res = await API.get(`${HOME_ENDPOINT}?isActive=${true}`);
                if (res.ok) {
                    const fetchData = await res.json();
                    const data = fetchData;
                    dispatch(actGetHome(data));
                    setMessage(`Cập nhật trang chủ thành công!`);
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
            setMessage(`Cập nhật trang chủ thất bại!`);
            setOpenSnackbar(true);
            setOpenSnackbar(true);
        }

        setLoading(false);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Grid item sx={12} sm={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box className={classes.text} sx={{ fontSize: 24, color: "black" }}>Nội dung</Box>
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
                <TextField
                    fullWidth
                    placeholder="Tiêu đề"
                    name="tiêu để"
                    value={title}
                    onChange={e => handleChangeTitle(e.target.value)}
                    variant="outlined"
                    className={classes.title}
                />
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Box className={classes.text}>RAM</Box>
                <TextField
                    fullWidth
                    placeholder="RAM"
                    name="ram"
                    type="number"
                    value={contentRAM}
                    onChange={e => handleChangeContentRAM(e.target.value)}
                    variant="outlined"
                    className={classes.title}
                />
                <Box className={classes.text}>GB</Box>
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Box sx={{ style: "flex" }}>
                    <Box className={classes.text}>ROM</Box>
                    <TextField
                        fullWidth
                        placeholder="RAM"
                        name="ram"
                        type="number"
                        value={contentROM}
                        onChange={e => handleChangeContentROM(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                    />
                    <Box className={classes.text}>GB</Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Box sx={{ style: "flex" }}>
                    <Box className={classes.text}>CPU</Box>
                    <TextField
                        fullWidth
                        placeholder="CPU"
                        type="number"
                        name="ram"
                        value={contentCPU}
                        onChange={e => handleChangeContentCPU(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                    />
                    <Box className={classes.text}>GHZ</Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Box sx={{ style: "flex" }}>
                    <Box className={classes.text}>GPU</Box>
                    <TextField
                        sx={{ display: "flex" }}
                        fullWidth
                        placeholder="GPU"
                        type="number"
                        name="GPU"
                        value={contentGPU}
                        onChange={e => handleChangeContentGPU(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                    />
                    <Box className={classes.text}>ADRENO</Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Box sx={{ style: "flex" }}>
                    <Box className={classes.text}>HĐH</Box>
                    <TextField
                        fullWidth
                        placeholder="HĐH"
                        name="HĐH"
                        type="number"
                        value={contentHDH}
                        onChange={e => handleChangeContentHDH(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                    />
                    <Box className={classes.text}>Android</Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ marginTop: 10 }}></Grid>
            <Grid item xs={12} sm={4}>
                <Box className={classes.text}>Hình slide 1</Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "93%",
                        backgroundImage: !smallImageOne && 'url("/image-default.png")',
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
                            onChange={handleChangeSmallImageOne}
                            multiple
                            type="file"
                        />
                    </Button>
                    <Box sx={{ margin: "auto" }}>
                        <img src={smallImageOne} style={{ display: 'block', maxWidth: '150px', height: '150px' }} />
                    </Box>
                    <p color='error'>{smallImageOneMessageError}</p>
                    <p style={{ color: 'red' }}>{smallImageOneMessageError}</p>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box className={classes.text}>Hình slide 2</Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "93%",
                        backgroundImage: !smallImageTwo && 'url("/image-default.png")',
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
                            onChange={handleChangeSmallImageTwo}
                            multiple
                            type="file"
                        />
                    </Button>
                    <Box sx={{ margin: "auto" }}>
                        <img src={smallImageTwo} style={{ display: 'block', maxWidth: '150px', height: '150px' }} />
                    </Box>
                    <p color='error'>{smallImageTwoMessageError}</p>
                    <p style={{ color: 'red' }}>{smallImageTwoMessageError}</p>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box className={classes.text}>Hình slide 3</Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "93%",
                        backgroundImage: !smallImageThree && 'url("/image-default.png")',
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
                            onChange={handleChangeSmallImageThree}
                            multiple
                            type="file"
                        />
                    </Button>
                    <Box sx={{ margin: "auto" }}>
                        <img src={smallImageThree} style={{ display: 'block', maxWidth: '150px', height: '150px' }} />
                    </Box>
                    <p color='error'>{smallImageThreeMessageError}</p>
                    <p style={{ color: 'red' }}>{smallImageThreeMessageError}</p>
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
        </>
    )
}

export default HomeSlide