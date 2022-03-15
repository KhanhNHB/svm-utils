import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../../api/API';
import {
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
  ADMIN_ENDPOINT,
  HUB_MANAGER_ENDPOINT
} from '../../api/endpoint';
import { useDispatch } from 'react-redux';
import { actLoadProfile, actSignIn } from '../../actions';
import Cookies from 'js-cookie';
import { ROLE, USER_DEVICE_TOKEN, USER_TOKEN } from '../../common';
import Footer from '../../components/Footer';
// import { messaging } from '../../init-fcm';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   },
//   formControl: {
//     width: '100%'
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

function Copyright(props) {
  return (
    <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
      {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
    </p>
  );
}

const theme = createTheme();

const LoginView = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const readCookie = async () => {
      const user = Cookies.get(USER_TOKEN);

      // if (user) {
      //   const response = await API.post(`${PROFILE_ENDPOINT}`, {
      //     "access_token": user
      //   });

      //   if (response.ok) {
      //     const fetchData = await response.json();
      //     dispatch(actLoadProfile(fetchData.data));
      //     navigate('/app/san-pham', { replace: true });
      //   }
      // }
      navigate('/app', { replace: true });
    };

    // readCookie();

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

    // dispatch(actLoadProfile(json.username));
    setIsLoading(false);

    Cookies.set(USER_TOKEN, json.token);
    // dispatch(actSignIn(json.token));
    navigate('/app', { replace: true });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            alt="Logo"
            src="/logo.png"
            sx={{
              borderRadius: 4
            }}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
            <Grid container>
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
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginView;

{/* <Container>
        <Page className={classes.root} title="Login">
          <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Container maxWidth="sm">
              <Box mb={2}>
                <img style={{ height: 200, width: 200, marginLeft: 170, borderRadius: 5 }} src="/logo.png" alt="Logo" />
              </Box>
              <TextField
                placeholder="Tên người dùng"
                fullWidth
                margin="normal"
                name="username"
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
                variant="outlined"
              />
              <TextField
                placeholder="Mật khẩu"
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
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  disabled={isLoading}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={() => signIn(username, password)}
                  style={{
                    color: "white",
                    maxHeight: 50,
                    minHeight: 50,
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Manrope, sans-serif",
                    textTransform: 'none',
                    background: 'linear-gradient(#00AFEC, #005FBE)'
                  }}
                >
                  {
                    isLoading
                      ? <CircularProgress size={26} />
                      : 'Đăng nhập'
                  }
                </Button>
              </Box>
            </Container>
          </Box>
        </Page>
      </Container> */}
