import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;