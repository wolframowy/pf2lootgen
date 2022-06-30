import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {TextField, Select, MenuItem,
  FormControl, InputLabel} from '@mui/material';

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
      <TextField
        color="secondary"
        variant="filled"
        className='text_field'
        id='item_lvl'
        required label='Items level'
        type='number'
        value={lvl}
        onChange={handleLvlChange}
        onFocus={(event) => {
          event.target.select();
        }}
        inputProps={{style: {textAlign: 'end'}}}/>
      <TextField
        color="secondary"
        variant="filled"
        className='text_field'
        id='item_count'
        required label='Item no.'
        type='number'
        value={count}
        onChange={handleCountChange}
        onFocus={(event) => {
          event.target.select();
        }}
        inputProps={{style: {textAlign: 'end'}}}/>
      <FormControl variant="filled">
        <InputLabel id='rarity_label'>Rarity</InputLabel>
        <Select color="secondary" className='select' id="rarity"
          labelId='rarity_label' label="Rarity"
          value={rarity} onChange={handleRarityChange}>
          <MenuItem value='c'>Common</MenuItem>
          <MenuItem value='u'>Uncommon</MenuItem>
          <MenuItem value='r'>Rare</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id='rarity_label'>Type</InputLabel>
        <Select color="secondary" className='select' id="type"
          labelId='rarity_label' label="Type"
          value={type} onChange={handleTypeChange}>
          <MenuItem value='p'>Permanent</MenuItem>
          <MenuItem value='c'>Consumable</MenuItem>
        </Select>
      </FormControl>
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
