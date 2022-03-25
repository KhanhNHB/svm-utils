import React, { useEffect, useState } from 'react';
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
  Snackbar,
  TableContainer,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../api/API';
import { host_url } from '../../../common/index';
import { actGetAllDiscountNewsByCategoryId } from '../../../actions';
import { NEWS_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import Loading from '../../../components/Loading';
import ProductNewsEditor from './ProductNewsEditor';
import { handleNewCategoryId } from '../../../utils/handleNewCategoryId';
import ProductNewModal from './Modal/ProductNewModal';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { id: 'no', label: 'No.', minWidth: 50 },
  { id: 'title', label: 'Tiêu đề', minWidth: 200 },
  { id: 'image', label: 'Hình ảnh', minWidth: 200 },
  { id: 'action', label: 'Action', minWidth: 200 },
];

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

const ProductNewList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector(state => state.news.news);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [news, setNews] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [imageMessageError, setImageMessageError] = useState("");
  const [selectNews, setSelectNews] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const pathVariable = `category_id/` + handleNewCategoryId(location.pathname);
      const response = await API.get(`${NEWS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllDiscountNewsByCategoryId(fetchData));
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const mappingDealers = (data) => {
    let dealerNew = [...data].map((item, index) => {
      return {
        no: index + 1,
        id: item.id,
        title: item.title,
        content: item.content,
        description: item.description,
        image: item.image,
        action: item.id,
        is_active: item.is_active,
        createdDate: item.createdDate
      }
    })
    return dealerNew;
  }

  const rows = mappingDealers(data);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangeTitle = title => {
    setNews((news) => {
      return { ...news, title: title };
    });
  }

  const handleChangeContent = event => {
    setNews((news) => {
      return { ...news, content: event.target.value };
    });
  }

  const handleChangeDescription = description => {
    setNews((news) => {
      return { ...news, description: description };
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
        setNews((news) => {
          return { ...news, image: res.data.url };
        });
        setImageMessageError('')
      })
      .catch(err => {
        setNews((news) => {
          return { ...news, image: "" };
        });
        setImageMessageError('Tải hình ảnh thất bại, mời thử lại!')
        setImageMessageError('Tải hình ảnh thất bại. Lỗi Network hoặc file có kích thước lớn hơn 1MB, mời thử lại! ')
      });
  }

  const handleSubmitEdit = async () => {
    setLoadingModal(true);

    const data = {
      id: news.id,
      title: news.title,
      content: news.content,
      description: news.description,
      image: news.image,
      news_category_id: handleNewCategoryId(location.pathname),
      is_active: news.is_active
    };

    const response = await API.put(`${NEWS_ENDPOINT}`, data);
    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleNewCategoryId(location.pathname);
      const response = await API.get(`${NEWS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllDiscountNewsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      setMessage(`Cập nhật tin tức thất bại!`);
      setOpenSnackbar(true);
    }

    setLoadingModal(false);
    onClose();
  }

  const onClose = () => {
    setSelectNews(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (event, news) => {
    setLoadingModal(true);

    const response = await API.delete(`${NEWS_ENDPOINT}/id/${news.id}`);
    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleNewCategoryId(location.pathname);
      const response = await API.get(`${NEWS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllDiscountNewsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      setMessage(`Ẩn tin tức thất bại!`);
      setOpenSnackbar(true);
    }

    setLoadingModal(false);
  }

  const handleCreate = async (title, content, description, image) => {

    const data = {
      title: title,
      content: content,
      description: description,
      image: image,
      news_category_id: handleNewCategoryId(location.pathname)
    };

    const response = await API.post(`${NEWS_ENDPOINT}`, data);

    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleNewCategoryId(location.pathname);
      const response = await API.get(`${NEWS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllDiscountNewsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      handleMessage(`Tạo mới tin tức thất bại!`);
      handleSnackbar();
    }

    setOpenAddModal(!openAddModal);
  };

  const handleEdit = (event, news) => {
    setNews(news);
    setSelectNews(true);
  }

  const handleAddItem = () => {
    setOpenAddModal(true);
  }

  const handleMessage = (message) => {
    setMessage(message);
  }

  const handleSnackbar = () => {
    setOpenSnackbar(true);
  }

  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleAddItem}
        startIcon={<AddIcon size={14} />}
        style={{ color: 'white' }}
      >
        Tạo tin tức
      </Button>
      <Box>
        <TableContainer className={classes.container}>
          <Table stickyHeader-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index + column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                loading
                  ? <Loading />
                  : (data && data.length &&
                    rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id + index}>
                            {columns.map((column, index) => {
                              const value = row[column.id];
                              if (column.id == 'action') {
                                return (
                                  <TableCell align={column.align} key={column.id + index + row.createdDate}>
                                    <Button onClick={(e) => { handleDelete(e, row) }} color='error'>Ẩn</Button>
                                    <Button onClick={(e) => { handleEdit(e, row) }} color='success'>Sửa</Button>
                                  </TableCell>
                                );
                              } if (column.id == 'image') {
                                return (
                                  <TableCell align={column.align} key={column.id + index + row.createdDate}>
                                    <img src={host_url + value} style={{ maxWidth: '150px' }} />
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell align={column.align} key={column.id + index + row.createdDate}>
                                    {value}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        );
                      })
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          data && data.length && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )
        }
      </Box>

      <Modal open={selectNews}>
        <Box>
          <ProductNewsEditor
            news={news}
            imageMessageError={imageMessageError}
            handleChangeTitle={handleChangeTitle}
            handleChangeContent={handleChangeContent}
            handleChangeDescription={handleChangeDescription}
            handleChangeImage={handleChangeImage}
            onSubmit={handleSubmitEdit}
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
      <Modal open={loadingModal} sx={{ margin: "auto" }}>
        <Loading />
      </Modal>
      <Modal open={openAddModal}>
        <ProductNewModal
          handleMessage={handleMessage}
          handleSnackbar={handleSnackbar}
          onSubmit={handleCreate}
          onClose={() => setOpenAddModal(!openAddModal)}
        />
      </Modal>
    </Box>
  );
};

export default ProductNewList;