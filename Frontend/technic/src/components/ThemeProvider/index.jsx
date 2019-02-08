import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c',
    },
    secondary: {
      main: '#eee',
    }
  }
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;