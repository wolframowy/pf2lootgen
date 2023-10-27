import './Footer.scss';
import React, {useState} from 'react';
import {Box, Button, IconButton, Link, Paper, Typography} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Footer container
 * @return {object} Footer container
 */
function Footer() {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <Box sx={{position: 'relative'}}>
      <IconButton color='secondary' size='small'
        sx={{position: 'absolute', top: '-40px', p: 0}}
        onClick={() => setIsHidden(!isHidden)}>
        {isHidden ?
          <KeyboardArrowUpIcon sx={{fontSize: 40}}/> :
          <KeyboardArrowDownIcon sx={{fontSize: 40}}/>}
      </IconButton>
      <Paper className={`Footer ${isHidden && 'hidden'}`}
        square sx={{position: 'relative'}}>
        {!isHidden && <Box p={1}>
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
        </Box>}
      </Paper>
      <div style={{textAlign: 'right',
        position: 'absolute', bottom: '2px', right: '2px'}}>
        <Paper square sx={{p: '1px'}} elevation={0}>
          <Typography fontSize={10}>
              v{process.env.REACT_APP_VERSION}
          </Typography>
        </Paper>
      </div>
    </Box>
  );
}

export default Footer;
