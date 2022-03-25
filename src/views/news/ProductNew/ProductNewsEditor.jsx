import React from 'react';
import {
    Button,
    Box,
    Grid,
    TextField,
    Container,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { host_url } from '../../../common';
import SaveIcon from '@mui/icons-material/Save';
import SunEditor from 'suneditor-react';
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

const ProductNewsEditor = ({
    news,
    imageMessageError,
    handleChangeTitle,
    handleChangeContent,
    handleChangeDescription,
    handleChangeImage,
    onSubmit,
    onClose
}) => {
    const classes = useStyles();

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
                            labe="tiêu đề"
                            name="tiêu đề"
                            value={news.title}
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
                                value={news.content}
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
                                <img src={news.image ? (host_url + news.image) : ""} style={{ display: 'block', maxWidth: '277px', height: '277px' }} />
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
                            setContents={news.description}
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
                                    onClick={onSubmit}
                                    disabled={!news ? true : false}
                                    startIcon={<SaveIcon size={14} />}
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
                                    Lưu lại
                                </Button>
                            </Box>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={onClose}
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
    );
};

export default ProductNewsEditor;