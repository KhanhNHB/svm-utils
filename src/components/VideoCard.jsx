import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    card: {
        display: "flex",
        width: "100%",
        height: "100%"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        width: "100%",
        height: "100%"
    },
    cover: {
        width: 151
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 1,
        paddingBottom: 1
    },
    playIcon: {
        height: 38,
        width: 38
    }
}));

const VideoCard = ({ videoUrl }) => {
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <iframe
                id="video"
                width="100%"
                heigh="100%"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}

export default VideoCard;