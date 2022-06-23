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
      default: '#0F8B8D',
      paper: '#DAD2D8',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
