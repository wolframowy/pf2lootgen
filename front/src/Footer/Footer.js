import './Footer.scss';
import React from 'react';
import {Box, Link, Paper, Typography} from '@mui/material';

/**
 * Footer container
 * @return {object} Footer container
 */
function Footer() {
  return (
    <Box mx={1} mb={1} className='Footer'>
      <Paper sx={{position: 'relative'}}>
        <Box p={1}>
          <Typography fontSize={11} paragraph
            m={0} variant='caption' align='justify'>
            {`This tool uses trademarks and/or copyrights owned by Paizo Inc.,
            used under Paizo's Community Use Policy`}
            <Link href="https://paizo.com/community/communityuse"> paizo.com/communityuse</Link>.
            {`We are expressly prohibited from charging you to use
            or access this content.This tool is not published, endorsed,
            or specifically approved by Paizo. For more information about
            Paizo Inc. and Paizo products, visit paizo.com.`}
          </Typography>
        </Box>
        <div style={{textAlign: 'right',
          position: 'absolute', bottom: '2px', right: '2px'}}>
          <Typography fontSize={10}>
            v{process.env.REACT_APP_VERSION}
          </Typography>
        </div>
      </Paper>
    </Box>
  );
}

export default Footer;
