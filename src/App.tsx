import React from 'react';
import './App.css';
import OverviewFlow from './OverviewFlow';
import '@fontsource/roboto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        SystemXray
      </header>
      <div className="App-content">
        <OverviewFlow />
      </div>
    </div>
  );
}

export default App;
