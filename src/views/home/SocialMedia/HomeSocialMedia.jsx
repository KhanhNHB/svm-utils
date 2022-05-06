import React, { forwardRef, useEffect, useState } from 'react';
import {
    Box,
    Alert,
    Modal,
    Snackbar,
    TextField,
    Button,
    Grid,
    Divider,
    IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { actGetHomeSocialMedia } from '../../../actions';
import API from '../../../api/API';
import { HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT, HOME_SOCIAL_MEDIA_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import { host_url, RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeSocialMediaEditor from './HomeSocialMediaEditor';
import SaveIcon from '@mui/icons-material/Save';

import WarnDialog from '../../../components/WarnDialog';
import AddIcon from '@mui/icons-material/Add';
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

const HomeSocialMedia = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeSocialMedia = useSelector(state => state.homeSocialMedia.homeSocialMedia);

    const [order, setOrder] = useState('asc');
    const [homeSocialMediaDetail, setHomeSocialMediaDetail] = useState("");

    const [orderBy, setOrderBy] = useState('id');

    const [selectSocialMediaDetail, setSelectSocialMediaDetail] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();

    const [imageMessageError, setImageMessageError] = useState('');
    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState(null);

    const mappingItems = (data) => {
        console.log(data);
        if (data !== null && data.homeSocialMediaDetails !== null && data.homeSocialMediaDetails.length) {
            let homeSocialMediaDetails = [...data.homeSocialMediaDetails].map((item, index) => {
                return {
                    no: index + 1,
                    id: item.id,
                    homeSocialMediaId: item.homeSocialMediaId,
                    title: item.title,
                    content: item.content,
                    image: item.image,
                    description: item.description
                }
            });

            return homeSocialMediaDetails;
        }

        return [];
    }

    useEffect(() => {
        const fetchHomeSocialMedia = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    setRows(mappingItems(fetchData));
                    dispatch(actGetHomeSocialMedia(fetchData));
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

        fetchHomeSocialMedia();
    }, []);

    const handleClicItem = (socialMediaDetail) => {
        setHomeSocialMediaDetail(socialMediaDetail);
        setSelectSocialMediaDetail(true);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChangeTitle = title => {
        const dataSocialMedia = { ...homeSocialMedia, title: title };
        dispatch(actGetHomeSocialMedia(dataSocialMedia));
    }

    const handleChangeTitleRecent = title => {
        const dataSocialMedia = { ...homeSocialMedia, titleRecent: title };
        dispatch(actGetHomeSocialMedia(dataSocialMedia));
    }

    const handleChangeContentRecent = content => {
        const dataSocialMedia = { ...homeSocialMedia, contentRecent: content };
        dispatch(actGetHomeSocialMedia(dataSocialMedia));
    }

    const onClose = () => {
        setHomeSocialMediaDetail("");
        setSelectSocialMediaDetail(false);
    };

    const onSubmitSocialMedia = async () => {
        setLoading(true);
        const data = {
            id: homeSocialMedia.id,
            title: homeSocialMedia.title,
            titleRecent: homeSocialMedia.titleRecent,
            contentRecent: homeSocialMedia.contentRecent
        };

        const response = await API.put(`${HOME_SOCIAL_MEDIA_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeSocialMedia(fetchData));
                setMessage(`Cập nhật tiêu đề truyền thông thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật tiêu đề truyền thông thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    }

    const onEdit = (event, item) => {
        setHomeSocialMediaDetail(item);
        setSelectSocialMediaDetail(true);
    };

    const onDelete = async (item) => {
        setLoading(true);

        const response = await API.delete(`${HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT}/id/${item.id}`);
        if (response.ok) {
            const res = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeSocialMedia(fetchData));
                setRows(mappingItems(fetchData));
                setMessage(`Xóa tin truyền thông thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Xóa tin truyền thông thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
    };

    const onSubmitSocialMediaDetail = async (id, image, title, content, description) => {
        setLoading(true);
        const data = {
            id: id,
            homeSocialMediaId: homeSocialMedia.id,
            image: image,
            title: title,
            content: content,
            description: description
        };

        let response;

        if (id === -1) {
            response = await API.post(`${HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT}`, data);
        } else {
            response = await API.put(`${HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT}`, data);
        }

        if (response.ok) {
            const res = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeSocialMedia(fetchData));
                setRows(mappingItems(fetchData));
                setMessage(`Cập nhật chi tiết truyền thông thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật chi tiết truyền thông thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
        onClose();
    }

    const handleAddItem = () => {
        setHomeSocialMediaDetail("");
        setSelectSocialMediaDetail(true);
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
                            Truyền thông
                        </Box>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Tiêu đề"
                        label="tiêu đề"
                        name="tiêu để"
                        value={homeSocialMedia.title}
                        onChange={e => handleChangeTitle(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Grid container sx={{ marginTop: 3 }}>
                        <Grid item xs={12} sm={12}>
                            <Box
                                className={classes.container}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: 3
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Tiêu đề gần đây"
                                    label="tiêu đề gần đây"
                                    name="tiêu đề gần đây"
                                    value={homeSocialMedia.titleRecent}
                                    onChange={e => handleChangeTitleRecent(e.target.value)}
                                    variant="outlined"
                                    className={classes.title}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Box className={classes.text} sx={{ marginTop: 2.5 }}>Nội dung gần đây</Box>
                                <form>
                                    <textarea
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            padding: '12px 20px',
                                            boxSizing: 'border-box',
                                            border: '1px solid lightgrey',
                                            borderRadius: '4px',
                                            backgroundColor: 'white',
                                            fontSize: '16px',
                                            resize: 'none',
                                        }}
                                        onChange={e => handleChangeContentRecent(e.target.value)}
                                        value={homeSocialMedia.contentRecent}
                                    />
                                </form>
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
                                    fontSize: 14
                                }}
                                onClick={() => onSubmitSocialMedia()}
                            >
                                Lưu lại
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Box
                                style={{
                                    marginTop: 27,
                                    marginBottom: 27
                                }}
                            >
                                <Divider />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12}>
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
                                                        return <img src={host_url + rowData.image} style={{ maxWidth: '100px' }} />
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
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Modal open={selectSocialMediaDetail}>
                <Box sx={{ marginTop: 4 }}>
                    <HomeSocialMediaEditor
                        homeSocialMediaDetail={homeSocialMediaDetail}
                        onSubmit={onSubmitSocialMediaDetail}
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
            <Modal open={loadingModal}>
                <Loading />
            </Modal>
        </Grid>
    )
}

export default HomeSocialMedia;