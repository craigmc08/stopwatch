import React, { Component } from 'react';

import Stopwatch from './Components/Stopwatch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stopwatch />
      </div>
    );
  }
}

export default App;
