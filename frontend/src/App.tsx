import React from 'react';
import { FileManager } from './components/FileManager'; 

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>File Manager</h1>
      </header>
      <main>
        <FileManager />
      </main>
    </div>
  );
}

export default App;
