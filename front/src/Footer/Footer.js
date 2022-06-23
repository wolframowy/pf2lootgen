import './Footer.scss';
import React from 'react';
import {Box, Link, Paper, Typography} from '@mui/material';

/**
 * Footer container
 * @return {object} Footer container
 */
function Footer() {
  return (
    <Box px={1} pb={2}>
      <Paper>
        <Box p={1}>
          <Typography fontSize={11} paragraph variant='caption' align='justify'>
            {`This tool uses trademarks and/or copyrights owned by Paizo Inc.,
            used under Paizo's Community Use Policy`}
            <Link href="https://paizo.com/community/communityuse"> paizo.com/communityuse</Link>.
            {`We are expressly prohibited from charging you to use
            or access this content.This tool is not published, endorsed,
            or specifically approved by Paizo. For more information about
            Paizo Inc. and Paizo products, visit paizo.com.`}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Footer;
