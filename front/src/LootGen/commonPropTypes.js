import PropTypes from 'prop-types';

const itemArr = PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      level: PropTypes.number,
      price: PropTypes.number,
      rarity: PropTypes.string,
      name: PropTypes.string,
      trait_raw: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      count: PropTypes.number,
    }),
);

export {itemArr};
