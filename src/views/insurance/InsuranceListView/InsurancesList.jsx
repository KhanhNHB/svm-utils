import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Grid,
  Divider,
  Modal,
  Container,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import API from '../../../api/API';
import { INSURANCE_ENDPOINT } from '../../../api/endpoint';
import { useDispatch } from 'react-redux';
import SunEditor from 'suneditor-react';
import { actGetAllOnwerInsurance } from '../../../actions';
import Loading from "../../../components/Loading";
import { handleInsuranceCategoryId } from '../../../utils/handleInsuranceCategoryId';
import { useLocation } from 'react-router';

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

const InsurancesList = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setId(data.id);
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data, dispatch]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangeTitle = (title) => {
    setTitle(title);
  };

  const handleChangeContent = (content) => {
    setContent(content);
  };

  const onSubmit = async () => {
    setLoading(true);

    const body = {
      id: id,
      title: title,
      content: content
    };

    const response = await API.put(`${INSURANCE_ENDPOINT}`, body);
    if (response.ok) {

      const pathVariable = `category_id/` + handleInsuranceCategoryId(location.pathname);
      const repsonseInsurance = await API.get(`${INSURANCE_ENDPOINT}/${pathVariable}`);

      if (repsonseInsurance.ok) {
        const fetchData = await response.json();
        const data = fetchData[0];
        setMessage(`Lưu dữ liệu bảo hành thành công!`);
        setOpenSnackbar(true);
        dispatch(actGetAllOnwerInsurance(data));
      }
    } else {

      const patchData = await response.json();
      if (patchData.message) {
        setMessage(`Lưu dữ liệu bảo hành thất bại!`);
      }
    }
    setLoading(false);
  };

  return (
    <Box className={classes.boundary}>
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Box
                className={classes.text}
                sx={{ fontSize: 24, textAlign: "center" }}>
                Chính sách bảo hành
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box className={classes.text}>Tiêu đề</Box>
              <TextField
                fullWidth
                placeholder="Tiêu đề"
                name="name"
                value={title}
                onChange={e => handleChangeTitle(e.target.value)}
                variant="outlined"
                className={classes.title}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box className={classes.text}>Nội dung</Box>
              {loading
                ? <Loading />
                : <SunEditor
                  autoFocus={false}
                  height={800}
                  setContents={content}
                  onChange={handleChangeContent}
                  showToolbar={true}
                  setOptions={{
                    buttonList: [
                      [
                        'undo',
                        'redo',
                        'link',
                        'fullScreen',
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "list",
                        "align",
                        "fontSize",
                        "formatBlock",
                        "table",
                        "image"
                      ]
                    ]
                  }}
                />
              }
            </Grid>
            <Divider />
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                style={{
                  maxWidth: 160,
                  maxHeight: 40,
                  minWidth: 160,
                  minHeight: 40,
                  display: "flex",
                  textTransform: 'none',
                  background: 'linear-gradient(#00AFEC, #005FBE)'
                }}
                onClick={() => onSubmit()}
              >
                Lưu lại
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
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
    </Box>
  );
};

export default InsurancesList;