import {Box, Typography} from '@mui/material';
import './App.scss';
import titleDrop from './assets/titleDrop.png';
import React from 'react';
import Footer from './Footer/Footer';
import LootGen from './LootGen/LootGen';


// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <Box className="App">
      <Box my={1} sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        height: '100%',
      }}>
        <Box mb={1}>
          <Box sx={{background: `url(${titleDrop})`,
            borderRadius: '5px',
            padding: '3px 5px'}}>
            <Typography variant='h4' align='center'
              sx={{color: 'primary.text'}}>
              <b>PF2 Loot Generator</b>
            </Typography>
          </Box>
        </Box>
        <LootGen />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
