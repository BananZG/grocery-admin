import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect, Prompt } from "react-router-dom";
import Dashboard from './dashboard';
import ListView from './list-view';

class Router extends Component {
    render() {
        return (
            <switch>
                <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/listView" exact component={ListView} />
            </switch>
        );
    }
}

export default Router;