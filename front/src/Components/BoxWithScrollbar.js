import {styled, Box} from '@mui/material';

const BoxWithScrollbar = styled(Box)(({theme}) => ({
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  /* Track */
  '&::-webkit-scrollbar-track': {
    background: theme.palette.secondary.main,
    borderRadius: '2px',
  },
  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.light,
    borderRadius: '2px',
  },
  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.main,
  },
}));

export default BoxWithScrollbar;
