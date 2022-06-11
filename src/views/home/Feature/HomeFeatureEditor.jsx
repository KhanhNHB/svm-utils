import React, { useState } from 'react';
import {
    Button,
    Box,
    Grid,
    TextField,
    Container
} from '@mui/material';
import SunEditor from 'suneditor-react';
import { makeStyles } from '@material-ui/styles';
import { UPLOAD_FILE } from '../../../api/endpoint';
import axios from 'axios';
import { host_url } from '../../../common';

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

const HomeFeatureEditor = ({
    featureDetail,
    onSubmit,
    onClose
}) => {
    const classes = useStyles();
    const [imageMessageError, setImageMessageError] = useState('');

    const [id, setId] = useState(featureDetail.id ? featureDetail.id : -1);
    const [image, setImage] = useState(featureDetail.image ? featureDetail.image : "");
    const [icon, setIcon] = useState(featureDetail.icon ? featureDetail.icon : "");
    const [title, setTitle] = useState(featureDetail.title ? featureDetail.title : "");
    const [content, setContent] = useState(featureDetail.content ? featureDetail.content : "");

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
                setImage("");
                setImageMessageError('Tải hình ảnh thất bại, mời thử lại!')
                setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 25MB, mời thử lại! ')
            });
    }

    const handleChangeIcon = (event) => {
        setIcon(event.target.value);
    };

    const handleChangeTitle = (title) => {
        setTitle(title);
    };

    const handleChangeContent = (content) => {
        setContent(content);
    };

    return (
        <Container maxWidth="lg">
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
                    <Grid item xs={12} sm={4}>
                        <Box className={classes.text}>SVG Icon</Box>
                        <form>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '330px',
                                    padding: '12px 20px',
                                    boxSizing: 'border-box',
                                    border: '2px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: 'white',
                                    fontSize: '16px',
                                    resize: 'none',
                                }}
                                onChange={handleChangeIcon}
                                value={icon}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={classes.text}>Nội dung</Box>
                        <SunEditor
                            autoFocus={false}
                            height={300}
                            setContents={content}
                            onChange={handleChangeContent}
                            showToolbar={true}
                            setOptions={{
                                buttonList: [
                                    [
                                        'fullScreen',
                                        "italic",
                                        "fontSize",
                                        "formatBlock"
                                    ]
                                ]
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={classes.text}>Hình ảnh</Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "93%",
                                backgroundImage: !image && 'url("/image-default.png")',
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
                                    onChange={(e) => handleChangeImage(e)}
                                    multiple
                                    type="file"
                                />
                            </Button>
                            <Box sx={{ margin: "auto" }}>
                                <img src={host_url + image} style={{ display: 'block', maxWidth: '277px', height: '277px' }} alt="NextGEN" />
                            </Box>
                            <p style={{ color: 'red' }}>{imageMessageError}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => onSubmit(id, image, icon, title, content)}
                                    style={{ color: 'white', maxWidth: 120, minWidth: 120 }}
                                >
                                    Lưu lại
                                </Button>
                            </Box>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={onClose}
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
    );
};

export default HomeFeatureEditor;