import {Box, Typography} from '@mui/material';
import './App.scss';
import React from 'react';
import Footer from './Footer/Footer';
import LootGen from './LootGen/LootGen';


// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <Box className="App">
      <Typography mx={4} mt={1} variant='h4' align='center'>
        PF2 Loot Generator
      </Typography>
      <LootGen />
      <Footer />
    </Box>
  );
}

export default App;
