import {TextField, styled, FormControl} from '@mui/material';

const CustomTextField = styled(TextField)(({theme}) => ({
  'background': theme.palette.secondary.main,
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textField',
  },
}));

const CustomFormControl = styled(FormControl)(({theme}) => ({
  background: theme.palette.secondary.main,
}));

export {CustomTextField, CustomFormControl};

export default CustomTextField;
