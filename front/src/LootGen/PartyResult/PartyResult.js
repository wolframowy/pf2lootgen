import React from 'react';
import PropTypes from 'prop-types';
import {itemArr} from '../commonPropTypes';
import {Paper, Link, Typography} from '@mui/material';

/**
 * @param {*} props
 * @return {object} PartyResult container
 */
function PartyResult(props) {
  const {consumable, perm, currency} = props;

  return (
    <>
      <Paper>
        <Typography>Permanent Items:</Typography>
        {perm.length > 0 &&
            perm.map(
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
      <Paper>
        <Typography>Consumable Items:</Typography>
        {consumable.length > 0 &&
            consumable.map(
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
      <Paper>
        <Typography>Total Currency:</Typography>
        {currency} Gold Pieces
      </Paper>
    </>
  );
};

PartyResult.propTypes = {
  consumable: itemArr.isRequired,
  perm: itemArr.isRequired,
  currency: PropTypes.number.isRequired,
};

export default PartyResult;
