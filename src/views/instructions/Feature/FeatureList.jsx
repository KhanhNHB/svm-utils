import React, { useEffect, useState, forwardRef } from 'react';
import {
  Box,
  Alert,
  Modal,
  Snackbar,
  Button,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API from '../../../api/API';
import { host_url } from '../../../common/index';
import { actGetAllFeatureInstructionsByCategoryId } from '../../../actions';
import { INSTRUCTIONS_ENDPOINT, UPLOAD_FILE } from '../../../api/endpoint';
import Loading from '../../../components/Loading';
import { handleInstructionsCategoryId } from '../../../utils/handleInstructionsCategoryId';
import FeatureEditor from './FeatureEditor';
import FeatureModal from './Modal/FeatureModal';
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
import DeleteIcon from "@material-ui/icons/Delete";

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

const FeatureList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(state => state.instructions.instructions);
  const [instructions, setInstructions] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [imageMessageError, setImageMessageError] = useState("");
  const [selectInstructions, setSelectInstructions] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const pathVariable = `category_id/` + handleInstructionsCategoryId(location.pathname);
      const response = await API.get(`${INSTRUCTIONS_ENDPOINT}/all/${pathVariable}`);

      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllFeatureInstructionsByCategoryId(fetchData));
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
    setInstructions((instructions) => {
      return { ...instructions, title: title };
    });
  }

  const handleChangeContent = event => {
    setInstructions((instructions) => {
      return { ...instructions, content: event.target.value };
    });
  }

  const handleChangeDescription = description => {
    setInstructions((instructions) => {
      return { ...instructions, description: description };
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

  const handleSubmitEdit = async () => {
    setLoadingModal(true);

    const data = {
      id: instructions.id,
      title: instructions.title,
      content: instructions.content,
      description: instructions.description,
      image: instructions.image,
      instructions_category_id: handleInstructionsCategoryId(location.pathname),
      is_active: instructions.is_active
    };

    const response = await API.put(`${INSTRUCTIONS_ENDPOINT}`, data);
    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleInstructionsCategoryId(location.pathname);
      const response = await API.get(`${INSTRUCTIONS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllFeatureInstructionsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      setMessage(`Cập nhật hướng dẫn thất bại!`);
      setOpenSnackbar(true);
    }

    setLoadingModal(false);
    onClose();
  }

  const onClose = () => {
    setSelectInstructions(false);
  };

  const handleDelete = async (event, instructions) => {
    setLoadingModal(true);

    const response = await API.delete(`${INSTRUCTIONS_ENDPOINT}/id/${instructions.id}`);
    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleInstructionsCategoryId(location.pathname);
      const response = await API.get(`${INSTRUCTIONS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllFeatureInstructionsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      setMessage(`Ẩn hướng dẫn thất bại!`);
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
      instructions_category_id: handleInstructionsCategoryId(location.pathname)
    };

    const response = await API.post(`${INSTRUCTIONS_ENDPOINT}`, data);

    if (response.ok) {
      setLoading(true);

      const pathVariable = `category_id/` + handleInstructionsCategoryId(location.pathname);
      const response = await API.get(`${INSTRUCTIONS_ENDPOINT}/all/${pathVariable}`);
      if (response.ok) {
        const fetchData = await response.json();
        dispatch(actGetAllFeatureInstructionsByCategoryId(fetchData));
      }

      setLoading(false);
    } else {
      handleMessage(`Tạo mới hướng dẫn thất bại!`);
      handleSnackbar();
    }

    setOpenAddModal(!openAddModal);
  };

  const handleEdit = (event, instructions) => {
    setInstructions(instructions);
    setSelectInstructions(true);
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
        Tạo hướng dẫn
      </Button>
      <Box sx={{ height: 800 }}>
        <MaterialTable
          columns={[
            { id: 'no', title: 'No.', field: "no" },
            { id: 'title', title: 'Tiêu đề', align: "left", field: "title" },
            {
              id: 'image',
              title: 'Hình ảnh',
              render: rowData => {
                return <img src={host_url + rowData.image} style={{ maxWidth: '100px' }} />
              }
            },
            {
              id: "actions",
              title: "Actions",
              render: rowData => {
                return (
                  <div>
                    <IconButton
                      aria-label="edit"
                      onClick={(e) => { handleEdit(e, rowData) }} color='error'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => { handleDelete(e, rowData) }} color='success'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                );
              }
            }
          ]}
          data={rows}
          title="Danh sách tin tức"
          icons={tableIcons}
          options={{ sorting: true }}
        />
      </Box>

      <Modal open={selectInstructions}>
        <Box>
          <FeatureEditor
            instructions={instructions}
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
        <FeatureModal
          handleMessage={handleMessage}
          handleSnackbar={handleSnackbar}
          onSubmit={handleCreate}
          onClose={() => setOpenAddModal(!openAddModal)}
        />
      </Modal>
    </Box>
  );
};

export default FeatureList;