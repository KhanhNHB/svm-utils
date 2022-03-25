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
import { UPLOAD_FILE } from '../../../../api/endpoint';
import { host_url } from '../../../../common';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import SunEditor from 'suneditor-react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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

const SetupModal = ({ handleMessage, handleSnackbar, onSubmit, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
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

    const handleChangeDescription = (description) => {
        setDescription(description);
    };

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
    };

    const handleOnClose = () => {
        setTitle("");
        setContent("");
        setDescription("");
        setImage("");
        onClose();
    };

    const handleCreate = async () => {
        onSubmit(title, content, description, image);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4, height: 600, overflowY: "auto" }}>
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
                        <TextField
                            fullWidth
                            placeholder="Tiêu đề"
                            label="tiêu đề"
                            name="tiêu đề"
                            value={title}
                            onChange={e => handleChangeTitle(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.title}>Nội dung</Box>
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
                                onChange={handleChangeContent}
                                value={content}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.title}>Hình ảnh</Box>
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
                        <Box className={classes.title}>Chi tiết</Box>
                        <SunEditor
                            autoFocus={false}
                            height={800}
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
                                    onClick={() => handleCreate()}
                                    disabled={(!title && !content) ? true : false}
                                    startIcon={<AddIcon size={14} />}
                                    style={{ color: 'white' }}
                                    sx={{
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
                                >
                                    Tạo mới
                                </Button>
                            </Box>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => handleOnClose()}
                                    startIcon={<CloseIcon size={14} />}
                                    style={{
                                        maxWidth: 130,
                                        maxHeight: 35,
                                        minWidth: 130,
                                        minHeight: 35
                                    }}
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

export default SetupModal