import React, { Component } from "react";

import RequestLoanFormInput from "./Input/RequestLoanFormInput";
import RequestLoanFormSubmit from "./Submit/RequestLoanFormSubmit";

import "./RequestLoanForm.css";

export class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            collateral: 0,
            interestRate: 0,
            termLength: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await this.props.createLoanRequest(this.state);
    }

    render() {
        const { disableForm } = this.props;
        const { principal, collateral, termLength, interestRate } = this.state;

        return (
            <form className="request-form" onSubmit={this.handleSubmit}>
                <RequestLoanFormInput
                    label="Principal Amount (WETH)"
                    name="principal"
                    value={principal}
                    disabled={disableForm}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Collateral Amount (REP)"
                    name="collateral"
                    value={collateral}
                    disabled={disableForm}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Interest Rate (as a %)"
                    name="interestRate"
                    value={interestRate}
                    disabled={disableForm}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Term Length (months)"
                    name="termLength"
                    value={termLength}
                    disabled={disableForm}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormSubmit disabled={disableForm} />
            </form>
        );
    }
}
