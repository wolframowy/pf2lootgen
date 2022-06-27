import PropTypes from 'prop-types';

const itemArr = PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number,
      Lvl: PropTypes.number,
      Price: PropTypes.number,
      Rarity: PropTypes.string,
      Title: PropTypes.string,
      Traits: PropTypes.arrayOf(PropTypes.string),
      URL: PropTypes.string,
      count: PropTypes.number,
    }),
);

export {itemArr};
