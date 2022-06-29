import React from 'react';
import {itemArr} from '../commonPropTypes';
import {Link} from '@mui/material';

/**
 * @param {*} props
 * @return {object} ItemResults container
 */
function ItemResult(props) {
  const {items} = props;

  return (
    <>
      {items.length > 0 &&
            items.map(
                (item) =>
                  <div key={item.ID}>
                    <span>{item.count}x </span>
                    <Link href={item.URL} target='_blank'>{item.Title}</Link>
                    <span> {item.Lvl} </span>
                    <span>{item.Price} </span>
                    <span>{item.Rarity} </span>
                    <span>{item.Traits.length > 0 &&
                      (`[${item.Traits.map((v) => `${v}`)}]`)}</span>
                  </div>)}
    </>
  );
};

ItemResult.propTypes = {
  items: itemArr.isRequired,
};

export default ItemResult;
