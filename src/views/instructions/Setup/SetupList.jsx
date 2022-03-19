import React, { useState } from 'react';
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
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import LinesEllipsis from 'react-lines-ellipsis';
import parse from "html-react-parser";
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../api/API';
import {
  RESPONSE_STATUS,
  USER_DEVICE_TOKEN,
  USER_TOKEN
} from '../../../common/index';
import { actGetAllSetupInstructionsByCategoryId } from '../../../actions';
import { INSTRUCTIONS_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import Loading from '../../../components/Loading';
import FeatureEditor from './SetupEditor';
import { handleInstructionsCategoryId } from '../../../utils/handleInstructionsCategoryId';

const columns = [
  { id: 'id', label: 'Id', minWidth: 120, align: 'left' },
  { id: 'title', label: 'Tiêu đề', minWidth: 200, align: 'left' },
  { id: 'image', label: 'Hình ảnh', minWidth: 200, align: 'left' }
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
        <TableCell align={"left"} style={{ minWidth: 200 }}>Action</TableCell>
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
  boundary: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
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
}));

const SetupList = ({ className, data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');
  const [instructions, setInstructions] = useState("");

  const [imageMessageError, setImageMessageError] = useState("");
  const [orderBy, setOrderBy] = useState('id');

  const [selectInstructions, setSelectInstructions] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickInstructionsItem = (instructions) => {
    setInstructions(instructions);
    setSelectInstructions(true);
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
      case 'content': {
        return (
          <LinesEllipsis
            text={parse(value)}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        );
      };
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
    setInstructions((instructions) => {
      return { ...instructions, title: title };
    });
  }

  const handleChangeContent = event => {
    setInstructions((instructions) => {
      return { ...instructions, content: event.target.value };
    });
  }

  const handleChangeImage = event => {
    const image = event.target.files[0]
    const formData = new FormData();
    formData.append('file', image);

    axios.post(UPLOAD_FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data;boundary=---',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then(res => {
        setInstructions((instructions) => {
          return { ...instructions, image: res.data.url };
        });
        setImageMessageError('')
      })
      .catch(err => {
        setInstructions((instructions) => {
          return { ...instructions, image: "" };
        });
        setImageMessageError('Tải hình ảnh thất bại, mời thử lại!')
        setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại! ')
      });
  }

  const onSubmit = async () => {
    setLoadingModal(true);
    const data = {
      id: instructions.id,
      title: instructions.title,
      content: instructions.content,
      image: instructions.image
    };

    const response = await API.put(`${INSTRUCTIONS_ENDPOINT}`, data);
    if (response.ok) {
      const pathVariable = `category_id/` + handleInstructionsCategoryId(location.pathname);
      const res = await API.get(`${INSTRUCTIONS_ENDPOINT}/${pathVariable}`);
      if (res.ok) {
        const fetchData = await res.json();
        const data = { instructions: fetchData };
        setMessage(`Cập nhật lắp đặt thành công!`);
        setOpenSnackbar(true);
        dispatch(actGetAllSetupInstructionsByCategoryId(data));
      } else {
        if (response.status === RESPONSE_STATUS.FORBIDDEN) {
          Cookies.remove(USER_TOKEN);
          Cookies.remove(USER_DEVICE_TOKEN);
          navigate('/', { replace: true });
        }
      }
    } else {
      setMessage(`Cập nhật lắp đặt thất bại!`);
      setOpenSnackbar(true);
    }

    setLoadingModal(false);
  }

  const onClose = () => {
    setInstructions("");
    setImageMessageError("");
    setSelectInstructions(false);
  };

  return (
    <Box>
      <Box>
        <TableContainer className={classes.container}>
          <Table aria-label="sticky table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              key={1}
            />
            {(data && data.instructions.instructions && data.instructions.instructions.length) &&
              <TableBody>
                {stableSort(data.instructions.instructions, getComparator(order, orderBy)).map((instructions, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={instructions.id}
                    >
                      {columns.map((column, index) => {
                        const value = _hanleRowTableData(column.id, instructions[column.id], instructions);
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
                          onClick={() => handleClickInstructionsItem(instructions)}
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
        {(data && data.instructions.instructions && data.instructions.instructions.length) && (
          <TablePagination
            rowsPerPageOptions={[0]}
            component="div"
            count={data.instructions.instructions.length}
            rowsPerPage={10}
            page={0}
            onChangePage={() => { }}
          />
        )}
      </Box>
      <Modal open={selectInstructions}>
        <Box sx={{ marginTop: 4 }}>
          <FeatureEditor
            instructions={instructions}
            imageMessageError={imageMessageError}
            handleChangeTitle={handleChangeTitle}
            handleChangeContent={handleChangeContent}
            handleChangeImage={handleChangeImage}
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
        <Alert onClose={handleCloseSnackbar} severity='success'>
          {message}
        </Alert>
      </Snackbar>
      <Modal open={loadingModal}>
        <Loading />
      </Modal>
    </Box>
  );
};

export default SetupList;