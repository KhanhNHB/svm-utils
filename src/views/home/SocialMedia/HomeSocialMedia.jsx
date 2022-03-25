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
import { actGetHomeSocialMedia } from '../../../actions';
import API from '../../../api/API';
import { HOME_SOCIAL_MEDIA_DETAIL_ENDPOINT, HOME_SOCIAL_MEDIA_ENDPOINT, HOME_VISION_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeSocialMediaEditor from './HomeSocialMediaEditor';
import SaveIcon from '@mui/icons-material/Save';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
                        <Grid item xs={12} sm={4.2}>
                            <Box
                                className={classes.container}
                                sx={{ display: "flex", flexDirection: "column" }}
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
                        </Grid>
                        <Grid item xs={12} sm={0.1}></Grid>
                        <Grid item xs={12} sm={7.7}>
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
                                                                startIcon={<EditOutlinedIcon size={14} />}
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
                    </Grid>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon size={14} />}
                        style={{
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
                        onClick={() => onSubmitSocialMedia()}
                    >
                        Lưu lại
                    </Button>
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
        </Grid >
    )
}

export default HomeSocialMedia;