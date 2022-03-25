import React, { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import Cookies from 'js-cookie';
import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HOME_ENDPOINT } from "../../api/endpoint";
import API from '../../api/API';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../common';
import { useLocation, useNavigate } from "react-router";
import { actGetHome } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import HomeSlide from "./Slide/HomeSlide";
import HomeVision from "./Vision/HomeVision";
import HomeFeature from "./Feature/HomeFeature";
import HomeEvaluate from "./Evaluate/HomeEvaluate";
import HomeSocialMedia from "./SocialMedia/HomeSocialMedia";
import HomeOffer from "./Offer/HomeOffer";

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

export default function Home() {
    const classes = useStyles();
    const regex = /(<([^>]+)>)/ig;

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const home = useSelector(state => state.home.home);

    const [title, setTitle] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHome = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_ENDPOINT}?isActive=${true}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    const data = fetchData;
                    dispatch(actGetHome(data));
                } else {
                    if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                        Cookies.remove(USER_TOKEN);
                        Cookies.remove(USER_DEVICE_TOKEN);
                        navigate('/', { replace: true });
                    }
                }
            } catch (err) {

            }

            setLoading(false);
        };

        fetchHome();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", fontSize: 24, paddingBottom: 5 }}>
                <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Chỉnh sửa Trang chủ
                </Typography>
            </Box>
            {!loading
                ? (
                    <Box>
                        {home && <HomeSlide home={home} />}
                        {home && <HomeVision homeId={home.id} />}
                        {home && <HomeFeature homeId={home.id} />}
                        {home && <HomeEvaluate homeId={home.id} />}
                        {home && <HomeSocialMedia homeId={home.id} />}
                        {home && <HomeOffer homeId={home.id} />}
                    </Box>
                )
                : (
                    <Loading />
                )
            }
        </Container>
    );
}