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
import { useNavigate } from 'react-router';
import { actGetHomeEvaluate } from '../../../actions';
import API from '../../../api/API';
import { HOME_EVALUATE_ENDPOINT, HOME_EVALUATE_STEP_ENDPOINT } from '../../../api/endpoint';
import { RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import VideoCard from '../../../components/VideoCard';
import HomeEvaluateEditor from './HomeEvaluateEditor';
import SaveIcon from '@mui/icons-material/Save';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const columns = [
    { id: 'id', label: 'Id', minWidth: 50, align: 'left' },
    { id: 'step', label: 'Bước', minWidth: 100, align: 'left' },
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
                <TableCell style={{ minWidth: 150 }}>Action</TableCell>
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

const HomeEvaluate = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeEvaluate = useSelector(state => state.homeEvaluate.homeEvaluate);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');

    const [homeEvaluateStep, setHomeEvaluateStep] = useState('');
    const [selectEvaluateStep, setSelectEvaluateStep] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHomeFeature = async () => {
            setLoading(true);

            try {
                const response = await API.get(`${HOME_EVALUATE_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    dispatch(actGetHomeEvaluate(fetchData));
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

    const handleClicItem = (evalute) => {
        setHomeEvaluateStep(evalute);
        setSelectEvaluateStep(true);
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

    const _hanleRowTableData = (column, value, step) => {
        switch (column) {
            case 'step':
                return (
                    <Box sx={{ fontSize: 16 }}>0{step.id}</Box>
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
        const dataHomeEvaluate = { ...homeEvaluate, evaluateTitle: title }
        dispatch(actGetHomeEvaluate(dataHomeEvaluate));
    }

    const handleChangeVideoUrl = videoUrl => {
        const formatVideoUrl = videoUrl.replace("watch?v=", 'embed/');

        const dataHomeEvaluate = { ...homeEvaluate, videoUrl: formatVideoUrl }
        dispatch(actGetHomeEvaluate(dataHomeEvaluate));
    }

    const onClose = () => {
        setHomeEvaluateStep("");
        setSelectEvaluateStep(false);
    };

    const onSubmitEvaluate = async () => {
        setLoading(true);

        const data = {
            id: homeEvaluate.evaluateId,
            title: homeEvaluate.evaluateTitle,
            videoUrl: homeEvaluate.videoUrl
        };

        const response = await API.put(`${HOME_EVALUATE_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_EVALUATE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeEvaluate(fetchData));
                setMessage(`Cập nhật tiêu đề đánh giá thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật tiêu đề đánh giá thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
        onClose();
    }

    const onSubmitEvaluateStep = async (id, title, content) => {
        setLoading(true);

        const data = {
            id: id,
            title: title,
            content: content
        };

        const response = await API.put(`${HOME_EVALUATE_STEP_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_EVALUATE_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                dispatch(actGetHomeEvaluate(fetchData));
                setMessage(`Cập nhật chi tiết đánh giá thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật chi tiết đánh giá thất bại!`);
            setOpenSnackbar(true);
        }

        setLoading(false);
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
                            Đánh giá
                        </Box>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} sm={4.2}>
                            <Box
                                className={classes.container}
                                sx={{ display: "flex", flexDirection: "column" }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Tiêu đề"
                                    label="Tiêu đề"
                                    name="tiêu để"
                                    value={homeEvaluate.evaluateTitle}
                                    onChange={e => handleChangeTitle(e.target.value)}
                                    variant="outlined"
                                    className={classes.title}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Box sx={{ display: "flex", marginTop: 5 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Video"
                                        label="Link video"
                                        name="video"
                                        value={homeEvaluate.videoUrl}
                                        onChange={e => handleChangeVideoUrl(e.target.value)}
                                        variant="outlined"
                                        className={classes.title}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <VideoCard videoUrl={homeEvaluate.videoUrl} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={0.1}></Grid>
                        <Grid item xs={12} sm={7.7}>
                            <TableContainer className={classes.container}>
                                <Table aria-label="sticky table">
                                    <EnhancedTableHead
                                        classes={classes}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        key={1}
                                    />
                                    {(homeEvaluate.homeEvaluateSteps && homeEvaluate.homeEvaluateSteps.length) &&
                                        <TableBody>
                                            {stableSort(homeEvaluate.homeEvaluateSteps, getComparator(order, orderBy)).map((item, index) => {
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
                                                        <TableCell>
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
                            {homeEvaluate.homeEvaluateSteps && homeEvaluate.homeEvaluateSteps.length && (
                                <TablePagination
                                    rowsPerPageOptions={[0]}
                                    component="div"
                                    count={homeEvaluate.homeEvaluateSteps.length}
                                    rowsPerPage={10}
                                    page={0}
                                    onChangePage={() => { }}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Box>
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
                            onClick={() => onSubmitEvaluate()}
                        >
                            Lưu lại
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Modal open={selectEvaluateStep}>
                <Box sx={{ marginTop: 4 }}>
                    <HomeEvaluateEditor
                        homeEvaluateStep={homeEvaluateStep}
                        onSubmit={onSubmitEvaluateStep}
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

export default HomeEvaluate;