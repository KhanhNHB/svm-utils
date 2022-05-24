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

const HomeEvaluateEditor = ({
    homeEvaluateStep,
    onSubmit,
    onClose
}) => {
    const classes = useStyles();

    const [id, setId] = useState(homeEvaluateStep.id ? homeEvaluateStep.id : -1);
    const [title, setTitle] = useState(homeEvaluateStep.title ? homeEvaluateStep.title : "");
    const [content, setContent] = useState(homeEvaluateStep.content ? homeEvaluateStep.content : "");
    const [videoUrl, setVideoUrl] = useState(homeEvaluateStep.videoUrl ? homeEvaluateStep.videoUrl : "");

    const handleChangeTitle = (title) => {
        setTitle(title);
    };

    const handleChangeContent = (content) => {
        setContent(content);
    };

    const handleChangeVideo = (video) => {
        setVideoUrl(video);
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
                    <Grid item xs={12} sm={12}>
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
                                        "bold",
                                        "underline",
                                        "italic",
                                        "align",
                                        "fontSize",
                                        "formatBlock"
                                    ]
                                ]
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box className={classes.text}>Link Video</Box>
                        <TextField
                            fullWidth
                            placeholder="Link Video"
                            name="link-video"
                            value={videoUrl}
                            onChange={e => handleChangeVideo(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box className={classes.actions}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => onSubmit(id, title, content)}
                                    disabled={!homeEvaluateStep ? true : false}
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

export default HomeEvaluateEditor;