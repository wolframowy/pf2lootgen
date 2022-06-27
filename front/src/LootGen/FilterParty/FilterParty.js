import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {TextField, Select, MenuItem,
  FormControl, InputLabel} from '@mui/material';

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
      <TextField
        color='secondary'
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
        inputProps={{style: {textAlign: 'end'}}}/>
      <TextField
        color="secondary"
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
        inputProps={{style: {textAlign: 'end'}}}/>
      <FormControl variant="filled">
        <InputLabel id='rarity_label'>Max rarity</InputLabel>
        <Select color="secondary" className='select' id="rarity"
          labelId='rarity_label' label="Max rarity"
          value={rarity} onChange={handleRarityChange}>
          <MenuItem value='c'>Common</MenuItem>
          <MenuItem value='u'>Uncommon</MenuItem>
          <MenuItem value='r'>Rare</MenuItem>
        </Select>
      </FormControl>
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
