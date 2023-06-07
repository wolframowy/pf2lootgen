import {Box, Typography, Paper, Container} from '@mui/material';
import './App.scss';
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
      }}>
        <Box mb={1}>
          <Paper sx={{backgroundColor: 'primary.main', padding: '3px 5px'}}>
            <Typography variant='h4' align='center'
              color='primary.contrastText'>
              <b>PF2 Loot Generator</b>
            </Typography>
          </Paper>
        </Box>
        <LootGen />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
