import React, { Component } from "react";

export default class ErrorPage extends Component {
    render() {
        return (
            <div>
                <h1> ERROR : {this.props.error.message}</h1>
                <p> {this.props.error.stack} </p>
            </div>
        );
    }
}