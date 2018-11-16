import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter} from 'react-router-dom'
import route from './route.js'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  render() {
    return (
      <HashRouter>
      <div className="App">
        {route}

      </div>
      </HashRouter>
    );
  }
}

export default App;
