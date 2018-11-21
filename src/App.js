import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect, Prompt } from "react-router-dom";

const Home1 = () => {
  return (
    <div>
      <h1>Welcome Home</h1>
    </div>
  )
}
const User = (props) => {
  return (
    <div>
      <h3>props: {JSON.stringify(props, null, 4)}</h3>
      <h1>Welcome User</h1>
    </div>
  )
}
const UserWifName = ({ match }) => {
  return (
    <div>
      <h1>Welcome User {match.params.username}</h1>
    </div>
  )
}

class App extends Component {

  state = {
    loggedIn: false
  }
  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn:!prevState.loggedIn
    }));
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user">user</Link>
            </li>
            <li>
              <Link to="/user/John">user John</Link>
            </li>
            <li>
              <Link to="/user/Mark">user Mark</Link>
            </li>
          </ul>
          <Prompt when={this.state.loggedIn} message={(location)=> {
            return location.pathname.startsWith('/user')?"Do you want to switch user?":true;
          }}/>
          <input type="button" value={!this.state.loggedIn?"login":"logout"} onClick={this.loginHandle.bind(this)}/>
          <Route path="/" exact render={Home1}></Route>
          <Route path="/user" exact component={props => <User {...props} />} />
          <Route path="/user/:username" exact strict component={({match})=>(
            this.state.loggedIn ? (<UserWifName match={match}/>) : (<Redirect to="/"/>)
          )} />
        </div>
      </BrowserRouter >
    )
  }
}

export default App;