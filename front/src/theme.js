import {createTheme} from '@mui/material';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#143642',
    },
    secondary: {
      main: '#DAD2D8',
    },
    error: {
      main: '#A8201A',
    },
    warning: {
      main: '#EC9A29',
    },
    info: {
      main: '#00a3d6',
    },
    background: {
      default: '#449394',
      paper: '#DAD2D8',
    },
    custom: {
      light: '#111111',
      default: '#000000',
      dark: '#666666',
      contrastText: '#AAAAAA',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
