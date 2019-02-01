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
      light: '#7953d2',
      main: '#4527a0',
      dark: '#000070',
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