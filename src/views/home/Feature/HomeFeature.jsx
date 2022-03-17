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
import { actGetHomeFeature, actGetHomeFeatureDetail, actGetHomeVision } from '../../../actions';
import API from '../../../api/API';
import { HOME_FEATURE_DETAIL_ENDPOINT, HOME_FEATURE_ENDPOINT, HOME_VISION_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeFeatureEditor from './HomeFeatureEditor';
import axios from 'axios';

const columns = [
    { id: 'id', label: 'Id', minWidth: 150, align: 'left' },
    { id: 'icon', label: 'SVG Icon', minWidth: 250, align: 'left' },
    { id: 'image', label: 'Hình ảnh', minWidth: 200, align: 'left' },
    { id: 'title', label: 'Tiêu đề', minWidth: 300, align: 'left' }
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

const HomeFeature = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeFeature = useSelector(state => state.homeFeature.homeFeature);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');

    const [featureDetail, setFeatureDetail] = useState("");
    const [selectFeatureDetail, setSelectFeatureDetail] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchHomeFeature = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
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

    const handleClicItem = (featureDetail) => {
        setFeatureDetail(featureDetail);
        setSelectFeatureDetail(true);
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

    const _hanleRowTableData = (column, value) => {
        switch (column) {
            case 'icon':
                return value;
            case 'image':
                return (
                    <img
                        alt="News Image"
                        style={{ height: 45, width: 60 }}
                        src={value ? value : 'image-default.png'}
                    />
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
        const feature = { ...homeFeature, featureTitle: title };
        dispatch(actGetHomeFeature(feature));
    }

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
            icon: icon,
            title: title,
            content: content
        };

        const response = await API.put(`${HOME_FEATURE_DETAIL_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_FEATURE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeFeature(fetchData));
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
        <>
            <Grid item sx={12} sm={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <Box className={classes.text} sx={{ fontSize: 24 }}>Tính năng</Box>
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
                        onClick={() => onSubmitFeature()}
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
                    value={homeFeature.featureTitle}
                    onChange={e => handleChangeTitle(e.target.value)}
                    variant="outlined"
                    className={classes.title}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TableContainer className={classes.container}>
                    <Table aria-label="sticky table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            key={1}
                        />
                        {(homeFeature.homeFeatureDetail && homeFeature.homeFeatureDetail.length) &&
                            <TableBody>
                                {stableSort(homeFeature.homeFeatureDetail, getComparator(order, orderBy)).map((item, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={item.id}
                                        >
                                            {columns.map((column, index) => {
                                                const value = _hanleRowTableData(column.id, item[column.id]);
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
                {homeFeature.homeFeatureDetail && homeFeature.homeFeatureDetail.length && (
                    <TablePagination
                        rowsPerPageOptions={[0]}
                        component="div"
                        count={homeFeature.homeFeatureDetail.length}
                        rowsPerPage={10}
                        page={0}
                        onChangePage={() => { }}
                    />
                )}
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
        </>
    )
}

export default HomeFeature;