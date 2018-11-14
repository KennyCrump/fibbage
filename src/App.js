import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './api';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      timestamp: 'no timestamp yet'
    }
    subscribeToTimer(1000, (err, timestamp) => {
      this.setState({timestamp})
    })
  }
  render() {
    return (
      <div className="App">
        <p>this is the timer value: {this.state.timestamp}</p>
      </div>
    );
  }
}

export default App;
