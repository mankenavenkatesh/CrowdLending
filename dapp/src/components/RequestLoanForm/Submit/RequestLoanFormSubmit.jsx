import React, { Component } from "react";

export default class RequestLoanFormSubmit extends Component {
    render() {
        const { disabled } = this.props;

        return (
            <div className="request-form-group">
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary request-form-submit"
                    disabled={disabled}
                />
            </div>
        );
    }
}
