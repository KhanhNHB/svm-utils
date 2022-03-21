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

const ProductNewsEditor = ({
    news,
    imageMessageError,
    handleChangeTitle,
    handleChangeContent,
    handleChangeImage,
    onSubmit,
    onClose
}) => {
    const classes = useStyles();

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
                            value={news.title}
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
                                value={news.content}
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
                                <img src={news.image ? (host_url + news.image) : ""} style={{ display: 'block', maxWidth: '277px', height: '277px' }} />
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
                                    onClick={onSubmit}
                                    disabled={!news ? true : false}
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

export default ProductNewsEditor;