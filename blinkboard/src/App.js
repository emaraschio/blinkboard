import React, { Component } from 'react'
import './App.css'
import BlinksContainer from './components/BlinksContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Blink Board</h1>
        </div>
        <BlinksContainer />
      </div>
    );
  }
}

export default App