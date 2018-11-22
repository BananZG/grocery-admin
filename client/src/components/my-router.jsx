import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from './dashboard';
import ListView from './list-view';
import EditItem from './edit-item';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/listView" exact component={ListView} />
                <Route path="/editItem/:id" exact component={EditItem} />
            </Switch>
        );
    }
}

export default Router;