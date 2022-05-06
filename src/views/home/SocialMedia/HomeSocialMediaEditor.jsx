import React, { useState } from 'react';
import {
    Button,
    Box,
    Grid,
    TextField,
    Container
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { UPLOAD_FILE } from '../../../api/endpoint';
import axios from 'axios';
import { host_url } from '../../../common';
import SunEditor from 'suneditor-react';

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
        color: "black",
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

const HomeSocialMediaEditor = ({
    homeSocialMediaDetail,
    onSubmit,
    onClose
}) => {
    const classes = useStyles();

    const [id, setId] = useState(homeSocialMediaDetail.id ? homeSocialMediaDetail.id : -1);
    const [image, setImage] = useState(homeSocialMediaDetail.image ? homeSocialMediaDetail.image : '');
    const [title, setTitle] = useState(homeSocialMediaDetail.title ? homeSocialMediaDetail.title : '');
    const [content, setContent] = useState(homeSocialMediaDetail.content ? homeSocialMediaDetail.content : '');
    const [description, setDescription] = useState(homeSocialMediaDetail.description ? homeSocialMediaDetail.description : '');

    const [imageMessageError, setImageMessageError] = useState('');

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
                setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại! ')
            });
    }


    const handleChangeTitle = (title) => {
        setTitle(title);
    }

    const handleChangeContent = (content) => {
        setContent(content);
    }

    const handleChangeDescription = (description) => {
        setDescription(description);
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 5, height: 500, overflowY: "auto" }}>
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
                    <Grid item xs={6} sm={6}>
                        <Box className={classes.text}>Mô tả ngắn</Box>
                        <form>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    padding: '8px 10px',
                                    boxSizing: 'border-box',
                                    border: '2px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: 'white',
                                    fontSize: '15px',
                                    resize: 'none',
                                }}
                                onChange={handleChangeContent}
                                value={content}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={6} sm={6}>
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
                            <p color='error'>{imageMessageError}</p>
                            <p style={{ color: 'red' }}>{imageMessageError}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box className={classes.title}>Nội dung</Box>
                        <SunEditor
                            autoFocus={false}
                            height={500}
                            setContents={description}
                            onChange={handleChangeDescription}
                            showToolbar={true}
                            setOptions={{
                                buttonList: [
                                    [
                                        'undo',
                                        'redo',
                                        'link',
                                        'fullScreen',
                                        "bold",
                                        "underline",
                                        "italic",
                                        "strike",
                                        "list",
                                        "align",
                                        "fontSize",
                                        "formatBlock",
                                        "table",
                                        "image"
                                    ]
                                ]
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => onSubmit(id, image, title, content)}
                                    style={{ color: 'white', maxWidth: 120, minWidth: 120 }}>
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

export default HomeSocialMediaEditor;