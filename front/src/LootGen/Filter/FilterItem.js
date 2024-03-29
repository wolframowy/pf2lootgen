import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem,
  InputLabel, Divider} from '@mui/material';
import {CustomTextField,
  CustomFormControl} from '../../Components/CustomTextField';
import {MIN_COUNT, MIN_LEVEL} from '../../util/constants';

/**
 * FilterItem component containing filters for item search
 * @param {*} props
 * @return {object} FilterItem component
 */
function FilterItem(props) {
  const {
    lvl,
    handleLvlChange,
    count,
    handleCountChange,
    rarity,
    handleRarityChange,
    type,
    handleTypeChange,
  } = props;

  return (
    <>
      <CustomTextField
        variant="filled"
        className='text_field'
        id='item_lvl'
        required label='Items level'
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
        id='item_count'
        required label='Item no.'
        type='number'
        value={count || ''}
        onChange={handleCountChange}
        onFocus={(event) => {
          event.target.select();
        }}
        onBlur={() => handleCountChange({target: {value: count || MIN_COUNT}})}
        inputProps={{style: {textAlign: 'center'}}}/>
      <Divider orientation='vertical'/>
      <CustomFormControl variant="filled">
        <InputLabel id='rarity_label'>Rarity</InputLabel>
        <Select color="secondary" className='select' id="rarity"
          labelId='rarity_label' label="Rarity"
          value={rarity} onChange={handleRarityChange}>
          <MenuItem value='r'>Rare</MenuItem>
          <MenuItem value='u'>Uncommon</MenuItem>
          <MenuItem value='c'>Common</MenuItem>
        </Select>
      </CustomFormControl>
      <Divider orientation='vertical'/>
      <CustomFormControl
        variant="filled"
        sx={{
          'borderRadius': '0 5px 5px 0',
        }}>
        <InputLabel id='rarity_label'>Type</InputLabel>
        <Select color="secondary" className='select' id="type"
          labelId='rarity_label' label="Type"
          value={type} onChange={handleTypeChange}>
          <MenuItem value='p'>Permanent</MenuItem>
          <MenuItem value='c'>Consumable</MenuItem>
        </Select>
      </CustomFormControl>
    </>
  );
};

FilterItem.propTypes = {
  lvl: PropTypes.number,
  handleLvlChange: PropTypes.func,
  count: PropTypes.number,
  handleCountChange: PropTypes.func,
  rarity: PropTypes.string,
  handleRarityChange: PropTypes.func,
  type: PropTypes.string,
  handleTypeChange: PropTypes.func,
};

export default FilterItem;
