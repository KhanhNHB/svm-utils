import React from 'react';
import {
  Grid,
  Box
} from '@mui/material';
import FeatureList from './FeatureList';
import { makeStyles } from '@mui/styles';

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


const Copyright = () => {
  return (
    <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
      {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
    </p>
  );
}

const FeatureView = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Manrope, sans-serif",
            textAlign: "center"
          }}>
            Hướng Dẫn Tính Năng
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FeatureList />
        </Grid>
        <Grid item xs={12}>
          <Copyright sx={{ pt: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeatureView;