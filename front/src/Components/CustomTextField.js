import {TextField, styled, FormControl} from '@mui/material';

const CustomTextField = styled(TextField)(({theme}) => ({
  background: theme.palette.secondary.main,
}));

const CustomFormControl = styled(FormControl)(({theme}) => ({
  background: theme.palette.secondary.main,
}));

export {CustomTextField, CustomFormControl};

export default CustomTextField;
