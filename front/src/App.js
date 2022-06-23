import {Box} from '@mui/material';
import './App.scss';
import React from 'react';
import Footer from './Footer/Footer';
import LootGen from './LootGen/LootGen';


// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <Box className="App">
      <LootGen />
      <Footer />
    </Box>
  );
}

export default App;
