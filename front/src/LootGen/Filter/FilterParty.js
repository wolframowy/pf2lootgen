import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem, InputLabel} from '@mui/material';
import {CustomTextField,
  CustomFormControl} from '../../Components/CustomTextField';

/**
 * FilterParty component containing filters for party loot generation
 * @param {*} props
 * @return {object} FilterParty component
 */
function FilterParty(props) {
  const {
    lvl,
    handleLvlChange,
    size,
    handleSizeChange,
    rarity,
    handleRarityChange,
  } = props;

  return (
    <>
      <CustomTextField
        variant='filled'
        className='text_field'
        id='pt_lvl'
        required label='Party level'
        type='number'
        value={lvl}
        onChange={handleLvlChange}
        onFocus={(event) => {
          event.target.select();
        }}
        sx={{
          borderRadius: '5px 0 0 5px',
        }}
        inputProps={{style: {textAlign: 'center'}}}/>
      <CustomTextField
        variant="filled"
        className='text_field'
        id='pt_size'
        required label='Party size'
        type='number'
        value={size}
        onChange={handleSizeChange}
        onFocus={(event) => {
          event.target.select();
        }}
        inputProps={{style: {textAlign: 'center'}}}/>
      <CustomFormControl
        variant="filled"
        sx={{
          'borderRadius': '0 5px 5px 0',
          '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
            '&:hover fieldset': {
              borderColor: 'yellow',
            },
          },
        }}>
        <InputLabel id='rarity_label'>Max rarity</InputLabel>
        <Select className='select' id="rarity"
          labelId='rarity_label' label="Max rarity"
          value={rarity} onChange={handleRarityChange}>
          <MenuItem value='c'>Common</MenuItem>
          <MenuItem value='u'>Uncommon</MenuItem>
          <MenuItem value='r'>Rare</MenuItem>
        </Select>
      </CustomFormControl>
    </>
  );
};

FilterParty.propTypes = {
  lvl: PropTypes.number,
  size: PropTypes.number,
  rarity: PropTypes.string,
  handleSizeChange: PropTypes.func,
  handleLvlChange: PropTypes.func,
  handleRarityChange: PropTypes.func,
};

export default FilterParty;
