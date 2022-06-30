import {styled, Grid} from '@mui/material';

const GridTitleMain = styled(Grid)(({theme}) => ({
  position: 'sticky',
  top: '-8px',
  backgroundColor: theme.palette.primary.main,
}));

const GridTitleMainLight = styled(Grid)(({theme}) => ({
  backgroundColor: theme.palette.primary.light,
}));

export {GridTitleMainLight, GridTitleMain};
export default GridTitleMain;
