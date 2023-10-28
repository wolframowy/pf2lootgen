import {experimental_extendTheme as extendTheme} from '@mui/material/styles';

const themeOptions = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#282c35',
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
          main: '#066380',
        },
        background: {
          default: '#888989',
          paper: '#DAD2D8',
        },
        custom: {
          light: '#111111',
          default: '#000000',
          dark: '#1c1817',
          contrastText: '#AAAAAA',
        },
      },
    },
  },
};

const theme = extendTheme(themeOptions);

export default theme;
