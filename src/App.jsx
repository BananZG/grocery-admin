import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppBar from "./components/appbar";
import Router from "./components/my-router";
import './index.css';

class App extends Component {

  state = {
    loggedIn: false
  }
  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  }
  render() {
    return (
      <BrowserRouter>
        <div className="mainApp">
          <AppBar />
          <Router />
        </div>
      </BrowserRouter >
    )
  }
}

export default App;