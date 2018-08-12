import React, { Component } from "react";

import { RequestLoanForm } from "../RequestLoanForm/RequestLoanForm";

export default class Create extends Component {
    render() {
        const { createLoanRequest, isAwaitingBlockchain, isCreated } = this.props;

        const isDisabled = isAwaitingBlockchain || isCreated;

        return (
            <div className="OpenTutorial container Tutorial" id="open-loan">
                <header className="App-header">
                    <h3 className="App-title">Request a Loan on Dharma</h3>
                </header>

                <RequestLoanForm createLoanRequest={createLoanRequest} disableForm={isDisabled} />
            </div>
        );
    }
}
