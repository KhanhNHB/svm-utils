import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Box, TextField, CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../../api/API';
import { LOGIN_ENDPOINT } from '../../api/endpoint';
import { useDispatch } from 'react-redux';
import { actLoadProfile, actSignIn } from '../../actions';
import Cookies from 'js-cookie';
import { USER_TOKEN } from '../../common';

const theme = createTheme();

const LoginView = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Cookies.remove(USER_TOKEN);
  }, [dispatch, navigate]);

  const signIn = async (event, username, password) => {
    event.preventDefault();

    if (!username) {
      alert('Vui lòng nhập tên người dùng');
      return;
    }
    if (!password) {
      alert('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);

    const dataBody = {
      username: username,
      password: password,
      rememberMeFlg: false
    };

    const response = await API.post(LOGIN_ENDPOINT, dataBody);
    const json = await response.json();

    if (json.message) {
      setIsLoading(false);
      alert(json.message);
      return;
    }

    dispatch(actLoadProfile(json.username));
    setIsLoading(false);

    Cookies.set(USER_TOKEN, json.token);
    dispatch(actSignIn(json.token));
    navigate('/app', { replace: true });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            alt="Logo"
            src="/logo.png"
          />
          <Box component="form" onSubmit={(event) => signIn(event, username, password)} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              name="username"
              label="Tên người dùng"
              onChange={event => {
                const { value } = event.target;
                setUsername(value);
              }}
              style={{
                backgroundColor: 'white',
                border: 'hidden'
              }}
              type="text"
              value={username}
            />
            <TextField
              label="Mật khẩu"
              fullWidth
              margin="normal"
              name="password"
              onChange={event => {
                const { value } = event.target;
                setPassword(value);
              }}
              style={{
                backgroundColor: 'white',
                border: 'hidden'
              }}
              type="password"
              value={password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                maxWidth: "100%",
                maxHeight: 40,
                minWidth: "100%",
                minHeight: 40,
                display: "flex",
                textTransform: 'none',
                background: 'linear-gradient(#00AFEC, #005FBE)'
              }}
            >
              Đăng nhập
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginView;