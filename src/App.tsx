import './App.css';
import Flow from './components/Flow';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import SignIn from './components/SignIn'
import { RecoilRoot } from 'recoil';
import { useState } from 'react';

function App() { 

  const [user, setUser] = useState(null)

  return (
    
    <RecoilRoot>
      <Box className="App">
        <header className="App-header">
          <Box className='app-title'
            sx={{fontSize: '36px', fontWeight: 'bold', margin: '0px 0px 0px 0px'}}>
            ProcessXray
          </Box>
          <SignIn setUser={setUser}/>
        </header>
        
        <Box className="App-content"
          sx={{
            display: 'flex',
            height: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          
          <Flow user={user}/>
        </Box>
      </Box>
    </RecoilRoot>
  );
}

export default App;
