import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@mui/material';

const LinkWithIframe = (props) => {
  const {item} = props;

  return (
    <Link
      href={item.url} target='_blank'
      className='iframe-link'>
      {item.name}
      <div className='iframe-container'>
        <iframe
          id={`${item.id}iframe`}
          src=
            {`${item.url}#ctl00_RadDrawer1_Content_MainContent_Header`}
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
