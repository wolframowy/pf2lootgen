import {TextField, styled} from '@mui/material';

const CustomTextField = styled(TextField)(({theme}) => ({
  background: theme.palette.secondary.light,
}));

export default CustomTextField;
