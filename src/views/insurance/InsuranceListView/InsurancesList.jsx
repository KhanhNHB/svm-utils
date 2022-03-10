import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Button,
  Snackbar,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import API from '../../../api/API';
import { INSURANCE_ENDPOINT } from '../../../api/endpoint';
import { useDispatch } from 'react-redux';
import SunEditor from 'suneditor-react';
import { actGetAllInsurance } from '../../../actions';
import Loading from "../../../components/Loading";

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
  const [messageSuccess, setMessageSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.content && data.content.length) {
      setId(data.content[0].id);
      setTitle(data.content[0].title);
      setContent(data.content[0].content);
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
      const repsonseInsurance = await API.get(`${INSURANCE_ENDPOINT}/all?page=0&size=100`);
      if (repsonseInsurance.ok) {
        const fetchData = await response.json();
        const data = { content: fetchData.content, totalPages: fetchData.totalPages };
        setMessageSuccess(`Lưu dữ liệu bảo hành thành công!`);
        setOpenSnackbar(true);
        dispatch(actGetAllInsurance(data));
      }
    } else {
      const patchData = await response.json();
      if (patchData.message) {
        alert(patchData.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className={classes.boundary}>
      <Card className={clsx(classes.root)} >
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Box
                className={classes.text}
                sx={{ fontSize: 24, textAlign: "center" }}>
                Bảo Hành
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box className={classes.text}>Tiêu đề</Box>
              {loading
                ? <Loading />
                :
                <SunEditor
                  autoFocus={false}
                  height={200}
                  setContents={title}
                  onChange={handleChangeTitle}
                  showToolbar={true}
                  setOptions={{
                    buttonList: [
                      [
                        'fullScreen',
                        "bold",
                        "underline",
                        "italic",
                        "align",
                        "fontSize",
                        "formatBlock"
                      ]
                    ]
                  }}
                />
              }
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
      </Card>
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
          {messageSuccess}
        </Alert>
      </Snackbar>
    </div >
  );
};

InsurancesList.propTypes = {
  className: PropTypes.string,
  insurances: PropTypes.array.isRequired
};

export default InsurancesList;