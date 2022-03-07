import { colors } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: "#15305A"
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: "#15305A",
      secondary: "#15305A"
    }
  },
  shadows,
  typography
});

export default theme;
