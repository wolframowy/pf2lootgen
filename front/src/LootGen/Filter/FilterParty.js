import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem, InputLabel, Paper, Divider} from '@mui/material';
import {CustomTextField,
  CustomFormControl} from '../../Components/CustomTextField';
import {MIN_LEVEL, MIN_PT_SIZE} from '../../util/constants';

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
        value={lvl || ''}
        onChange={handleLvlChange}
        onFocus={(event) => {
          event.target.select();
        }}
        onBlur={() => handleLvlChange({target: {value: lvl || MIN_LEVEL}})}
        sx={{
          borderRadius: '5px 0 0 5px',
        }}
        inputProps={{style: {textAlign: 'center'}}}/>
      <Divider orientation='vertical'/>
      <CustomTextField
        variant="filled"
        className='text_field'
        id='pt_size'
        required label='Party size'
        type='number'
        value={size || ''}
        onChange={handleSizeChange}
        onFocus={(event) => {
          event.target.select();
        }}
        onBlur={() => handleSizeChange({target: {value: size || MIN_PT_SIZE}})}
        inputProps={{style: {textAlign: 'center'}}}/>
      <Divider orientation='vertical'/>
      <CustomFormControl
        variant="filled"
        sx={{
          'borderRadius': '0 5px 5px 0',
        }}>
        <InputLabel id='rarity_label'>Max rarity</InputLabel>
        <Select className='select' id="rarity"
          labelId='rarity_label' label="Max rarity"
          value={rarity} onChange={handleRarityChange}>
          <MenuItem value='r'>Rare</MenuItem>
          <MenuItem value='u'>Uncommon</MenuItem>
          <MenuItem value='c'>Common</MenuItem>
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
