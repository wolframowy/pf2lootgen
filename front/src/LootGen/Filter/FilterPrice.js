import './../LootGen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem,
  InputLabel, Divider} from '@mui/material';
import {CustomTextField,
  CustomFormControl} from '../../Components/CustomTextField';
import {MIN_PRICE, MIN_COUNT} from '../../util/constants';

/**
 * FilterPrice component containing filters for item search
 * @param {*} props
 * @return {object} FilterItem component
 */
function FilterPrice(props) {
  const {
    price,
    handlePriceChange,
    offset,
    handleOffsetChange,
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
        id='price'
        required label='Price'
        type='number'
        value={price || ''}
        onChange={handlePriceChange}
        onFocus={(event) => {
          event.target.select();
        }}
        onBlur={() => handlePriceChange({target: {value: price || MIN_PRICE}})}
        sx={{
          borderRadius: '5px 0 0 5px',
        }}
        inputProps={{style: {textAlign: 'center'}}}/>
      <Divider orientation='vertical'/>
      <CustomTextField
        variant="filled"
        className='text_field'
        id='offset'
        required label='Price offset'
        type='number'
        value={offset}
        onChange={handleOffsetChange}
        onFocus={(event) => {
          event.target.select();
        }}
        onBlur={() =>
          handleOffsetChange({target: {value: offset || MIN_PRICE}})}
        inputProps={{style: {textAlign: 'center'}}}/>
      <Divider orientation='vertical'/>
      <CustomTextField
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

FilterPrice.propTypes = {
  price: PropTypes.number,
  handlePriceChange: PropTypes.func,
  offset: PropTypes.number,
  handleOffsetChange: PropTypes.func,
  count: PropTypes.number,
  handleCountChange: PropTypes.func,
  rarity: PropTypes.string,
  handleRarityChange: PropTypes.func,
  type: PropTypes.string,
  handleTypeChange: PropTypes.func,
};

export default FilterPrice;
