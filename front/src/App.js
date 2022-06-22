import './App.css';
import Footer from './Footer/Footer';
import LootGen from './LootGen/LootGen';
import { Box } from '@mui/material';



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

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
