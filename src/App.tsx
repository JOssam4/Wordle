import React from 'react';
import Main from './Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Main numLetters={5} numGuesses={6} />
    </div>
  );
}

export default App;
