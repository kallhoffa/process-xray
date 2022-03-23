import './App.css';
import Flow from './components/Flow';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import SignIn from './components/SignIn'

function App() { 

  return (
    <Box className="App">
      
      <header className="App-header">
        <Box className='app-title'
          sx={{fontSize: '36px', fontWeight: 'bold', margin: '0px 0px 0px 0px'}}>
          ProcessXray
        </Box>
        <SignIn />
      </header>
      
      <Box className="App-content"
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        
        <Flow />
      </Box>
    </Box>
  );
}

export default App;
