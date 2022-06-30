import {styled, Typography} from '@mui/material';

const TypographyTitleCell = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

export default TypographyTitleCell;
