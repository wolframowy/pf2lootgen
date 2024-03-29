import './styles.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from '@mui/material';

const LinkWithIframe = (props) => {
  const {item} = props;
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <Link
      href={item.url} target='_blank'
      className='iframe-link'
      onMouseEnter={() => setShouldLoad(true)}>
      {item.name}
      <div className='iframe-container'>
        <iframe
          id={`${item.id}iframe`}
          src=
            {`${shouldLoad ? item.url : 'about:blank'}`}
          loading='lazy'
          className='iframe'
        />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
        <div className='wave' />
      </div>
    </Link>
  );
};

LinkWithIframe.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default LinkWithIframe;
