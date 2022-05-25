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
    Button,
    Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { actGetHomeVision, actGetHomeBanner } from '../../../actions';
import API from '../../../api/API';
import { HOME_VISION_ENDPOINT, HOME_BANNER_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import { host_url, RESPONSE_STATUS, USER_DEVICE_TOKEN, USER_TOKEN } from '../../../common';
import parse from "html-react-parser";
import LinesEllipsis from 'react-lines-ellipsis';
import Loading from '../../../components/Loading';
import HomeVisionEditor from './HomeVisionEditor';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';

const columns = [
    { id: 'id', label: 'Id', minWidth: 350, align: 'left' },
    { id: 'title', label: 'Tiêu đề', minWidth: 465, align: 'left' }
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
                <TableCell style={{ minWidth: 50 }}>Action</TableCell>
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
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Manrope, sans-serif"
    },
    title: {
        fontSize: 16,
        fontFamily: "Manrope, sans-serif",
        color: "black",
        fontWeight: "bold"
    },
}));

const HomeVision = ({ homeId }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeVision = useSelector(state => state.homeVision.homeVision);
    const homeBanner = useSelector(state => state.homeVision.homeBanner);

    const [order, setOrder] = useState('asc');
    const [vision, setVision] = useState("");

    const [orderBy, setOrderBy] = useState('id');

    const [selectVision, setSelectVision] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const [imageMessageError, setImageMessageError] = useState({ id: -1, message: "" });

    useEffect(() => {
        const fetchHomeVision = async () => {
            try {
                const response = await API.get(`${HOME_VISION_ENDPOINT}/home_id/${homeId}`);
                if (response.ok) {
                    const fetchData = await response.json();
                    const data = fetchData;

                    dispatch(actGetHomeVision(data));
                } else {
                    if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                        Cookies.remove(USER_TOKEN);
                        Cookies.remove(USER_DEVICE_TOKEN);
                        navigate('/', { replace: true });
                    }
                }
            } catch (err) {
            }
        };

        fetchHomeVision();
    }, []);

    useEffect(() => {
        const fetchHomeBanner = async () => {
            try {
                const response = await API.get(`${HOME_BANNER_ENDPOINT}/banner/vision`);
                if (response.ok) {
                    const fetchData = await response.json();
                    const data = fetchData;

                    dispatch(actGetHomeBanner(data));
                } else {
                    if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                        Cookies.remove(USER_TOKEN);
                        Cookies.remove(USER_DEVICE_TOKEN);
                        navigate('/', { replace: true });
                    }
                }
            } catch (err) {
            }
        };

        fetchHomeBanner();
    }, []);

    const handleClicItem = (vision) => {
        setVision(vision);
        setSelectVision(true);
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
        }
    };

    const handleChangeTitle = title => {
        setVision((vision) => {
            return { ...vision, title: title };
        });
    }

    const handleChangeContent = content => {
        setVision((vision) => {
            return { ...vision, content: content };
        });
    }

    const onSubmit = async () => {
        setLoadingModal(true);

        const data = {
            id: vision.id,
            homeId: homeId,
            title: vision.title,
            content: vision.content,
        };

        const response = await API.put(`${HOME_VISION_ENDPOINT}`, data);
        if (response.ok) {
            const res = await API.get(`${HOME_VISION_ENDPOINT}/home_id/${homeId}`);
            if (res.ok) {
                const fetchData = await res.json();
                const data = fetchData;
                dispatch(actGetHomeVision(data));
                setMessage(`Cập nhật hỗ trợ thành công!`);
                setOpenSnackbar(true);
            } else {
                if (response.status === RESPONSE_STATUS.FORBIDDEN) {
                    Cookies.remove(USER_TOKEN);
                    Cookies.remove(USER_DEVICE_TOKEN);
                    navigate('/', { replace: true });
                }
            }
        } else {
            setMessage(`Cập nhật hỗ trợ thất bại!`);
            setOpenSnackbar(true);
        }

        setLoadingModal(false);
        onClose();
    }

    const onClose = () => {
        setVision("");
        setSelectVision(false);
    };

    const handleChangeImage = async (event) => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('file', image);

        axios.post(UPLOAD_FILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=---',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(res => {
            const homeBanner = [...homeBanner];

            dispatch(actGetHomeBanner(homeBanner.image));
            setImageMessageError({ id: -1, message: "" });
        }).catch(err => {
            setImageMessageError({ id: 0, message: 'Tải hình ảnh nền thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại!' });
        });
    };

    const onSubmitHomeBanner = async (banner) => {

        // const data = {
        //     image: banner,
        //     position: "vision"
        // };

        // const response = await API.put(`${HOME_SLIDE_ENDPOINT}`, data);

        // if (response.ok) {
        //     try {
        //         const res = await API.get(`${HOME_SLIDE_ENDPOINT}`);
        //         if (res.ok) {
        //             const fetchData = await res.json();
        //             const data = fetchData;
        //             dispatch(actGetHomeSlide(data));
        //             setMessage(`Cập nhật hình nền thành công!`);
        //             setOpenSnackbar(true);
        //         } else {
        //             if (response.status === RESPONSE_STATUS.FORBIDDEN) {
        //                 Cookies.remove(USER_TOKEN);
        //                 Cookies.remove(USER_DEVICE_TOKEN);
        //                 navigate('/', { replace: true });
        //             }
        //         }
        //     } catch (err) {

        //     }
        // } else {
        //     setMessage(`Cập nhật hình nền thất bại!`);
        //     setOpenSnackbar(true);
        // }

    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                <Box className={classes.container}>
                    <Box className={classes.title} sx={{ marginBottom: 3 }}>
                        Hỗ trợ
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "93%",
                            backgroundImage: !homeBanner.image && 'url("/image-default.png")',
                            backgroundRepeat: 'no-repeat, repeat',
                            backgroundPosition: 'center',
                            marginBottom: 5
                        }}
                    >
                        <Button
                            variant="raised"
                            component="label"
                            sx={{
                                background: 'wheat !important',
                                color: 'black !important',
                                width: "200px"
                            }}
                        >
                            Chọn hình ảnh
                            <input
                                accept="image/*"
                                className='ip'
                                style={{ display: 'none' }}
                                id="raised-button-file-small"
                                onChange={(e) => handleChangeImage(e)}
                                multiple
                                type="file"
                            />
                        </Button>

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
                                fontSize: 14,
                                margin: "10px 0"
                            }}
                            onClick={() => onSubmitHomeBanner(homeBanner.image)}
                        >
                            Lưu lại
                        </Button>

                        <Box>
                            <img
                                src={homeBanner.image ? host_url + homeBanner.image : ""}
                                style={{ display: 'block', maxWidth: '100%', height: '250px' }}
                            />
                            <p style={{ color: 'red' }}>{imageMessageError.id === 0 ? imageMessageError.message : ""}</p>
                        </Box>

                       
                    </Box>


                    <TableContainer className={classes.container}>
                        <Table aria-label="sticky table">
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                key={1}
                            />
                            {(homeVision && homeVision.length) &&
                                <TableBody>
                                    {stableSort(homeVision, getComparator(order, orderBy)).map((item, index) => {
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
                    {(homeVision && homeVision.length) && (
                        <TablePagination
                            rowsPerPageOptions={[0]}
                            component="div"
                            count={homeVision.length}
                            rowsPerPage={10}
                            page={0}
                            onChangePage={() => { }}
                        />
                    )}
                </Box>
                <Modal open={selectVision}>
                    <Box sx={{ marginTop: 4 }}>
                        <HomeVisionEditor
                            vision={vision}
                            handleChangeTitle={handleChangeTitle}
                            handleChangeContent={handleChangeContent}
                            onSubmit={onSubmit}
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
        </Grid>
    )
}

export default HomeVision