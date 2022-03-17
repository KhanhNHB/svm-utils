import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Alert,
    Modal,
    TableSortLabel,
    Snackbar,
    TableContainer,
    TextField,
    Button,
    Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import SunEditor from 'suneditor-react';
import { actGetHomeFeature, actGetHomeFeatureDetail, actGetHomeSocialMedia, actGetHomeVision } from '../../../actions';
import API from '../../../api/API';
import { HOME_FEATURE_DETAIL_ENDPOINT, HOME_FEATURE_ENDPOINT, HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT, HOME_SOCIAL_MEDIA_ENDPOINT, HOME_VISION_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeSocialMediaEditor from './HomeSocialMediaEditor';
import axios from 'axios';

const columns = [
    { id: 'id', label: 'Id', minWidth: 50, align: 'left' },
    { id: 'image', label: 'Hình ảnh', minWidth: 120, align: 'left' },
    { id: 'title', label: 'Tiêu đề', minWidth: 200, align: 'left' }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort, user } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        align={headCell.align}
                        style={{ minWidth: headCell.minWidth }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align={"left"}>Action</TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

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

    useEffect(() => {
        const fetchHomeSocialMedia = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
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

    console.log(homeSocialMedia);

    const _hanleRowTableData = (column, value, newsItem) => {
        switch (column) {
            case 'image':
                return (
                    <img alt="News Image" style={{ height: 45, width: 60 }} src={value
                        ? value
                        : 'image-default.png'} />
                );
            case 'title':
                return (
                    <LinesEllipsis
                        text={parse(value)}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                );
            default:
                return value;
        };
    }

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

    const onSubmitSocialMediaDetail = async (id, image, title) => {
        setLoading(true);
        const data = {
            id: id,
            image: image,
            title: title
        };

        const response = await API.put(`${HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_SOCIAL_MEDIA_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeSocialMedia(fetchData));
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


    return (
        <>
            <Grid item sx={12} sm={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <Box className={classes.text} sx={{ fontSize: 24 }}>Truyền thông</Box>
                    <Button
                        variant="contained"
                        style={{
                            maxWidth: 160,
                            maxHeight: 40,
                            minWidth: 160,
                            minHeight: 40,
                            display: "flex",
                            textTransform: 'none',
                            background: 'linear-gradient(#00AFEC, #005FBE)',
                            fontSize: 16
                        }}
                        onClick={() => onSubmitSocialMedia()}
                    >
                        Lưu lại
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Box className={classes.text}>Tiêu đề</Box>
                <TextField
                    fullWidth
                    placeholder="Tiêu đề"
                    name="tiêu để"
                    value={homeSocialMedia.title}
                    onChange={e => handleChangeTitle(e.target.value)}
                    variant="outlined"
                    className={classes.title}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box className={classes.text}>Tiêu đề gần đây</Box>
                    <TextField
                        fullWidth
                        placeholder="Tiêu đề gần đây"
                        name="tiêu để"
                        value={homeSocialMedia.titleRecent}
                        onChange={e => handleChangeTitleRecent(e.target.value)}
                        variant="outlined"
                        className={classes.title}
                    />
                    <Box className={classes.text} sx={{ marginTop: 5 }}>Nội dung gần đây</Box>
                    <form>
                        <textarea
                            style={{
                                width: '100%',
                                height: '220px',
                                padding: '12px 20px',
                                boxSizing: 'border-box',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: '#f8f8f8',
                                fontSize: '16px',
                                resize: 'none',
                            }}
                            onChange={e => handleChangeContentRecent(e.target.value)}
                            value={homeSocialMedia.contentRecent}
                        />
                    </form>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TableContainer className={classes.container} sx={{ height: 360 }}>
                    <Table aria-label="sticky table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            key={1}
                        />
                        {(homeSocialMedia.homeSocialMediaDetails && homeSocialMedia.homeSocialMediaDetails.length) &&
                            <TableBody>
                                {stableSort(homeSocialMedia.homeSocialMediaDetails, getComparator(order, orderBy)).map((item, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={item.id}
                                        >
                                            {columns.map((column, index) => {
                                                const value = _hanleRowTableData(column.id, item[column.id], item);
                                                return (
                                                    <TableCell
                                                        align={column.align}
                                                        id={index}
                                                        key={index}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"left"}>
                                                <Button
                                                    variant="contained"
                                                    size="medium"
                                                    sx={{
                                                        maxWidth: 120,
                                                        maxHeight: 38,
                                                        minWidth: 120,
                                                        minHeight: 38
                                                    }}
                                                    onClick={() => handleClicItem(item)}
                                                >
                                                    Chỉnh sửa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
                {homeSocialMedia.homeSocialMediaDetails && homeSocialMedia.homeSocialMediaDetails.length && (
                    <TablePagination
                        rowsPerPageOptions={[0]}
                        component="div"
                        count={homeSocialMedia.homeSocialMediaDetails.length}
                        rowsPerPage={10}
                        page={0}
                        onChangePage={() => { }}
                    />
                )}
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
        </>
    )
}

export default HomeSocialMedia;