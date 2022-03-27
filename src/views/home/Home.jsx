import React, { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import Cookies from 'js-cookie';
import { Box, Container } from "@mui/material";
import { HOME_ENDPOINT } from "../../api/endpoint";
import API from '../../api/API';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../common';
import { useNavigate } from "react-router";
import { actGetHome } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import HomeSlide from "./Slide/HomeSlide";
import HomeVision from "./Vision/HomeVision";
import HomeFeature from "./Feature/HomeFeature";
import HomeEvaluate from "./Evaluate/HomeEvaluate";
import HomeSocialMedia from "./SocialMedia/HomeSocialMedia";
import HomeOffer from "./Offer/HomeOffer";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const home = useSelector(state => state.home.home);
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
        <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
            <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
                <h1>Chỉnh sửa Trang chủ</h1>
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