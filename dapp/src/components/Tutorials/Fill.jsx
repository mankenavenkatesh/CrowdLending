import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Fill extends Component {
    constructor(props) {
        super(props);

        this.handleAllowPrincipalTransfer = this.handleAllowPrincipalTransfer.bind(this);
        this.handleFillLoan = this.handleFillLoan.bind(this);
    }

    async handleAllowPrincipalTransfer(event) {
        event.preventDefault();

        const { allowPrincipalTransfer } = this.props;

        await allowPrincipalTransfer();
    }

    async handleFillLoan(event) {
        event.preventDefault();

        const { fillLoanRequest } = this.props;

        await fillLoanRequest();
    }

    render() {
        const { isCreated, isFilled, hasAllowedPrincipalTransfer, isAwaitingBlockchain } = this.props;

        const disableAllowTransfer = isAwaitingBlockchain || !isCreated || hasAllowedPrincipalTransfer;
        const disableFill = isAwaitingBlockchain || !hasAllowedPrincipalTransfer || isFilled;

        return (
            <div className="FillTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Fill a Loan on Dharma</h3>
                </header>
                <Button
                    disabled={disableAllowTransfer}
                    label={"Allow Principal Transfer"}
                    onClick={this.handleAllowPrincipalTransfer}
                />
                <Button disabled={disableFill} label={"Fill Loan Request"} onClick={this.handleFillLoan} />
            </div>
        );
    }
}
