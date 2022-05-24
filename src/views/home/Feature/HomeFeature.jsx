import React, { forwardRef, useEffect, useState } from 'react';
import {
    Box,
    Alert,
    Modal,
    Snackbar,
    Button,
    Grid,
    IconButton,
    TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { actGetHomeFeature } from '../../../actions';
import API from '../../../api/API';
import { HOME_FEATURE_DETAIL_ENDPOINT, HOME_FEATURE_ENDPOINT } from '../../../api/endpoint';
import { host_url, RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeFeatureEditor from './HomeFeatureEditor';
import WarnDialog from '../../../components/WarnDialog';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import MaterialTable from 'material-table';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import EditIcon from "@material-ui/icons/Edit";

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
    root: {},
    boundary: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    container: {
        display: "flex",
        flexDirection: "column",
        border: "1px dashed #ccc",
        color: "#fff",
        padding: "18px",
        backgroundColor: "#fff"
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

const HomeFeature = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeFeature = useSelector(state => state.homeFeature.homeFeature);

    const [featureDetail, setFeatureDetail] = useState("");
    const [selectFeatureDetail, setSelectFeatureDetail] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [rows, setRows] = useState(null);

    const mappingItems = (data) => {
        if (data !== null && data.homeFeatureDetail !== null && data.homeFeatureDetail.length) {
            let homeFeatureDetail = [...data.homeFeatureDetail].map((item, index) => {
                return {
                    no: index + 1,
                    id: item.id,
                    title: item.title,
                    icon: item.icon,
                    image: item.image,
                    content: item.content,
                    is_active: item.is_active,
                    createdDate: item.createdDate
                }
            });

            return homeFeatureDetail;
        }

        return [];
    }

    useEffect(() => {
        const fetchHomeFeature = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    setRows(mappingItems(fetchData));
                    dispatch(actGetHomeFeature(fetchData));
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

        fetchHomeFeature();
    }, []);

    const onEdit = (event, item) => {
        setFeatureDetail(item);
        setSelectFeatureDetail(true);
    };

    const onDelete = async (item) => {
        setLoading(true);

        const response = await API.delete(`${HOME_FEATURE_DETAIL_ENDPOINT}/id/${item.id}`);
        if (response.ok) {
            const res = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeFeature(fetchData));
                setRows(mappingItems(fetchData));
                setMessage(`Xóa tính năng thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Xóa tính năng thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChangeTitle = title => {
        const feature = { ...homeFeature, featureTitle: title };
        dispatch(actGetHomeFeature(feature));
    }

    const handleAddItem = () => {
        setFeatureDetail("");
        setSelectFeatureDetail(true);
    };

    const onSubmitFeature = async () => {
        setLoading(true);
        const data = {
            id: homeFeature.featureId,
            homeId: homeId,
            title: homeFeature.featureTitle
        };

        const response = await API.put(`${HOME_FEATURE_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeFeature(fetchData));
                setRows(mappingItems(fetchData));
                setMessage(`Cập nhật tiêu đề tính năng thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật tiêu đề tính năng thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    }

    const onSubmitFeatureDetail = async (id, image, icon, title, content) => {
        setLoading(true);
        const data = {
            id: id,
            image: image,
            homeFeatureId: homeFeature.featureId,
            icon: icon,
            title: title,
            content: content
        };

        let response;

        if (id === -1) {
            response = await API.post(`${HOME_FEATURE_DETAIL_ENDPOINT}`, data);
        } else {
            response = await API.put(`${HOME_FEATURE_DETAIL_ENDPOINT}`, data);
        }

        if (response.ok) {
            const res = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeFeature(fetchData));
                setRows(mappingItems(fetchData));
                setMessage(`Cập nhật chi tiết tính năng thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật chi tiết tính năng thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
        onClose();
    }

    const onClose = () => {
        setFeatureDetail("");
        setSelectFeatureDetail(false);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                <Box className={classes.container}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 3
                        }}
                    >
                        <Box className={classes.title}>
                            Tính năng
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: 3
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Tiêu đề"
                            label="Tiêu đề"
                            name="tiêu đề"
                            value={homeFeature.featureTitle}
                            onChange={e => handleChangeTitle(e.target.value)}
                            variant="outlined"
                            className={classes.title}
                            sx={{
                                background: "white",
                                marginBottom: 3,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon size={14} />}
                            style={{
                                alignItems: "center",
                                maxWidth: 130,
                                maxHeight: 35,
                                minWidth: 130,
                                minHeight: 35,
                                display: "flex",
                                textTransform: 'none',
                                background: 'linear-gradient(#00AFEC, #005FBE)',
                                color: "white",
                                fontSize: 14
                            }}
                            onClick={handleAddItem}
                        >
                            Thêm mới
                        </Button>
                        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                            {rows
                                ? (
                                    <MaterialTable
                                        columns={[
                                            { id: 'no', title: 'No.', field: "no" },
                                            {
                                                id: 'image',
                                                title: 'Hình ảnh',
                                                render: rowData => {
                                                    return <img src={host_url + rowData.image} style={{ maxWidth: '80px' }} />
                                                }
                                            },
                                            {
                                                id: 'title',
                                                title: 'Tiêu đề',
                                                align: "left",
                                                field: "title",
                                                render: rowData => {
                                                    return (
                                                        <LinesEllipsis
                                                            text={parse(rowData.title)}
                                                            maxLine='3'
                                                            ellipsis='...'
                                                            trimRight
                                                            basedOn='letters'
                                                        />
                                                    );
                                                }
                                            },
                                            {
                                                id: "actions",
                                                title: "Actions",
                                                render: rowData => {
                                                    return (
                                                        <Box style={{
                                                            display: "flex"
                                                        }}>
                                                            <IconButton
                                                                aria-label="edit"
                                                                onClick={(e) => { onEdit(e, rowData) }}
                                                                color='success'
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <WarnDialog item={rowData} onClick={onDelete} />
                                                        </Box>
                                                    );
                                                }
                                            }
                                        ]}
                                        data={rows}
                                        title="Danh sách tính năng"
                                        icons={tableIcons}
                                        options={{ sorting: true }}
                                    />
                                )
                                : <Loading />
                            }
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon size={14} />}
                        style={{
                            alignItems: "center",
                            maxWidth: 130,
                            maxHeight: 35,
                            minWidth: 130,
                            minHeight: 35,
                            display: "flex",
                            textTransform: 'none',
                            background: 'linear-gradient(#00AFEC, #005FBE)',
                            color: "white",
                            fontSize: 14
                        }}
                        onClick={() => onSubmitFeature()}
                    >
                        Lưu lại
                    </Button>
                </Box>
            </Grid>
            <Modal open={selectFeatureDetail}>
                <Box sx={{ marginTop: 4 }}>
                    <HomeFeatureEditor
                        featureDetail={featureDetail}
                        onSubmit={onSubmitFeatureDetail}
                        onClose={onClose}
                    />
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={`Import Sucess!`}
            >
                <Alert onClose={handleCloseSnackbar} severity={message && message.includes('thành công') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
            <Modal open={loading}>
                <Loading />
            </Modal>
        </Grid>
    )
}

export default HomeFeature;