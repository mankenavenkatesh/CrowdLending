import React, { Component } from "react";

import "./Button.css";

export class Button extends Component {
    render() {
        const { disabled, label, onClick } = this.props;

        return (
            <div className="button btn btn-primary" disabled={disabled} onClick={onClick}>
                {label}
            </div>
        );
    }
}
