import {styled, Grid} from '@mui/material';

const GridTitleMain = styled(Grid)(({theme}) => ({
  position: 'sticky',
  top: '-8px',
  backgroundColor: theme.palette.primary.main,
}));

const GridTitleMainLight = styled(Grid)(({theme}) => ({
  backgroundColor: theme.palette.primary.light,
}));

const GridRow = styled(Grid)(({theme}) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.background.default,
  alignItems: 'center',
  paddingTop: '4px',
  paddingBottom: '4px',
}));

export {GridTitleMainLight, GridRow, GridTitleMain};
export default GridTitleMain;
