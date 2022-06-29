import './PartyResult.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {itemArr} from '../commonPropTypes';
import {Paper, Link, Typography, Box} from '@mui/material';

const sectionBoxProps = {
  py: 1,
};

/**
 * @param {*} props
 * @return {object} PartyResult container
 */
function PartyResult(props) {
  const {consumable, perm, currency} = props;

  return (
    <>
      {perm.length > 0 && (
        <Box {...sectionBoxProps}>
          <Paper>
            <Typography>Permanent Items:</Typography>
            <Box className='permResult'>
              <Box className='row'>
                <Box xs={1}>Count</Box>
                <Box xs={3}>Name</Box>
                <Box xs={1}>Level</Box>
                <Box xs={1}>Price</Box>
                <Box xs={2}>Rarity</Box>
                <Box xs={4}>Traits</Box>
              </Box>
            </Box>
            {perm.map(
                (item) =>
                  <div key={item['ID']}>
                    <span>{item.count}x </span>
                    <Link href={item.URL} target='_blank'>{item.Title}</Link>
                    <span> {item.Lvl} </span>
                    <span>{item.Price} </span>
                    <span>{item.Rarity} </span>
                    <span>{item.Traits.length > 0 &&
                      (`[${item.Traits.map((v) => `${v}`)}]`)}</span>
                  </div>)}
          </Paper>
        </Box>
      )}
      {consumable.length > 0 && (
        <Box {...sectionBoxProps}>
          <Paper>
            <Typography>Consumable Items:</Typography>
            {consumable.map(
                (item) =>
                  <div key={item['ID']}>
                    <span>{item.count}x </span>
                    <Link href={item.URL} target='_blank'>{item.Title}</Link>
                    <span> {item.Lvl} </span>
                    <span>{item.Price} </span>
                    <span>{item.Rarity} </span>
                    <span>{item.Traits.length > 0 &&
                      (`[${item.Traits.map((v) => `${v}`)}]`)}</span>
                  </div>)}
          </Paper>
        </Box>
      )}
      {currency > 0 && (
        <Box {...sectionBoxProps}>
          <Paper>
            <Typography>Total Currency:</Typography>
            {currency} Gold Pieces
          </Paper>
        </Box>
      )}
    </>
  );
};

PartyResult.propTypes = {
  consumable: itemArr.isRequired,
  perm: itemArr.isRequired,
  currency: PropTypes.number.isRequired,
};

export default PartyResult;
