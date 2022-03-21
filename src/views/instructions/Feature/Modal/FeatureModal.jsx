import React, { useState } from 'react';
import {
    Button,
    Box,
    Grid,
    TextField,
    Container,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { NEWS_ENDPOINT, UPLOAD_FILE } from '../../../../api/endpoint';
import { host_url, RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../../common';
import { handleNewCategoryId } from '../../../../utils/handleNewCategoryId';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { actGetAllDiscountNewsByCategoryId } from '../../../../actions';
import API from '../../../../api/API';
import Cookies from 'js-cookie';
import Loading from '../../../../components/Loading';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        position: 'relative',
        overflowY: 'auto',
    },
    formControl: {
        padding: 10,
        top: 10,
        maxHeight: '50%',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        color: "red",
        display: "flex",
        fontSize: 24,
        fontFamily: "Manrope, sans-serif",
        fontWeight: "bold"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Manrope, sans-serif"
    }
}));

const FeatureModal = ({ handleMessage, handleSnackbar, onSubmit, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [imageMessageError, setImageMessageError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleChangeTitle = title => {
        setTitle(title);
    }

    const handleChangeContent = event => {
        setContent(event.target.value);
    }

    const handleChangeImage = event => {
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
                setImage(res.data.url);
                setImageMessageError('')
            })
            .catch(err => {
                setImageMessageError('Tải hình ảnh thất bại, mời thử lại!')
                setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại! ')
            });
    }

    const handleOnClose = () => {
        setTitle("");
        setContent("");
        setImage("");
        onClose();
    };

    const handleCreate = async () => {
        onSubmit(title, content, image);

        setTitle("");
        setContent("");
        setImage("");
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Box
                sx={{
                    borderRadius: 2,
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderStyle: "solid",
                    padding: 3,
                    backgroundColor: "white"
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Box className={classes.text}>Tiêu đề</Box>
                        <TextField
                            fullWidth
                            placeholder="Tiêu đề"
                            name="name"
                            value={title}
                            onChange={e => handleChangeTitle(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.text}>Nội dung</Box>
                        <form>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '330px',
                                    padding: '12px 20px',
                                    boxSizing: 'border-box',
                                    border: '2px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: '#f8f8f8',
                                    fontSize: '16px',
                                    resize: 'none',
                                }}
                                onChange={handleChangeContent}
                                value={content}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.text}>Hình ảnh</Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "93%",
                                backgroundImage: 'url("/image-default.png")',
                                backgroundRepeat: 'no-repeat, repeat',
                                backgroundPosition: 'center'
                            }}
                        >
                            <input
                                accept="image/*"
                                className='ip'
                                style={{ display: 'none' }}
                                id="raised-button-file-small"
                                onChange={(e) => handleChangeImage(e)}
                                multiple
                                type="file"
                            />
                            <label htmlFor="raised-button-file-small" >
                                <Button
                                    variant="raised"
                                    component="span"
                                    sx={{
                                        background: 'wheat !important',
                                        color: 'black !important'
                                    }}
                                >
                                    Chọn hình ảnh
                                </Button>
                            </label>
                            <Box sx={{ margin: "auto" }}>
                                <img src={image ? (host_url + image) : ""} style={{ display: 'block', maxWidth: '277px', height: '277px' }} />
                            </Box>
                            <p color='error'>{imageMessageError}</p>
                            <p style={{ color: 'red' }}>{imageMessageError}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => handleCreate()}
                                    disabled={(!title && !content) ? true : false}
                                    style={{ color: 'white', maxWidth: 120, minWidth: 120 }}>
                                    Tạo mới
                                </Button>
                            </Box>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => handleOnClose()}
                                    style={{ maxWidth: 120, minWidth: 120 }}
                                >
                                    Đóng
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default FeatureModal