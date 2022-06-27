import React from 'react';
import PropTypes from 'prop-types';
import {itemArr} from '../commonPropTypes';
import {Paper} from '@mui/material';

/**
 * @param {*} props
 * @return {object} PartyResult container
 */
function PartyResult(props) {
  const {consumable, perm, currency} = props;

  return (
    <>
      <Paper>
        {perm.length > 0 &&
            perm.map(
                (item) =>
                  <div key={item['ID']}>
                    {JSON.stringify(item)}
                  </div>)}
      </Paper>
      <Paper>
        {consumable.length > 0 &&
            consumable.map(
                (item) =>
                  <div key={item['ID']}>
                    {JSON.stringify(item)}
                  </div>)}
      </Paper>
      <Paper>
        {currency}
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
