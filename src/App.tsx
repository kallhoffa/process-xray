import './App.css';
import Flow from './components/Flow';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import SignIn from './components/SignIn'

function App() { 

  return (
    <Box className="App">
      
      <header className="App-header">
        <div className='app-title'>ProcessXray</div>
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
