import './App.css'
import Footer from './Footer/Footer'
import LootGen from './LootGen/LootGen'
import {Box} from '@material-ui/core'



function App() {
  return (
    <Box className="App">
      <Box className="Main">
        <LootGen />
      </Box>
      <Box className="Footer">
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
