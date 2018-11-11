import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
      fontSize: 16
    },
    background: {
      default: '#ffffff',
    },
    primary: {
      light: '#33a2ef',
      main: '#eee',
      dark: '#0065b1',
    },
  }
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;