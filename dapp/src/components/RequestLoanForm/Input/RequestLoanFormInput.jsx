import React, { Component } from "react";

export default class RequestLoanFormInput extends Component {
    render() {
        const { label, name, value, handleInputChange, disabled } = this.props;

        return (
            <div className="form-group">
                <label className="form-label">{label}</label>
                <input
                    className="form-control"
                    name={name}
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
            </div>
        );
    }
}
