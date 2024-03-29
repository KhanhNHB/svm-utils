import React, { useState } from 'react';
import { Button, Box, Grid, TextField, Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { UPLOAD_FILE } from '../../../../api/endpoint';
import { host_url, } from '../../../../common';
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

const SetupModal = ({ onSubmit, onClose }) => {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imageMessageError, setImageMessageError] = useState("");

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
                setImageMessageError('');
            })
            .catch(err => {
                setImageMessageError('Tải hình ảnh thất bại, mời thử lại!')
                setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 25MB, mời thử lại! ')
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
                        <TextField
                            fullWidth
                            placeholder="Tiêu đề"
                            label="Tiêu đề"
                            name="tiêu đề"
                            value={title}
                            onChange={e => handleChangeTitle(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={classes.title}>Mô tả ngắn</Box>
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
                        <Box className={classes.text}>Ảnh đại diện</Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "350px",
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
                                {image && <img src={host_url + image} style={{ display: 'block', width: "90%", height: "90%" }} alt="img" />}
                            </Box>
                            <p style={{ color: 'red' }}>{imageMessageError}</p>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8}>
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